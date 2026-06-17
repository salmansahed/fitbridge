import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { PLAN_PRICE_ID, stripe } from "@/lib/stripe";
import { auth } from "@/lib/auth";

export async function POST(request) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");
    const userSession = await auth.api.getSession({
      headers: await headers(),
    });
    const user = userSession?.user;
    // const PRICE_ID = "price_1TifkxQdcghXLA7yWA59WOmc";
    const formData = await request.formData();
    const planId = formData.get("plan_id");
    const priceId = PLAN_PRICE_ID[planId];

    // ...........................
    let planName;
    let planPrice;

    if (planId === "Starter") {
      planName = "Starter Plan";
      planPrice = "$29 / month";
    } else if (planId === "Pro_Growth") {
      planName = "Pro Growth Plan";
      planPrice = "$49 / month";
    } else if (planId === "Enterprise") {
      planName = "Enterprise Plan";
      planPrice = "$149 / month";
    }

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price: priceId,
          quantity: 1,
        },
      ],
      metadata: {
        priceId: planId,
        userId: user?.id,
        userEmail: user?.email,
        planName: planName,
        planPrice: planPrice,
      },
      mode: "subscription",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
