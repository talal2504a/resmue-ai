from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import JSONResponse
import os
import httpx
from supabase import create_client

router = APIRouter()

supabase = create_client(
    os.getenv("SUPABASE_URL", ""),
    os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")
)

SAFEPAY_API_KEY = os.getenv("SAFEPAY_API_KEY", "")
SAFEPAY_SECRET_KEY = os.getenv("SAFEPAY_SECRET_KEY", "")
SAFEPAY_BASE_URL = os.getenv("SAFEPAY_BASE_URL", "https://api.safepay.com/v1")
SAFEPAY_PLAN_ID = os.getenv("SAFEPAY_PLAN_ID", "")


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
        user_result = supabase.auth.admin.get_user_by_id(user_id)
        if not user_result.data or not user_result.data.user:
            raise HTTPException(status_code=404, detail="User not found")

        user_email = user_result.data.user.email
        if not user_email:
            raise HTTPException(status_code=400, detail="User email not found")

        # Create Safepay checkout session
        async with httpx.AsyncClient() as client:
            checkout_data = {
                "email": user_email,
                "plan_id": SAFEPAY_PLAN_ID,
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
                raise HTTPException(status_code=response.status_code, detail="Failed to create checkout session")

            checkout_session = response.json()

        return JSONResponse({
            "checkoutUrl": checkout_session.get("checkout_url"),
            "sessionId": checkout_session.get("id"),
        })

    except HTTPException:
        raise
    except Exception as e:
        print(f"Checkout error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create checkout session")


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
                supabase.table("subscriptions").upsert(subscription_data).execute()

        return JSONResponse({"status": "success"})

    except Exception as e:
        print(f"Webhook error: {str(e)}")
        raise HTTPException(status_code=400, detail="Webhook processing failed")
