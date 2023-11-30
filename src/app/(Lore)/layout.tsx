import Sidebar from "@/src/components/Sidebar";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="grid grid-cols-[min-content_1fr] gap-8 px-16">
			<Sidebar />
			<div>{children}</div>
		</div>
	);
}
