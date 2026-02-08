import { Leaf } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t bg-card">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 py-6 text-center text-sm text-muted-foreground lg:px-8">
        <div className="flex items-center gap-2">
          <Leaf className="h-4 w-4 text-primary" />
          <span className="font-semibold text-foreground">AgriSmart</span>
        </div>
        <p>
          AI-Driven Smart Agriculture Advisory System. Predictions are for
          informational purposes only and should be used as supplementary
          guidance alongside expert advice.
        </p>
        <p className="text-xs">
          &copy; {new Date().getFullYear()} AgriSmart. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
