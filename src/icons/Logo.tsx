import Link from "next/link";

export default function Logo({ className }: { className?: string }) {
	return (
		<Link href="/">
			<svg className={`animate cursor-pointer hover:text-opacity-100 ${className}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
				<path d="m24 12-6.5 5.5L12 24l-5.5-6.5L0 12l6.5-5.5L12 0l5.5 6.5L24 12Zm-10-2-2-2.5-2 2.5-2.5 2 2.5 2 2 2.5 2-2.5 2.5-2-2.5-2Z" />
			</svg>
		</Link>
	);
}
