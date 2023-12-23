import Link from "next/link";
import { RiGithubFill, RiInstagramFill, RiTiktokFill, RiTwitterXFill, RiYoutubeFill } from "react-icons/ri";

export default function Socials({ size, className }: { size?: number; className?: string }) {
	const customSize = `${size || "32"}px`;

	return (
		<div className={`flex flex-wrap gap-2 text-left items-center ${className}`}>
			<Link className="opacity-50 hover:opacity-100" target="_blank" href="https://x.com">
				<RiTwitterXFill style={{ height: customSize, width: customSize }} />
			</Link>
			<Link className="opacity-50 hover:opacity-100" target="_blank" href="https://github.com">
				<RiGithubFill style={{ height: customSize, width: customSize }} />
			</Link>
			<Link className="opacity-50 hover:opacity-100" target="_blank" href="https://www.tiktok.com">
				<RiTiktokFill style={{ height: customSize, width: customSize }} />
			</Link>
			<Link className="opacity-50 hover:opacity-100" target="_blank" href="https://www.instagram.com">
				<RiInstagramFill style={{ height: customSize, width: customSize }} />
			</Link>
			<Link className="opacity-50 hover:opacity-100" target="_blank" href="https://www.youtube.com">
				<RiYoutubeFill style={{ height: customSize, width: customSize }} />
			</Link>
		</div>
	);
}
