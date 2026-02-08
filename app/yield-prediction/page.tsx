import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { YieldPredictionForm } from "@/components/yield-prediction-form";

export const metadata = {
  title: "Crop Yield Prediction - AgriSmart",
  description:
    "Predict crop yields using AI by entering crop type, location, rainfall, temperature, soil type, and season.",
};

export default function YieldPredictionPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-4 py-10 lg:px-8 lg:py-16">
          <div className="mb-10">
            <h1 className="text-balance text-3xl font-bold tracking-tight lg:text-4xl">
              Crop Yield Prediction
            </h1>
            <p className="mt-2 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
              Enter your crop and environmental details below. Our AI model will
              analyze the data and provide an estimated yield range along with a
              yield category.
            </p>
          </div>
          <YieldPredictionForm />
        </section>
      </main>
      <Footer />
    </>
  );
}
