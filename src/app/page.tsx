import Link from "next/link";
import Hero from "@/components/Hero";
import { ArrowRight, FileText, ScanSearch, Wand2, Target, LayoutTemplate, Sparkles, Check } from "lucide-react";

export default function Home() {
  const features = [
    {
      title: "AI Resume Builder",
      description: "Generate professional, tailored resumes in seconds using advanced AI. Just enter your details and let the magic happen.",
      href: "/builder",
      icon: FileText,
      color: "text-blue-600",
      light: "bg-blue-50",
    },
    {
      title: "AI Detector",
      description: "Analyze your resume for AI-generated content indicators and get an authenticity score to ensure it passes human review.",
      href: "/detector",
      icon: ScanSearch,
      color: "text-emerald-600",
      light: "bg-emerald-50",
    },
    {
      title: "Resume Improver",
      description: "Upload your existing resume and let AI enhance wording, structure, and impact to make it more compelling.",
      href: "/improve",
      icon: Wand2,
      color: "text-violet-600",
      light: "bg-violet-50",
    },
    {
      title: "Job Match",
      description: "Compare your resume against job descriptions and get actionable insights to optimize for ATS systems.",
      href: "/job-match",
      icon: Target,
      color: "text-orange-600",
      light: "bg-orange-50",
    },
  ];

  const steps = [
    { num: "01", title: "Enter Your Details", desc: "Fill in your personal info, experience, education, and skills." },
    { num: "02", title: "AI Generation", desc: "Our AI analyzes your info and crafts a polished, professional resume." },
    { num: "03", title: "Download & Apply", desc: "Review, tweak if needed, and download your resume to start applying." },
  ];

  return (
    <div className="flex flex-col">
      <Hero />

      {/* Features */}
      <section className="py-16 sm:py-20 md:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Features</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to land the job
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
              From AI-powered generation to intelligent analysis, ResumeAI gives you the edge in today&apos;s competitive market.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {features.map((feature) => (
              <Link
                key={feature.title}
                href={feature.href}
                className="group relative bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:border-gray-200 hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${feature.light} mb-4 sm:mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                  <feature.icon className={`w-6 h-6 sm:w-7 sm:h-7 ${feature.color}`} strokeWidth={2.5} />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3 group-hover:text-indigo-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">{feature.description}</p>
                <span className="inline-flex items-center text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                  Learn more <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-700 text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              <span>How It Works</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Three simple steps to a resume that gets you hired</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Get started in minutes with our simple three-step process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            {steps.map((step, idx) => (
              <div key={step.num} className="relative text-center group">
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] border-t-2 border-dashed border-gray-300 group-hover:border-indigo-300 transition-colors" />
                )}
                <div className="relative inline-flex items-center justify-center w-16 h-16 sm:w-16 sm:h-16 md:w-16 md:h-16 rounded-full bg-white border-2 border-indigo-100 text-indigo-600 font-bold text-xl mb-4 sm:mb-6 shadow-sm group-hover:scale-110 group-hover:border-indigo-300 transition-all">
                  {step.num}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">{step.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Preview */}
      <section className="py-16 sm:py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Templates</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Professional Templates</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from a variety of modern, classic, and minimal designs.
            </p>
          </div>
          <div className="flex justify-center">
            <Link
              href="/templates"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 text-base sm:text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl hover:from-indigo-700 hover:to-blue-700 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <LayoutTemplate className="w-5 h-5" />
              Browse Templates
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-16 sm:py-20 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Pricing</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Simple, transparent pricing</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Start free, upgrade when you need more. No hidden fees.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Free</h3>
              <p className="text-3xl font-bold text-gray-900 mb-4">$0<span className="text-sm text-gray-500 font-normal">/month</span></p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-sm text-gray-700"><Check className="w-4 h-4 text-emerald-500" /> 2 CVs per month</li>
                <li className="flex items-center gap-2 text-sm text-gray-700"><Check className="w-4 h-4 text-emerald-500" /> Basic templates</li>
                <li className="flex items-center gap-2 text-sm text-gray-700"><Check className="w-4 h-4 text-emerald-500" /> PDF download</li>
              </ul>
              <Link href="/builder" className="block w-full py-3 text-center rounded-xl border-2 border-gray-200 font-semibold text-gray-900 hover:border-gray-300 transition-colors">
                Get Started
              </Link>
            </div>
            <div className="bg-white rounded-2xl border-2 border-indigo-600 p-8 shadow-lg relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">Most Popular</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Pro</h3>
              <p className="text-3xl font-bold text-gray-900 mb-4">$19<span className="text-sm text-gray-500 font-normal">/month</span></p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-sm text-gray-700"><Check className="w-4 h-4 text-emerald-500" /> Unlimited CVs</li>
                <li className="flex items-center gap-2 text-sm text-gray-700"><Check className="w-4 h-4 text-emerald-500" /> AI Resume Builder</li>
                <li className="flex items-center gap-2 text-sm text-gray-700"><Check className="w-4 h-4 text-emerald-500" /> Premium templates</li>
                <li className="flex items-center gap-2 text-sm text-gray-700"><Check className="w-4 h-4 text-emerald-500" /> Job Match</li>
              </ul>
              <Link href="/pricing" className="block w-full py-3 text-center rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors">
                Upgrade to Pro
              </Link>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Business</h3>
              <p className="text-3xl font-bold text-gray-900 mb-4">$49<span className="text-sm text-gray-500 font-normal">/month</span></p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-sm text-gray-700"><Check className="w-4 h-4 text-emerald-500" /> Everything in Pro</li>
                <li className="flex items-center gap-2 text-sm text-gray-700"><Check className="w-4 h-4 text-emerald-500" /> Team collaboration</li>
                <li className="flex items-center gap-2 text-sm text-gray-700"><Check className="w-4 h-4 text-emerald-500" /> API access</li>
                <li className="flex items-center gap-2 text-sm text-gray-700"><Check className="w-4 h-4 text-emerald-500" /> Priority support</li>
              </ul>
              <Link href="/pricing" className="block w-full py-3 text-center rounded-xl border-2 border-gray-200 font-semibold text-gray-900 hover:border-gray-300 transition-colors">
                Get Started
              </Link>
            </div>
          </div>
          <div className="text-center mt-10">
            <Link href="/pricing" className="text-indigo-600 font-semibold hover:text-indigo-700">
              View all plans →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -left-24 w-64 h-64 sm:w-96 sm:h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 sm:w-96 sm:h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to build your perfect resume?
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-8 sm:mb-10 max-w-2xl mx-auto">
            Join thousands of job seekers who have already transformed their careers with ResumeAI.
          </p>
          <Link
            href="/builder"
            className="inline-flex items-center gap-2 px-8 sm:px-10 py-3.5 sm:py-4 text-base sm:text-lg font-semibold text-indigo-600 bg-white rounded-2xl hover:bg-gray-100 shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all duration-300"
          >
            Get Started for Free
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
