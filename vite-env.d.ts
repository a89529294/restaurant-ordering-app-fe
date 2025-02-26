interface ImportMetaEnv {
	readonly VITE_DEV_BACKEND_URL: string;
	readonly VITE_PROD_BACKEND_URL: string;
	readonly DEV: string;
	readonly PROD: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
