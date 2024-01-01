import { useState, useEffect } from "react";

const useIsSmallScreen = (): boolean => {
	const [isSmallScreen, setIsSmallScreen] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setIsSmallScreen(window.innerWidth < 1024);
		};

		window.addEventListener("resize", handleResize);

		handleResize();

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return isSmallScreen;
};

export default useIsSmallScreen;
