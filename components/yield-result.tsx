import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PredictionResult {
  yieldRange: string;
  category: "Low" | "Medium" | "High";
  crop: string;
  season: string;
}

const categoryConfig = {
  Low: {
    color: "bg-destructive/10 text-destructive",
    icon: TrendingDown,
    description: "Below average expected yield. Consider improving irrigation or soil nutrients.",
  },
  Medium: {
    color: "bg-accent/20 text-accent-foreground",
    icon: Minus,
    description: "Average expected yield. Current conditions are moderate for this crop.",
  },
  High: {
    color: "bg-primary/10 text-primary",
    icon: TrendingUp,
    description: "Above average expected yield. Conditions are favorable for this crop.",
  },
};

export function YieldResult({ result }: { result: PredictionResult }) {
  const config = categoryConfig[result.category];
  const Icon = config.icon;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-primary" />
          Prediction Results
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="rounded-lg border bg-secondary/50 p-5">
          <p className="text-sm font-medium text-muted-foreground">
            Estimated Yield
          </p>
          <p className="mt-1 text-2xl font-bold tracking-tight">
            {result.yieldRange}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Yield Category
            </span>
            <Badge variant="secondary" className={cn("w-fit text-sm", config.color)}>
              {result.category}
            </Badge>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Crop
            </span>
            <span className="text-sm font-semibold">{result.crop}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Season
            </span>
            <span className="text-sm font-semibold">{result.season}</span>
          </div>
        </div>

        <div className="rounded-lg bg-muted/50 p-4">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {config.description}
          </p>
        </div>

        <p className="text-xs text-muted-foreground">
          This is an AI-generated advisory estimate. Please consult local
          agricultural experts for comprehensive guidance.
        </p>
      </CardContent>
    </Card>
  );
}
