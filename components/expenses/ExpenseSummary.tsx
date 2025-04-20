import { Calendar, Icon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

export function ExpenseSummary({
  title,
  amount,
  subtitle,
}: {
  title: string;
  amount: number;
  subtitle: string;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base sm:text-lg font-medium">
          {title}
        </CardTitle>
        <Calendar className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">${amount.toFixed(2)}</div>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </CardContent>
    </Card>
  );
}
