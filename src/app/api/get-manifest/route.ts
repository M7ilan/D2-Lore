import fetchData from "@/src/utils/fetchData";
import neededComponents from "@/src/utils/neededComponents";
import { DestinyManifest } from "bungie-api-ts/destiny2";

export async function GET() {
	const manifestUrl = "https://www.bungie.net/Platform/Destiny2/Manifest/";

	const options = {
		headers: {
			"X-API-Key": process.env.API_KEY as string,
		},
	};

	const destinyManifest: DestinyManifest = (await fetchData(manifestUrl, options)).Response;
	const components = destinyManifest.jsonWorldComponentContentPaths.en;

	const data: { [key: string]: object | string } = {};

	data.version = destinyManifest.version;

	for (const component of neededComponents) {
		const componentUrl = `https://www.bungie.net${components[component]}`;
		data[component] = await fetchData(componentUrl, options);
	}

	return Response.json(data);
}
