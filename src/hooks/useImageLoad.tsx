"use client";

import { useState } from "react";

export default function useImageLoad() {
	const [isImageLoaded, setIsImageLoaded] = useState<{ [key: number]: boolean }>({});

	const handleImageLoad = (id: number) => {
		setIsImageLoaded((prevState) => ({ ...prevState, [id]: true }));
	};

	return { isImageLoaded, handleImageLoad };
}
