import Sidebar from "@/src/components/Sidebar";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="grid md:grid-cols-[min-content_1fr] gap-8 px-8">
			<Sidebar />
			<div>{children}</div>
		</div>
	);
}
