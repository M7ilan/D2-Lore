"use client";

import Image from "next/image";
import useImageLoad from "@/src/hooks/useImageLoad";
import clsx from "clsx";

type FullItemIconProps = {
	iconSrc: string;
	watermarkSrc?: string;
	id: number;
	className?: string;
};

export default function FullItemIcon({ iconSrc, watermarkSrc, id, className }: FullItemIconProps) {
	const { isImageLoaded, handleImageLoad } = useImageLoad();

	return (
		<div className="relative w-16 h-16">
			<Image onLoad={() => handleImageLoad(id)} className={clsx(`absolute inset-0 animate border ${className}`, { "opacity-100": isImageLoaded[id], "opacity-0": !isImageLoaded[id] })} src={iconSrc} alt="icon" width={96} height={96} />
			{watermarkSrc && <Image className="absolute top-0 left-0" src={process.env.NEXT_PUBLIC_BUNGIE_URL + watermarkSrc} alt="watermark" width={96} height={96} />}
		</div>
	);
}
