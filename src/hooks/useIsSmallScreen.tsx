import { useState, useEffect } from "react";

const useIsSmallScreen = (): boolean => {
	const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

	useEffect(() => {
		const handleResize = () => {
			setIsSmallScreen(window.innerWidth < 768);
		};

		window.addEventListener("resize", handleResize);

		handleResize();

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return isSmallScreen;
};

export default useIsSmallScreen;
