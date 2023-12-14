import fetchData from "@/src/utils/fetchData";

export async function GET() {
	const options = {
		headers: {
			"X-API-Key": process.env.API_KEY as string,
		},
	};

	const response = await fetchData("https://www.bungie.net/Platform/Destiny2/Manifest/", options);

	return Response.json(response.Response);
}
