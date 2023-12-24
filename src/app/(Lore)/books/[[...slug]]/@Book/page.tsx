import { Metadata } from "next";
import BookComponent from "./BookComponent";
import { DestinyPresentationNodeDefinition, DestinyManifest, DestinyRecordDefinition, DestinyLoreDefinition } from "bungie-api-ts/destiny2";
import fetchData from "@/src/utils/fetchData";

export default function BookPage() {
	return <BookComponent />;
}

export async function generateMetadata({ params }: { params: { slug: number[] } }): Promise<Metadata> {
	const nodeHash = params?.slug?.[0];
	const bookHash = params?.slug?.[1];
	const recordHash = params?.slug?.[2];

	if (!nodeHash)
		return {
			title: "Books",
		};

	const options = {
		headers: {
			"X-API-Key": process.env.NEXT_PUBLIC_API_KEY as string,
		},
	};

	const destinyManifest: DestinyManifest = (await fetchData("https://www.bungie.net/Platform/Destiny2/Manifest/", options)).Response;
	const components = destinyManifest.jsonWorldComponentContentPaths.en;

	const PresentationNodeDefinition = await fetchData(`https://www.bungie.net${components["DestinyPresentationNodeDefinition"]}`, options);
	const RecordDefinition = await fetchData(`https://www.bungie.net${components["DestinyRecordDefinition"]}`, options);
	const LoreDefinition = await fetchData(`https://www.bungie.net${components["DestinyLoreDefinition"]}`, options);

	const node: DestinyPresentationNodeDefinition = PresentationNodeDefinition[nodeHash];
	const book: DestinyPresentationNodeDefinition = PresentationNodeDefinition[bookHash];
	const record: DestinyRecordDefinition = RecordDefinition[recordHash];

	const nodeName = node.displayProperties.name;
	const nodeIcon = node.displayProperties.icon;

	if (!book)
		return {
			title: nodeName,
			openGraph: {
				title: nodeName,
				images: [
					{
						url: `https://www.bungie.net${nodeIcon}`,
						alt: nodeName,
					},
				],
			},
		};

	const bookName = book.displayProperties.name;
	const bookIcon = book.displayProperties.iconSequences[1].frames[0];

	if (!record)
		return {
			title: bookName || nodeName,
			openGraph: {
				title: bookName,
				images: [
					{
						url: `https://www.bungie.net${bookIcon || nodeIcon}`,
						alt: bookName || nodeName,
					},
				],
			},
		};

	const loreHash = record.loreHash || 0;
	const lore: DestinyLoreDefinition = LoreDefinition[loreHash];
	const loreTitle = lore?.displayProperties.name;
	const loreContent = lore?.displayProperties.description;

	return {
		title: loreTitle || bookName || nodeName,
		icons: [
			{
				url: `https://www.bungie.net${bookIcon || nodeIcon}`,
				type: "image/png",
			},
		],
		openGraph: {
			title: loreTitle,
			description: loreContent,
			images: [
				{
					url: `https://www.bungie.net${bookIcon || nodeIcon}`,
					alt: bookName || nodeName,
				},
			],
		},
	};
}
