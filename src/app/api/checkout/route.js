import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const {
      className,
      classPrice,
      classId,
      formattedTime,
      scheduleDays,
      authorName,
      authorRole,
    } = await request.json();
    if (!className || !classPrice) {
      return NextResponse.json(
        { error: "Missing required product details" },
        { status: 400 },
      );
    }
    const userSession = await auth.api.getSession({
      headers: await headers(),
    });
    const user = userSession?.user;

    let parsedId =
      typeof classId === "object" && classId !== null
        ? classId["0"] || classId
        : classId;
    const safeClassId = String(parsedId);

    const cleanPrice = parseFloat(classPrice);

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.NEXT_PUBLIC_SERVER_URL?.includes("3000")
        ? process.env.NEXT_PUBLIC_SERVER_URL
        : "http://localhost:3000");

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: user?.email,
      invoice_creation: {
        enabled: true,
      },
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Subscribe to ${className}`,
              metadata: {
                id: safeClassId,
              },
            },
            unit_amount: Math.round(cleanPrice * 100),
          },
          quantity: 1,
        },
      ],
      metadata: {
        classId: safeClassId,
        className: className,
        price: classPrice,
        userEmail: user?.email,
        userId: user?.id,
        authorRole: authorRole,
        startTime: formattedTime,
        scheduleDays: JSON.stringify(scheduleDays),
        authorName: authorName,
      },
      mode: "payment",
      success_url: `${baseUrl}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/all-classes`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Session Creation Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error occurred during checkout initializing" },
      { status: 500 },
    );
  }
}
