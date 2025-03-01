// import { errorToast } from "@/components/my-toast";
// import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Skeleton } from "@/components/ui/skeleton";
import { getTable } from "@/queries/get-table";
// import { Order, useGetTableOrders } from "@/queries/get-table-orders";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  createFileRoute,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import { ArrowLeft, QrCode } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Table } from "@/types";

export const Route = createFileRoute("/dashboard/tables/$tableId/")({
  async beforeLoad(ctx) {
    const tableId = ctx.params.tableId;
    const table = await getTable(ctx.context, tableId);

    if (!table) throw new Error("table does not exist");
  },
  component: TableViewComponent,
  errorComponent: () => "餐桌不存在",
});

function TableViewComponent() {
  const { tableId } = useParams({ from: "/dashboard/tables/$tableId/" });
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [showQrCode, setShowQrCode] = useState(false);

  const table = queryClient.getQueryData<Table>(["tables", tableId]);

  console.log(tableId);

  //   const ordersQuery = queryClient.fetchQuery({
  //     ...useGetTableOrders(tableId),
  //     context: { queryClient },
  //   });

  //   const handleCompleteOrder = async (orderId: string) => {
  //     try {
  //       // This would be replaced with an actual API call
  //       console.log(`Completing order ${orderId} for table ${tableId}`);

  //       // Invalidate orders query to refresh the data
  //       queryClient.invalidateQueries({
  //         queryKey: ["tables", tableId, "orders"],
  //       });
  //     } catch (error) {
  //       errorToast(
  //         error instanceof Error ? error.message : "Failed to complete order"
  //       );
  //     }
  //   };

  // Generate the QR code URL for this table
  const qrCodeUrl = `${window.location.origin}/menu/${tableId}`;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate({ to: "/dashboard" })}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-xl font-semibold">
            {table?.name || "Table Details"}
          </h1>
        </div>
        <Button
          variant="outline"
          onClick={() => setShowQrCode(!showQrCode)}
          className="flex items-center space-x-2"
        >
          <QrCode className="h-4 w-4" />
          <span>QR Code</span>
        </Button>
      </div>

      {showQrCode && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              QR Code for {table?.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <QRCodeSVG value={qrCodeUrl} />
            <p className="mt-4 text-sm text-muted-foreground">
              Scan this QR code to access the menu for {table?.name}
            </p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Current Orders for {table?.name}
          </CardTitle>
          {/* {!ordersQuery.isLoading && (
            <Badge variant="outline">
              {ordersQuery.data?.length || 0} orders
            </Badge>
          )} */}
        </CardHeader>
        {/* <CardContent>
          {ordersQuery.isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-lg border p-3">
                  <Skeleton className="h-5 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-1" />
                  <Skeleton className="h-4 w-1/2 mb-3" />
                  <Skeleton className="h-9 w-full" />
                </div>
              ))}
            </div>
          ) : ordersQuery.data?.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-6">
              <p className="text-muted-foreground">No orders yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {ordersQuery.data?.map((order: Order) => (
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
                    onClick={() => handleCompleteOrder(order.id)}
                    disabled={order.status !== "pending"}
                  >
                    {order.status === "completed" 
                      ? "Completed" 
                      : order.status === "cancelled" 
                        ? "Cancelled" 
                        : "Complete Order"}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent> */}
      </Card>
    </div>
  );
}
