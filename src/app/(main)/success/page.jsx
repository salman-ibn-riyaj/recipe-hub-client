import { getSessionData } from "@/lib/action/getSession";
import { postSubs } from "@/lib/action/postSubs";
import { stripe } from "@/lib/stripe";
import Link from "next/link";

export default async function Success({ searchParams }) {
  const user = await getSessionData();
  const customerEmail = user.email;
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error("Please provide a valid session_id (`cs_test_...`)");
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  const { status, metadata, payment_status } = session;

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    const amount = session.amount_total / 100;
    const currency = session.currency.toUpperCase();
    const paymentStatus = payment_status;
    const transactionId = session.payment_intent?.id;
    const paymentDate = new Date(session.created * 1000).toLocaleString();

    const subsInfo = {
      customerEmail: customerEmail,
      planId: metadata.planId,
      amount: amount,
      currency: currency,
      paymentStatus: paymentStatus,
      transactionId: transactionId,
      paymentDate: paymentDate,
      sessionId: session_id,
    };

    if (metadata.recipeId !== "") {
      subsInfo.recipeId = metadata.recipeId;
    }

    if (metadata.recipeName !== "") {
      subsInfo.recipeName = metadata.recipeName;
    }

    const submit = await postSubs("/api/subs", subsInfo);

    return (
      <section className="relative min-h-screen flex items-center justify-center bg-background px-4 antialiased overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-md w-full text-center p-8 rounded-2xl border border-white/20 dark:border-white/10 bg-white/70 dark:bg-[#1e293b]/70 backdrop-blur-xl shadow-2xl transition-all duration-300 relative">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-success/10 text-success mb-6 backdrop-blur-sm">
            <svg
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mb-3">
            Payment Successful!
          </h1>

          <p className="text-default-500 text-sm mb-6 leading-relaxed">
            Thank you for supporting RecipeHub! A confirmation mail has been
            sent to: <br />
            <span className="font-semibold text-foreground mt-1 inline-block">
              {customerEmail}
            </span>
          </p>

          <div className="bg-white/50 dark:bg-white/5 p-4 rounded-xl text-left text-sm mb-6 space-y-2 backdrop-blur-sm border border-white/10">
            <div className="flex justify-between">
              <span className="text-default-400">Transaction ID:</span>
              <span className="font-mono text-xs text-foreground font-semibold">
                {transactionId}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-default-400">Amount Paid:</span>
              <span className="font-semibold text-foreground">
                {amount} {currency}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-default-400">Date:</span>
              <span className="text-foreground">{paymentDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-default-400">Status:</span>
              <span className="text-success font-semibold capitalize">
                {paymentStatus}
              </span>
            </div>
          </div>

          <hr className="border-white/10 my-6" />

          <p className="text-xs text-default-400 mb-8">
            For any Information:{" "}
            <a
              href="mailto:orders@example.com"
              className="text-primary hover:underline font-medium transition-colors"
            >
              help@recipehub.com
            </a>
          </p>

          <div className="flex flex-col gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center h-11 px-6 font-medium text-small rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:opacity-90 active:scale-[0.98] transition-all"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    );
  }
}
