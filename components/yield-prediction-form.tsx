"use client";

import React from "react"

import { useState } from "react";
import { BarChart3, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { YieldResult } from "@/components/yield-result";

const cropTypes = [
  "Rice",
  "Wheat",
  "Maize",
  "Sugarcane",
  "Cotton",
  "Soybean",
  "Barley",
  "Millet",
  "Groundnut",
  "Sunflower",
];

const soilTypes = [
  "Alluvial",
  "Black (Regur)",
  "Red & Yellow",
  "Laterite",
  "Sandy",
  "Clay",
  "Loamy",
  "Saline",
];

const seasons = ["Kharif", "Rabi", "Zaid", "Whole Year"];

interface PredictionResult {
  yieldRange: string;
  category: "Low" | "Medium" | "High";
  crop: string;
  season: string;
}

function simulatePrediction(data: {
  crop: string;
  rainfall: number;
  temperature: number;
  season: string;
  soil: string;
}): PredictionResult {
  const base =
    data.crop === "Rice"
      ? 2200
      : data.crop === "Wheat"
        ? 3100
        : data.crop === "Sugarcane"
          ? 68000
          : data.crop === "Maize"
            ? 2600
            : data.crop === "Cotton"
              ? 500
              : 1800;

  const rainfallFactor = data.rainfall > 100 ? 1.15 : data.rainfall > 50 ? 1.0 : 0.8;
  const tempFactor =
    data.temperature > 20 && data.temperature < 35 ? 1.1 : 0.85;
  const seasonFactor = data.season === "Kharif" || data.season === "Rabi" ? 1.05 : 0.95;

  const predicted = Math.round(base * rainfallFactor * tempFactor * seasonFactor);
  const low = Math.round(predicted * 0.9);
  const high = Math.round(predicted * 1.1);

  let category: "Low" | "Medium" | "High" = "Medium";
  if (predicted < base * 0.85) category = "Low";
  else if (predicted > base * 1.1) category = "High";

  return {
    yieldRange: `${low.toLocaleString()} - ${high.toLocaleString()} kg/hectare`,
    category,
    crop: data.crop,
    season: data.season,
  };
}

export function YieldPredictionForm() {
  const [crop, setCrop] = useState("");
  const [location, setLocation] = useState("");
  const [rainfall, setRainfall] = useState("");
  const [temperature, setTemperature] = useState("");
  const [soil, setSoil] = useState("");
  const [season, setSeason] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!crop || !location || !rainfall || !temperature || !soil || !season) return;

    setLoading(true);
    setResult(null);

    // Simulate API call delay
    await new Promise((r) => setTimeout(r, 1500));

    const prediction = simulatePrediction({
      crop,
      rainfall: Number(rainfall),
      temperature: Number(temperature),
      season,
      soil,
    });

    setResult(prediction);
    setLoading(false);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <BarChart3 className="h-5 w-5 text-primary" />
          </div>
          <CardTitle>Prediction Parameters</CardTitle>
          <CardDescription>
            Fill in the details below to get an AI-powered crop yield estimate.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label htmlFor="crop">Crop Type</Label>
              <Select value={crop} onValueChange={setCrop}>
                <SelectTrigger id="crop">
                  <SelectValue placeholder="Select crop type" />
                </SelectTrigger>
                <SelectContent>
                  {cropTypes.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="location">Location / Region</Label>
              <Input
                id="location"
                placeholder="e.g. Punjab, Maharashtra"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="rainfall">Rainfall (mm)</Label>
                <Input
                  id="rainfall"
                  type="number"
                  placeholder="e.g. 120"
                  value={rainfall}
                  onChange={(e) => setRainfall(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="temperature">Temperature (&deg;C)</Label>
                <Input
                  id="temperature"
                  type="number"
                  placeholder="e.g. 28"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="soil">Soil Type</Label>
              <Select value={soil} onValueChange={setSoil}>
                <SelectTrigger id="soil">
                  <SelectValue placeholder="Select soil type" />
                </SelectTrigger>
                <SelectContent>
                  {soilTypes.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="season">Season</Label>
              <Select value={season} onValueChange={setSeason}>
                <SelectTrigger id="season">
                  <SelectValue placeholder="Select season" />
                </SelectTrigger>
                <SelectContent>
                  {seasons.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" size="lg" disabled={loading} className="mt-2">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  Predict Yield
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="flex items-start">
        {result ? (
          <YieldResult result={result} />
        ) : (
          <Card className="w-full border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                <BarChart3 className="h-7 w-7 text-muted-foreground" />
              </div>
              <p className="text-lg font-medium text-muted-foreground">
                Your prediction results will appear here
              </p>
              <p className="mt-1 text-sm text-muted-foreground/70">
                Fill in the form and click &quot;Predict Yield&quot; to get started.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
