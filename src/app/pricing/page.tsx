"use client";

import { useState } from "react";
import { Check, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

type Plan = "free" | "pro" | "business";
type BillingCycle = "monthly" | "yearly";

const plans = [
  {
    id: "free" as Plan,
    name: "Free",
    priceMonthly: 0,
    priceYearly: 0,
    description: "Get started with basic features",
    features: [
      "2 CVs per month",
      "Limited AI generations",
      "Basic templates",
      "Basic CV analysis",
      "PDF download",
    ],
    limitations: [
      "No AI Resume Builder",
      "No AI Resume Improver",
      "No AI Resume Detector",
      "No Job Match",
      "No premium templates",
    ],
    cta: "Get Started",
    href: "/builder",
    popular: false,
  },
  {
    id: "pro" as Plan,
    name: "Pro",
    priceMonthly: 19,
    priceYearly: 140,
    description: "For serious job seekers",
    features: [
      "Unlimited CVs",
      "Higher AI usage",
      "Premium templates",
      "AI Resume Builder",
      "AI Resume Improver",
      "AI Resume Detector",
      "Job Match",
      "PDF download",
    ],
    limitations: [],
    cta: "Upgrade to Pro",
    href: "#",
    popular: true,
  },
  {
    id: "business" as Plan,
    name: "Business",
    priceMonthly: 49,
    priceYearly: 390,
    description: "For teams and recruiters",
    features: [
      "Everything in Pro",
      "Higher AI limits",
      "Multiple resumes",
      "Advanced features",
      "Priority support",
      "Team collaboration",
      "API access",
    ],
    limitations: [],
    cta: "Get Started",
    href: "#",
    popular: false,
  },
];

const faqs = [
  {
    question: "What is included in Free?",
    answer:
      "The Free plan includes 2 CVs per month, limited AI generations, basic templates, basic CV analysis, and PDF download. It's perfect for getting started.",
  },
  {
    question: "What is included in Pro?",
    answer:
      "The Pro plan includes unlimited CVs, higher AI usage, premium templates, AI Resume Builder, AI Resume Improver, AI Resume Detector, Job Match, and PDF download.",
  },
  {
    question: "What happens after I reach my free CV limit?",
    answer:
      "After reaching your free CV limit, you can either wait until the next month for the limit to reset or upgrade to a Pro or Business plan for unlimited access.",
  },
  {
    question: "Can I cancel Pro?",
    answer:
      "Yes, you can cancel your Pro subscription at any time. Your access will continue until the end of your current billing period.",
  },
  {
    question: "How does payment work?",
    answer:
      "We use Safepay as our payment provider. Click 'Upgrade to Pro', complete the secure checkout, and your account will be activated automatically via webhook confirmation.",
  },
  {
    question: "Can I download my CV as PDF?",
    answer:
      "Yes, all plans including Free support PDF download. You can download your CV directly from the builder after generating it.",
  },
];

export default function PricingPage() {
  const router = useRouter();
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { user, session } = useAuth();

  const getPrice = (plan: typeof plans[0]) => {
    if (plan.id === "free") return "$0";
    return billingCycle === "monthly" ? `$${plan.priceMonthly}` : `$${plan.priceYearly}`;
  };

  const getSavings = (plan: typeof plans[0]) => {
    if (plan.id === "free" || plan.priceMonthly === plan.priceYearly) return null;
    const monthlyTotal = plan.priceMonthly * 12;
    const yearlyTotal = plan.priceYearly;
    const savings = monthlyTotal - yearlyTotal;
    const percentage = Math.round((savings / monthlyTotal) * 100);
    return `${percentage}% savings`;
  };

  const handleUpgrade = async (planId: string) => {
    if (planId === "free") {
      router.push("/builder");
      return;
    }

    if (!user) {
      router.push("/login");
      return;
    }

    try {
      const response = await fetch("/api/payment/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({ plan: planId, billingCycle }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Failed to initiate checkout");
        return;
      }

      if (data.checkoutUrl) {
        window.location.assign(data.checkoutUrl);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to initiate checkout. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Simple, transparent pricing
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Choose the perfect plan for your needs. All plans include core features to help you build your career.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4">
              <span className={`text-sm font-medium ${billingCycle === "monthly" ? "text-gray-900" : "text-gray-500"}`}>Monthly</span>
              <button
                type="button"
                onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  billingCycle === "yearly" ? "bg-indigo-600" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                    billingCycle === "yearly" ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              <span className={`text-sm font-medium ${billingCycle === "yearly" ? "text-gray-900" : "text-gray-500"}`}>
                Yearly
                <span className="ml-2 inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
                  Save up to 39%
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-3xl border-2 p-8 ${
                plan.popular ? "border-indigo-600 shadow-2xl scale-105" : "border-gray-200 shadow-lg"
              } bg-white`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center rounded-full bg-indigo-600 px-4 py-1.5 text-sm font-semibold text-white">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-4xl font-bold text-gray-900">{getPrice(plan)}</span>
                  {plan.id !== "free" && <span className="text-gray-500">/{billingCycle === "yearly" ? "month" : "month"}</span>}
                </div>
                {getSavings(plan) && (
                  <p className="text-sm text-emerald-600 font-medium mt-2">Save {getSavings(plan)} with yearly billing</p>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
                {plan.limitations.map((limitation, idx) => (
                  <li key={idx} className="flex items-start gap-3 opacity-50">
                    <X className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-500 line-through">{limitation}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => handleUpgrade(plan.id)}
                className={`w-full py-3 px-6 rounded-xl text-base font-semibold transition-colors ${
                  plan.popular
                    ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg hover:shadow-xl"
                    : "bg-white text-gray-900 border-2 border-gray-200 hover:border-gray-300"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600">Everything you need to know about our plans and pricing.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full px-6 py-4 flex items-center justify-between text-left"
              >
                <span className="text-base font-semibold text-gray-900">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 text-gray-500 transition-transform ${openFaq === idx ? "rotate-180" : ""}`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-6 pb-4">
                  <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to get started?</h2>
          <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who are already using ResumeAI to build their careers.
          </p>
          <Link
            href="/builder"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-gray-100 shadow-lg transition-colors"
          >
            Get Started for Free
          </Link>
        </div>
      </div>
    </div>
  );
}
