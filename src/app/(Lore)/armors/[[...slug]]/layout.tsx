import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Armors",
	description: "Armors Library",
};

type ArmorsLayoutsProps = {
	Title: React.ReactNode;
	Nodes: React.ReactNode;
	Categories: React.ReactNode;
	Armors: React.ReactNode;
};

export default function ArmorsLayout({ Title, Nodes, Categories, Armors }: ArmorsLayoutsProps) {
	return (
		<div className="grid grid-rows-[min-content_1fr] gap-4">
			<div>{Title}</div>
			<div className="grid max-lg:grid-rows-[min-content_1fr] lg:grid-cols-[320px_1fr] gap-8">
				<div className="relative h-full">
					<div className="sticky top-10 grid grid-rows-[min-content_1fr] gap-4">
						<div>{Nodes}</div>
						<div>{Categories}</div>
					</div>
				</div>
				<div className="lg:border-l-2 lg:pl-8">
					<div>{Armors}</div>
				</div>
			</div>
		</div>
	);
}
