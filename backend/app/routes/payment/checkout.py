from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import JSONResponse
import os
import httpx
from supabase import create_client

router = APIRouter()

_supabase = None

def get_supabase():
    global _supabase
    if _supabase is None:
        from supabase import create_client
        _supabase = create_client(
            os.getenv("SUPABASE_URL", ""),
            os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")
        )
    return _supabase

SAFEPAY_API_KEY = os.getenv("SAFEPAY_API_KEY", "")
SAFEPAY_SECRET_KEY = os.getenv("SAFEPAY_SECRET_KEY", "")
SAFEPAY_BASE_URL = os.getenv("SAFEPAY_BASE_URL", "https://api.safepay.com/v1")

PLAN_MAP = {
    "pro": {
        "monthly": os.getenv("SAFEPAY_PLAN_PRO_MONTHLY", ""),
        "yearly": os.getenv("SAFEPAY_PLAN_PRO_YEARLY", ""),
    },
    "business": {
        "monthly": os.getenv("SAFEPAY_PLAN_BUSINESS_MONTHLY", ""),
        "yearly": os.getenv("SAFEPAY_PLAN_BUSINESS_YEARLY", ""),
    },
}


@router.post("/checkout")
async def create_checkout(request: Request):
    try:
        body = await request.json()
        plan = body.get("plan")
        billing_cycle = body.get("billingCycle", "monthly")
        user_id = body.get("userId")

        if not user_id:
            raise HTTPException(status_code=401, detail="User not authenticated")

        # Get user email from Supabase
        supabase = get_supabase()
        user_result = supabase.auth.admin.get_user_by_id(user_id)
        if not user_result.data or not user_result.data.user:
            raise HTTPException(status_code=404, detail="User not found")

        user_email = user_result.data.user.email
        if not user_email:
            raise HTTPException(status_code=400, detail="User email not found")

        plan_id = PLAN_MAP.get(plan, {}).get(billing_cycle)
        if not plan_id:
            raise HTTPException(status_code=400, detail=f"No Safepay plan configured for {plan} {billing_cycle}")

        # Create Safepay checkout session
        async with httpx.AsyncClient() as client:
            checkout_data = {
                "email": user_email,
                "plan_id": plan_id,
                "billing_cycle": billing_cycle,
                "success_url": f"{os.getenv('FRONTEND_URL', 'http://localhost:3000')}/pricing?success=true",
                "cancel_url": f"{os.getenv('FRONTEND_URL', 'http://localhost:3000')}/pricing?canceled=true",
                "metadata": {
                    "user_id": user_id,
                    "plan": plan,
                    "billing_cycle": billing_cycle,
                },
            }

            response = await client.post(
                f"{SAFEPAY_BASE_URL}/checkout/sessions",
                json=checkout_data,
                headers={
                    "Authorization": f"Bearer {SAFEPAY_SECRET_KEY}",
                    "Content-Type": "application/json",
                },
            )

            if response.status_code != 200:
                detail = "Failed to create checkout session"
                try:
                    error_body = response.json()
                    detail = error_body.get("message") or error_body.get("detail") or str(error_body)
                except Exception:
                    detail = f"Safepay error: {response.status_code} - {response.text[:200]}"
                raise HTTPException(status_code=response.status_code, detail=detail)

            checkout_session = response.json()

        return JSONResponse({
            "checkoutUrl": checkout_session.get("checkout_url"),
            "sessionId": checkout_session.get("id"),
        })

    except HTTPException:
        raise
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Failed to create checkout session: {str(e)}")


@router.post("/webhook")
async def safepay_webhook(request: Request):
    try:
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
                # Update user subscription in Supabase
                subscription_data = {
                    "user_id": user_id,
                    "plan": plan,
                    "billing_cycle": billing_cycle,
                    "status": "active",
                    "safepay_session_id": session.get("id"),
                }

                # Upsert subscription
                supabase = get_supabase()
                supabase.table("subscriptions").upsert(subscription_data).execute()

        return JSONResponse({"status": "success"})

    except Exception as e:
        print(f"Webhook error: {str(e)}")
        raise HTTPException(status_code=400, detail="Webhook processing failed")
