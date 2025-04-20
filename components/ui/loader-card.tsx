"use client";

import { Loader2 } from "lucide-react";
import { Card } from "./card";

interface LoaderCardProps {
  message?: string;
}

export function LoaderCard({ message = "Loading..." }: LoaderCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="ml-2">{message}</span>
      </div>
    </Card>
  );
}
