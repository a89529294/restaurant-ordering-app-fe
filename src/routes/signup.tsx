import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/signup")({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		inviteCode: "",
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		// Handle form submission here
		const response = await fetch(
			`${
				import.meta.env.DEV
					? import.meta.env.VITE_DEV_BACKEND_URL
					: import.meta.env.VITE_PROD_BACKEND_URL
			}/auth/signup`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
				credentials: "include",
			}
		);

		await response.json();

		navigate({ to: "/dashboard" });
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
					<h2 className="text-3xl font-bold text-gray-900">註冊</h2>
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
						<div>
							<label
								htmlFor="inviteCode"
								className="block text-sm font-medium text-gray-700"
							>
								邀請碼
							</label>
							<input
								id="inviteCode"
								name="inviteCode"
								type="text"
								required
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
								value={formData.inviteCode}
								onChange={handleChange}
							/>
						</div>
					</div>

					<button
						type="submit"
						className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
					>
						註冊
					</button>
				</form>

				<div className="text-center mt-4">
					<Link
						to="/login"
						className="text-sm text-indigo-600 hover:text-indigo-500"
					>
						已經有帳號了嗎？ 登入
					</Link>
				</div>
			</div>
		</div>
	);
}
