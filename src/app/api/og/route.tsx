/* eslint-disable @next/next/no-img-element */
// @ts-nocheck

import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
	try {
		const BooksImage = await fetch(new URL("../../../../public/Books Black.png", import.meta.url)).then((res) => res.arrayBuffer());
		const LogoImage = await fetch(new URL("../../../../public/Lore Logo.png", import.meta.url)).then((res) => res.arrayBuffer());

		return new ImageResponse(
			(
				<div tw="flex flex-col w-full h-full items-center justify-center text-white">
					<img tw="absolute" src={BooksImage} alt="Books" />
					<img width={128} height={128} src={LogoImage} alt="Logo" />
					<div tw="text-9xl font-bold">D2 Lore</div>
					<div tw="text-2xl">Discover the Legends!</div>
				</div>
			),
		);
	} catch (error: any) {
		return new Response("Failed to generate OG image", { status: 500 });
	}
}
