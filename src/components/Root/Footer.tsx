// import Link from "next/link";
import Link from "next/link";
import Logo from "@/src/components/Logo";
import Image from "next/image";
// import Socials from "./Socials";

export default function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="p-8 bg-default-2">
			<div className="xl:grid grid-cols-3 gap-8">
				<div className="flex flex-col gap-4">
					<div className="flex gap-4">
						<Image quality={100} priority src="/Logo.png" className="w-24 h-24 p-2 opacity-80 dark:opacity-100 invert dark:invert-0" width={344} height={344} alt="Logo" />
						<div>
							<Logo className="text-4xl" />
							<div className="text-sm text-default-60">
								<p className="leading-8">The Destiny 2 Lore Library.</p>
								<p>
									&copy; {year}{" "}
									<Link href="https://github.com/M7ilan" className="clickable-button">
										M7ilan
									</Link>
								</p>
							</div>
						</div>
					</div>
					{/* <Socials size={24} /> */}
				</div>
				{/* <div className="md:grid col-span-2 grid-cols-2 gap-8 mt-16 xl:mt-0">
					<div className="grid col-start-2 grid-cols-2 gap-8">
						<div>
							<div className="font-bold">Support</div>
							<div className="mt-6 flex flex-col">
								<div className="mt-4">
									<Link href="#" className="clickable-button">
										Pricing
									</Link>
								</div>
								<div className="mt-4">
									<Link href="#" className="clickable-button">
										Documentation
									</Link>
								</div>
							</div>
						</div>
						<div>
							<div className="font-bold">Solutions</div>
							<div className="mt-6 flex flex-col">
								<div className="mt-4">
									<Link href="#" className="clickable-button">
										Marketing
									</Link>
								</div>
								<div className="mt-4">
									<Link href="#" className="clickable-button">
										Analytics
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div> */}
			</div>
		</footer>
	);
}
