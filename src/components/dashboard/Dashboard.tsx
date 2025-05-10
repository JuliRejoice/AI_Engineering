import { useState } from "react";

export function Dashboard() {
  const [totalCount, setTotalCount] = useState<number>(0);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          {new Intl.NumberFormat('en-US').format(totalCount)} jobs match your criteria
        </p>
      </div>
    </div>
  );
}