import { createFileRoute, Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/dashboard/")({
  component: App,
});

const tables = [
  {
    id: 1,
    orders: [
      {
        id: 1,
        items: ["Margherita Pizza", "Coke"],
        status: "pending",
        time: "19:30",
      },
      {
        id: 2,
        items: ["Garlic Bread", "Sprite"],
        status: "pending",
        time: "19:45",
      },
    ],
  },
  {
    id: 2,
    orders: [
      {
        id: 3,
        items: ["Pasta Carbonara", "Wine"],
        status: "pending",
        time: "19:15",
      },
    ],
  },
  {
    id: 3,
    orders: [
      {
        id: 4,
        items: ["Caesar Salad", "Water"],
        status: "pending",
        time: "19:20",
      },
      { id: 5, items: ["Tiramisu"], status: "pending", time: "19:40" },
      { id: 6, items: ["Espresso"], status: "pending", time: "19:50" },
    ],
  },
];

function App() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {tables.map((table) => (
        <Link
          key={table.id}
          to="/dashboard/tables/$tableId"
          params={{ tableId: String(table.id) }}
          className="block no-underline"
        >
          <Card className="h-full transition-shadow hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Table {table.id}
              </CardTitle>
              <Badge variant="outline">{table.orders.length} orders</Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {table.orders.map((order) => (
                  <div
                    key={order.id}
                    className="flex flex-col space-y-2 rounded-lg border p-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        Order #{order.id}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {order.time}
                      </span>
                    </div>
                    <ul className="space-y-1">
                      {order.items.map((item, index) => (
                        <li key={index} className="text-sm">
                          • {item}
                        </li>
                      ))}
                    </ul>
                    <Button
                      size="sm"
                      onClick={(e) => {
                        // Prevent the link from being followed when clicking the button
                        e.preventDefault();
                        e.stopPropagation();
                        // Handle completing order
                        console.log(
                          `Completing order ${order.id} for table ${table.id}`
                        );
                      }}
                    >
                      Complete Order
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
