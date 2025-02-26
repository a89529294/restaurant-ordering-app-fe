export const IS_DEV = import.meta.env.DEV;
export const IS_PROD = import.meta.env.PROD;
export const API_BASE = IS_DEV
	? import.meta.env.VITE_DEV_BACKEND_URL
	: import.meta.env.VITE_PROD_BACKEND_URL;

// api routes
export const loginAPIPath = `auth/login`;
export const signupAPIPath = `auth/signup`;
export const logoutAPIPath = `auth/logout`;
