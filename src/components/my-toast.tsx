import { toast } from "sonner";

export function successToast(...args: Parameters<typeof toast>) {
	return toast.success(...args);
}

export function errorToast(...args: Parameters<typeof toast>) {
	return toast.error(args[0], {
		...args[1],
		style: {
			border: "1px solid red",
			...args[1]?.style,
		},
	});
}
