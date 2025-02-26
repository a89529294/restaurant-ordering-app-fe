import { errorToast } from "@/components/my-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { postToApi } from "@/fetchUtils";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/create-table")({
	component: RouteComponent,
});

function RouteComponent() {
	const [tableName, setTableName] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!tableName.trim()) {
			errorToast("Please enter a table name", {
				style: { border: "1px solid red" },
			});
			return;
		}

		// Here you would typically make an API call to create the table
		await postToApi("tables/create", {
			name: tableName,
		});

		toast.success(`Table "${tableName}" created successfully!`);

		// Reset form
		setTableName("");
	};

	return (
		<div className="max-w-md mx-auto">
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">新餐桌</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="space-y-2">
							<label htmlFor="tableName" className="text-sm font-medium">
								餐桌名
							</label>
							<Input
								id="tableName"
								value={tableName}
								onChange={(e) => setTableName(e.target.value)}
								placeholder="輸入餐桌名稱"
							/>
						</div>
						<Button type="submit" className="w-full">
							建立
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
