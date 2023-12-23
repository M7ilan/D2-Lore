"use client";

import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function SwitchThemeButton() {
	const { theme, setTheme } = useTheme();
	const [isClient, setIsClient] = useState(false);

	function ChangeTheme() {
		if (theme === "dark") {
			setTheme("light");
		} else {
			setTheme("dark");
		}
	}

	useEffect(() => {
		setIsClient(true);
	}, []);

	return (
		<button onClick={ChangeTheme} className="!p-2 secondary-button">
			{isClient ? theme === "dark" ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" /> : <div className="h-6 w-6"></div>}
		</button>
	);
}
