import { toast } from "react-hot-toast";

const ToastSuccess = (content: string) =>
	toast.success(content, {
		style: {
			backgroundColor: localStorage.getItem("theme") === "dark" ? "#343a40" : "#f1f3f5",
			color: localStorage.getItem("theme") === "dark" ? "#f1f3f5" : "#343a40",
		},
	});

export default ToastSuccess;
