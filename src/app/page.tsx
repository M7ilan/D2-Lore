import Link from "next/link";
import PingIcon from "@/src/components/PingIcon";

export default function Home() {
	return (
		<div className="flex flex-col gap-2">
			<div className="relative isolate py-32 mx-2">
				<div className="mx-auto max-w-2xl center flex-col">
					<div className="mb-4 flex justify-center">
						<Link href="https://beta.d2lore.com" className="flex items-center gap-2 relative rounded-full px-3 py-1 text-sm leading-6 border">
							Give Beta Version a Try!
							<PingIcon />
						</Link>
					</div>
					<div className="text-center">
						<h1 className="font-bold tracking-tight header">Welcome to D2 Lore</h1>
						<p className="mt-6 leading-8 text-opacity-60">The Destiny 2 Lore Library.</p>
						<div className="mt-10 flex items-center justify-center gap-x-6">
							<Link href="/books" className="primary-button">
								Discover the Legends
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
