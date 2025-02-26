import { API_BASE } from "./constants";

export class ApiError extends Error {
	constructor(
		public status: number,
		message: string,
		public code?: string
	) {
		super(message);
	}
}

export const fetchJson = <T>(relativeUrl: string) => {
	return fetch(`${API_BASE}/${relativeUrl}`, {
		credentials: "include",
	}).then((resp) => {
		if (resp.status === 302) {
			history.replaceState(null, "", "/login");
		}

		if (resp.status === 404) {
			throw new ApiError(
				404,
				`Resource not found at ${relativeUrl}`,
				"NOT_FOUND"
			);
		}

		if (!resp.ok) {
			throw new ApiError(
				resp.status,
				`Request failed: ${resp.statusText}`,
				"API_ERROR"
			);
		}

		return resp.json() as T;
	});
};

export const postToApi = <T>(relativeUrl: string, body = {}) => {
	return fetch(`${API_BASE}/${relativeUrl}`, {
		method: "POST",
		body: JSON.stringify(body),
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
	}).then((resp) => {
		if (resp.status === 302) {
			history.replaceState(null, "", "/login");
		}

		if (resp.status === 404) {
			throw new ApiError(
				404,
				`Resource not found at ${relativeUrl}`,
				"NOT_FOUND"
			);
		}

		if (!resp.ok) {
			throw new ApiError(
				resp.status,
				`Request failed: ${resp.statusText}`,
				"API_ERROR"
			);
		}

		return resp.json() as T;
	});
};
