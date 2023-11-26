import Link from "next/link";

export default function Logo({ classname }: { classname?: string }) {
	return (
		<Link href="/" className={`text-4xl font-bold cursor-pointer ${classname}`}>
			Logo
		</Link>
	);
}
