import Link from "next/link";

export default function NotFound() {
	return (
		<div className="h-screen center flex-col gap-8">
			<div className="flex leading-[48px] header">
				<h1 className="text-error border-r-2 pr-6 mr-6">404</h1>
				<p>This page could not be found.</p>
			</div>
			<Link href="/" className="secondary-button">
				Return Home
			</Link>
		</div>
	);
}
