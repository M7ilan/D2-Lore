import { toast } from "react-hot-toast";

const ToastPromise: ToastPromiseType = (customFunction, loadingMessage, successMessage, errorMessage) =>
	toast.promise(
		customFunction(),
		{
			loading: loadingMessage,
			success: successMessage,
			error: errorMessage,
		},
		{
			duration: 10000,
			style: {
				backgroundColor: localStorage.getItem("theme") === "dark" ? "#343a40" : "#f1f3f5",
				color: localStorage.getItem("theme") === "dark" ? "#f1f3f5" : "#343a40",
			},
		},
	);

export default ToastPromise;
