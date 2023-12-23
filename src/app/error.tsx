"use client"; // Error components must be Client Components

import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error }: { error: Error & { digest?: string } }) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<div className="h-screen center flex-col gap-8">
			<div className="flex leading-[48px] header">
				<h1 className="text-error border-r-2 pr-6 mr-6 uppercase">Error</h1>
				<p>{error.message}</p>
			</div>
			<Link href="/" className="secondary-button">
				Return Home
			</Link>
		</div>
	);
}
