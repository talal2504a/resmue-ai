import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const SAFEPAY_CLIENT_ID = process.env.SAFEPAY_API_KEY || "";
const SAFEPAY_ENV = process.env.SAFEPAY_ENV || "production";
const SAFEPAY_ORDER_API = SAFEPAY_ENV === "sandbox"
  ? "https://sandbox.api.getsafepay.com/order"
  : "https://api.getsafepay.com/order";
const FRONTEND_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

const PLAN_PRICES: Record<string, Record<string, number>> = {
  pro: {
    monthly: 1900, // $19 in PKR cents
    yearly: 14000, // $140 in PKR cents
  },
  business: {
    monthly: 4900, // $49 in PKR cents
  },
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { plan, billingCycle } = body;

    // Get auth token from Authorization header
    const authHeader = req.headers.get("authorization");
    const authToken = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

    if (!authToken) {
      return NextResponse.json({ error: "Unauthorized", detail: "Missing auth token" }, { status: 401 });
    }

    // Get authenticated user using the token from the client session
    const { data: { user }, error: authError } = await supabase.auth.getUser(authToken);

    if (authError || !user) {
      console.error("Payment auth error:", authError);
      return NextResponse.json({ error: "Unauthorized", detail: authError?.message || "No user" }, { status: 401 });
    }

    // Get plan price
    const amount = PLAN_PRICES[plan]?.[billingCycle];
    if (!amount) {
      return NextResponse.json(
        { error: `No price configured for ${plan} ${billingCycle}` },
        { status: 400 }
      );
    }

    // Create Safepay payment session using /order/v1/init
    const initResponse = await fetch(`${SAFEPAY_ORDER_API}/v1/init`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        environment: SAFEPAY_ENV,
        client: SAFEPAY_CLIENT_ID,
        amount,
        currency: "PKR",
      }),
    });

    const initData = await initResponse.json();

    if (!initResponse.ok || !initData.data?.token) {
      console.error("Safepay init error:", initResponse.status, initData);
      return NextResponse.json(
        { error: "Failed to create checkout session", detail: JSON.stringify(initData) },
        { status: initResponse.status || 500 }
      );
    }

    const token = initData.data.token;

    // Build checkout URL
    const checkoutUrl = SAFEPAY_ENV === "sandbox"
      ? `https://sandbox.api.getsafepay.com/checkout?beacon=${token}`
      : `https://www.getsafepay.com/checkout?beacon=${token}`;

    return NextResponse.json({
      checkoutUrl,
      sessionId: token,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to initiate checkout", detail: (error as any)?.message || String(error) },
      { status: 500 }
    );
  }
}