import Link from "next/link";
import Image from "next/image";
import {
  BarChart3,
  Search,
  Sprout,
  CloudSun,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const features = [
  {
    href: "/yield-prediction",
    icon: BarChart3,
    title: "Crop Yield Prediction",
    description:
      "Enter crop details like type, location, rainfall, and temperature to get AI-powered yield predictions with categorized output.",
    cta: "Predict Yield",
  },
  {
    href: "/disease-detection",
    icon: Search,
    title: "Crop Disease Detection",
    description:
      "Upload a leaf image and optionally describe symptoms to detect crop diseases, severity levels, and receive care suggestions.",
    cta: "Detect Disease",
  },
];

const highlights = [
  {
    icon: Sprout,
    title: "Smart Predictions",
    text: "Leverage AI models trained on agricultural data to forecast yield ranges with confidence.",
  },
  {
    icon: CloudSun,
    title: "Climate Aware",
    text: "Factor in rainfall, temperature, and seasonal patterns for region-specific insights.",
  },
  {
    icon: ShieldCheck,
    title: "Advisory Support",
    text: "Receive preventive care suggestions to protect your crops from common diseases.",
  },
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative flex items-center justify-center overflow-hidden py-24 lg:py-36">
          <Image
            src="app\hero-farm.jpg"
            alt="Lush green farmland stretching to the horizon"
            fill
            className="object-cover brightness-[0.45]"
            priority
          />
          <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
            <h1 className="text-balance text-4xl font-bold tracking-tight text-white lg:text-5xl">
              AI-Driven Smart Agriculture System
            </h1>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-white/90">
              Empowering farmers with intelligent crop yield predictions and
              disease detection. Make data-driven decisions for a better harvest.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/yield-prediction">
                  Predict Yield
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 text-white hover:bg-white/10 hover:text-white bg-transparent"
                asChild
              >
                <Link href="/disease-detection">Detect Disease</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Feature cards */}
        <section className="mx-auto max-w-6xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="mb-12 text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight">
              What would you like to do?
            </h2>
            <p className="mt-2 text-muted-foreground">
              Choose a tool below to get started with AI-powered agricultural
              insights.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {features.map((f) => (
              <Link key={f.href} href={f.href} className="group">
                <Card className="h-full transition-shadow hover:shadow-lg">
                  <CardHeader>
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <f.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{f.title}</CardTitle>
                    <CardDescription className="leading-relaxed">
                      {f.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <span className="inline-flex items-center text-sm font-semibold text-primary transition-colors group-hover:underline">
                      {f.cta}
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Highlights */}
        <section className="border-t bg-secondary/50 py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-4 lg:px-8">
            <h2 className="mb-12 text-center text-2xl font-bold tracking-tight">
              How Kisan-Saathi Helps You
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              {highlights.map((h) => (
                <div key={h.title} className="flex flex-col items-center text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                    <h.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">{h.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">
                    {h.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="mx-auto max-w-3xl px-4 py-12 text-center lg:px-8">
          <p className="text-sm leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Disclaimer:</strong> Kisan-Saathi
            provides advisory support only. Predictions and detections are
            generated by AI models and should be used as supplementary guidance
            alongside professional agricultural expertise.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
