import { AlertTriangle, ShieldCheck, Stethoscope } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { DetectionResult } from "@/components/disease-detection-form";

const severityConfig = {
  Low: {
    color: "bg-primary/10 text-primary",
    label: "Low Severity",
  },
  Moderate: {
    color: "bg-accent/20 text-accent-foreground",
    label: "Moderate Severity",
  },
  Severe: {
    color: "bg-destructive/10 text-destructive",
    label: "Severe",
  },
};

export function DiseaseResult({ result }: { result: DetectionResult }) {
  const severity = severityConfig[result.severity];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Stethoscope className="h-5 w-5 text-primary" />
          Detection Results
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {/* Disease name and severity */}
        <div className="rounded-lg border bg-secondary/50 p-5">
          <p className="text-sm font-medium text-muted-foreground">
            Detected Disease
          </p>
          <p className="mt-1 text-2xl font-bold tracking-tight">
            {result.disease}
          </p>
          <Badge
            variant="secondary"
            className={cn("mt-2 text-sm", severity.color)}
          >
            {severity.label}
          </Badge>
        </div>

        {/* Prevention */}
        <div>
          <div className="mb-3 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Preventive Measures
            </h3>
          </div>
          <ul className="flex flex-col gap-2">
            {result.prevention.map((tip) => (
              <li
                key={tip}
                className="flex items-start gap-2 rounded-md bg-muted/50 px-3 py-2 text-sm leading-relaxed"
              >
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* Care */}
        <div>
          <div className="mb-3 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-accent" />
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Care Suggestions
            </h3>
          </div>
          <ul className="flex flex-col gap-2">
            {result.care.map((tip) => (
              <li
                key={tip}
                className="flex items-start gap-2 rounded-md bg-muted/50 px-3 py-2 text-sm leading-relaxed"
              >
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {tip}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-muted-foreground">
          This is an AI-generated advisory assessment. Please consult local
          agricultural experts or extension services for professional diagnosis
          and treatment.
        </p>
      </CardContent>
    </Card>
  );
}
