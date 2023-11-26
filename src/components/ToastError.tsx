import { toast } from "react-hot-toast";

const ToastError = (content: string) =>
	toast.error(content, {
		style: {
			backgroundColor: localStorage.getItem("theme") === "dark" ? "#343a40" : "#f1f3f5",
			color: localStorage.getItem("theme") === "dark" ? "#f1f3f5" : "#343a40",
		},
	});

export default ToastError;
