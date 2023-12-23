import Sidebar from "@/src/components/Lore/Sidebar";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="grid md:grid-cols-[min-content_1fr] gap-8 p-8">
			<Sidebar />
			<div>{children}</div>
		</div>
	);
}
