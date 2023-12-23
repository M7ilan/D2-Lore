import Link from "next/link";

export default function Logo({ className }: { className?: string }) {
	return (
		<Link href="/" className={`font-bold cursor-pointer ${className}`}>
			D2 Lore
		</Link>
	);
}
