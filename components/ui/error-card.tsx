import { Card } from "./card";

interface ErrorCardProps {
  message?: string;
}

export function ErrorCard({ message = "An error occurred" }: ErrorCardProps) {
  return (
    <Card className="p-6">
      <div className="text-red-500 text-center">{message}</div>
    </Card>
  );
}
