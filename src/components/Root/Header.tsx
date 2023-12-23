"use client";

import { useState } from "react";
import { Dialog, /* Popover */ } from "@headlessui/react";
import { HiMenu, HiX } from "react-icons/hi";
// import Link from "next/link";
import Logo from "@/src/components/Logo";
import SwitchThemeButton from "@/src/components/SwitchThemeButton";
import Image from "next/image";

// const links = [
// 	{
// 		name: "Features",
// 		href: "#",
// 	},
// 	{
// 		name: "Marketplace",
// 		href: "#",
// 	},
// 	{
// 		name: "Company",
// 		href: "#",
// 	},
// ];

export default function Header() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<header>
			<nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
				<div className="flex items-center gap-4 lg:flex-1">
					<Image quality={100} priority src="/Logo.png" className="w-12 h-12 invert opacity-80 dark:opacity-100 dark:invert-0" width={344} height={344} alt="Logo" />
					<Logo className="text-4xl" />
				</div>
				<div className="flex lg:hidden">
					<div className="inline-flex items-center justify-center rounded-md !p-1 cursor-pointer secondary-button" onClick={() => setMobileMenuOpen(true)}>
						<span className="sr-only">Open main menu</span>
						<HiMenu className="h-8 w-8 rounded-md" aria-hidden="true" />
					</div>
				</div>
				{/* <Popover.Group className="hidden lg:flex lg:gap-x-12">
					{links.map((link, index) => (
						<Link key={index} href={link.href} className="font-semibold clickable-button">
							{link.name}
						</Link>
					))}
				</Popover.Group> */}
				<div className="hidden lg:flex lg:flex-1 lg:justify-end">
					<SwitchThemeButton />
				</div>
			</nav>
			<Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
				<div className="fixed inset-0 z-10" />
				<Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto p-6 sm:max-w-sm sm:border-l bg-default">
					<div className="flex items-center justify-between">
						<Logo className="text-4xl" />
						<div className="rounded-md !p-1 cursor-pointer secondary-button" onClick={() => setMobileMenuOpen(false)}>
							<span className="sr-only">Close menu</span>
							<HiX className="h-8 w-8 rounded-md" aria-hidden="true" />
						</div>
					</div>
					<div className="mt-6 flow-root">
						<div className="-my-6 divide-y">
							{/* <div className="space-y-4 py-6">
								{links.map((link, index) => (
									<Link key={index} href={link.href} className="-mx-3 block px-3 py-1 font-semibold border-button-left">
										{link.name}
									</Link>
								))}
							</div> */}
							<div className="-mx-3 py-4 center">
								<SwitchThemeButton />
							</div>
						</div>
					</div>
				</Dialog.Panel>
			</Dialog>
		</header>
	);
}
