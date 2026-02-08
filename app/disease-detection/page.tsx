import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { DiseaseDetectionForm } from "@/components/disease-detection-form";

export const metadata = {
  title: "Crop Disease Detection - AgriSmart",
  description:
    "Upload a crop leaf image and detect diseases with AI-powered analysis. Get severity levels and care suggestions.",
};

export default function DiseaseDetectionPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-4 py-10 lg:px-8 lg:py-16">
          <div className="mb-10">
            <h1 className="text-balance text-3xl font-bold tracking-tight lg:text-4xl">
              Crop Disease Detection
            </h1>
            <p className="mt-2 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
              Upload a clear image of the affected crop leaf. Our AI will
              analyze it to identify potential diseases, assess severity, and
              provide actionable care recommendations.
            </p>
          </div>
          <DiseaseDetectionForm />
        </section>
      </main>
      <Footer />
    </>
  );
}
