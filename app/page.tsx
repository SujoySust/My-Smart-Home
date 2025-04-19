import { Button } from "@/components/ui/button";
import { UtensilsCrossed } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center text-center">
      <UtensilsCrossed className="h-16 w-16 mb-4" />
      <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
        My Weekly Meals
      </h1>
      <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400 mt-4">
        Plan your meals for the week ahead. Stay organized and eat well.
      </p>
      <div className="flex gap-4 mt-8">
        <Button asChild size="lg">
          <Link href="/dashboard">View Dashboard</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/weekly-plan">Weekly Plan</Link>
        </Button>
      </div>
    </div>
  );
}