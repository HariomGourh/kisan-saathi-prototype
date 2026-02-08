"use client";

import React from "react"

import { useState, useCallback } from "react";
import { Search, Upload, X, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { DiseaseResult } from "@/components/disease-result";

const symptomOptions = [
  "Yellow spots on leaves",
  "Brown or black lesions",
  "Wilting or drooping",
  "Powdery white coating",
  "Leaf curling",
  "Stunted growth",
  "Holes in leaves",
  "Root rot / Soft roots",
  "Fruit discoloration",
  "Stem canker",
];

export interface DetectionResult {
  disease: string;
  severity: "Low" | "Moderate" | "Severe";
  prevention: string[];
  care: string[];
}

const diseaseDatabase: {
  disease: string;
  severity: "Low" | "Moderate" | "Severe";
  prevention: string[];
  care: string[];
}[] = [
  {
    disease: "Bacterial Leaf Blight",
    severity: "Moderate",
    prevention: [
      "Use disease-resistant crop varieties",
      "Ensure proper field drainage",
      "Avoid overhead irrigation during humid periods",
    ],
    care: [
      "Apply copper-based bactericide spray",
      "Remove and destroy infected plant debris",
      "Improve air circulation around plants",
    ],
  },
  {
    disease: "Powdery Mildew",
    severity: "Low",
    prevention: [
      "Plant in areas with good air circulation",
      "Avoid excess nitrogen fertilization",
      "Use resistant cultivars when available",
    ],
    care: [
      "Apply sulfur-based or neem oil fungicide",
      "Remove heavily infected leaves",
      "Water plants at the base, not from above",
    ],
  },
  {
    disease: "Late Blight (Phytophthora)",
    severity: "Severe",
    prevention: [
      "Use certified disease-free seeds",
      "Rotate crops every 2-3 seasons",
      "Apply preventive fungicide before rainy season",
    ],
    care: [
      "Apply systemic fungicide immediately",
      "Remove and burn all infected plant material",
      "Reduce irrigation and improve drainage",
    ],
  },
  {
    disease: "Fusarium Wilt",
    severity: "Severe",
    prevention: [
      "Use wilt-resistant varieties",
      "Practice crop rotation with non-host crops",
      "Solarize soil before planting season",
    ],
    care: [
      "Remove infected plants from the field",
      "Apply bio-control agents like Trichoderma",
      "Avoid waterlogging in the field",
    ],
  },
  {
    disease: "Anthracnose",
    severity: "Moderate",
    prevention: [
      "Use pathogen-free seeds",
      "Space plants adequately for air circulation",
      "Avoid working in wet fields",
    ],
    care: [
      "Apply mancozeb or chlorothalonil-based fungicide",
      "Remove infected fruits and plant parts",
      "Maintain proper field hygiene",
    ],
  },
];

function simulateDetection(
  _imageFile: File | null,
  symptoms: string[]
): DetectionResult {
  const index =
    symptoms.length > 0
      ? symptoms.length % diseaseDatabase.length
      : Math.floor(Math.random() * diseaseDatabase.length);

  return diseaseDatabase[index];
}

export function DiseaseDetectionForm() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  }, []);

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  }

  function toggleSymptom(symptom: string) {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  }

  function clearImage() {
    setImageFile(null);
    setImagePreview(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!imageFile) return;

    setLoading(true);
    setResult(null);

    await new Promise((r) => setTimeout(r, 2000));

    const detection = simulateDetection(imageFile, selectedSymptoms);
    setResult(detection);
    setLoading(false);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Search className="h-5 w-5 text-primary" />
          </div>
          <CardTitle>Upload & Describe</CardTitle>
          <CardDescription>
            Upload a clear photo of the affected crop leaf and optionally select
            observed symptoms.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Image upload */}
            <div className="flex flex-col gap-2">
              <Label>Crop Leaf Image</Label>
              {imagePreview ? (
                <div className="relative overflow-hidden rounded-lg border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Uploaded leaf preview"
                    className="h-56 w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={clearImage}
                    className="absolute right-2 top-2 rounded-full bg-foreground/70 p-1 text-background transition-colors hover:bg-foreground/90"
                    aria-label="Remove image"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <label
                  className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-10 transition-colors ${
                    dragActive
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/40"
                  }`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragActive(true);
                  }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={handleDrop}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    <Upload className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">
                      Drag & drop or click to upload
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      JPG, PNG up to 10MB
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={(e) => {
                      if (e.target.files?.[0]) handleFile(e.target.files[0]);
                    }}
                  />
                </label>
              )}
            </div>

            {/* Symptom selection */}
            <div className="flex flex-col gap-2">
              <Label>Observed Symptoms (optional)</Label>
              <div className="flex flex-wrap gap-2">
                {symptomOptions.map((symptom) => {
                  const isSelected = selectedSymptoms.includes(symptom);
                  return (
                    <button
                      key={symptom}
                      type="button"
                      onClick={() => toggleSymptom(symptom)}
                      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                        isSelected
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-card text-foreground hover:border-primary/40"
                      }`}
                    >
                      {symptom}
                    </button>
                  );
                })}
              </div>
              {selectedSymptoms.length > 0 && (
                <p className="text-xs text-muted-foreground">
                  {selectedSymptoms.length} symptom
                  {selectedSymptoms.length > 1 ? "s" : ""} selected
                </p>
              )}
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={loading || !imageFile}
              className="mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing Image...
                </>
              ) : (
                <>
                  Detect Disease
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="flex items-start">
        {result ? (
          <DiseaseResult result={result} />
        ) : (
          <Card className="w-full border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                <Search className="h-7 w-7 text-muted-foreground" />
              </div>
              <p className="text-lg font-medium text-muted-foreground">
                Detection results will appear here
              </p>
              <p className="mt-1 text-sm text-muted-foreground/70">
                Upload an image and click &quot;Detect Disease&quot; to analyze.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
