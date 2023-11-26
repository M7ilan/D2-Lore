"use client";

import { ReactNode } from "react";
import { ThemeProvider as Provider } from "next-themes";

export default function ThemeProvider({ children }: { children: ReactNode }) {
	return <Provider attribute="class">{children}</Provider>;
}
