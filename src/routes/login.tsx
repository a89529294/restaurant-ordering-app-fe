import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { loginAPIPath } from "../constants";
import { postToApi } from "@/fetchUtils";

export const Route = createFileRoute("/login")({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			await postToApi(loginAPIPath, formData);
			navigate({ to: "/dashboard" });
		} catch (e: unknown) {
			console.log(e);
			toast.error("登入失敗");
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
				<div className="text-center">
					<h2 className="text-3xl font-bold text-gray-900">登入</h2>
				</div>
				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					<div className="space-y-4">
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700"
							>
								電子信箱
							</label>
							<input
								id="email"
								name="email"
								type="email"
								required
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
								value={formData.email}
								onChange={handleChange}
							/>
						</div>
						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700"
							>
								密碼
							</label>
							<input
								id="password"
								name="password"
								type="password"
								required
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
								value={formData.password}
								onChange={handleChange}
							/>
						</div>
					</div>

					<button
						type="submit"
						className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
					>
						登入
					</button>
				</form>

				<div className="text-center mt-4">
					<Link
						to="/signup"
						className="text-sm text-indigo-600 hover:text-indigo-500"
					>
						還沒有帳號嗎？ 註冊
					</Link>
				</div>
			</div>
		</div>
	);
}
