from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
import os
from supabase import create_client
import hashlib
import hmac

router = APIRouter()

_supabase = None

def get_supabase():
    global _supabase
    if _supabase is None:
        _supabase = create_client(
            os.getenv("SUPABASE_URL", ""),
            os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")
        )
    return _supabase

WEBHOOK_SECRET = os.getenv("SAFEPAY_WEBHOOK_SECRET", "")


def verify_webhook_signature(payload_bytes: bytes, signature: str) -> bool:
    if not WEBHOOK_SECRET or not signature:
        return False
    expected = hmac.new(
        WEBHOOK_SECRET.encode("utf-8"),
        payload_bytes,
        hashlib.sha256,
    ).hexdigest()
    return hmac.compare_digest(expected, signature)


@router.post("/webhook")
async def safepay_webhook(request: Request):
    try:
        body_bytes = await request.body()
        signature = request.headers.get("X-Safepay-Signature", "")
        
        if not verify_webhook_signature(body_bytes, signature):
            return JSONResponse({"status": "error", "message": "Invalid signature"}, status_code=400)

        body = await request.json()
        event_type = body.get("type")
        event_data = body.get("data", {})

        if event_type == "checkout.session.completed":
            session = event_data.get("object", {})
            metadata = session.get("metadata", {})
            user_id = metadata.get("user_id")
            plan = metadata.get("plan")
            billing_cycle = metadata.get("billing_cycle")

            if user_id and plan:
                supabase = get_supabase()
                subscription_data = {
                    "user_id": user_id,
                    "plan": plan,
                    "billing_cycle": billing_cycle,
                    "status": "active",
                    "safepay_session_id": session.get("id"),
                }

                supabase.table("subscriptions").upsert(subscription_data).execute()

        return JSONResponse({"status": "success"})

    except Exception as e:
        print(f"Webhook error: {str(e)}")
        return JSONResponse({"status": "error"}, status_code=400)
