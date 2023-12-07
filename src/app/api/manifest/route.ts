export async function GET() {
	const options = {
		method: "GET",
		headers: {
			"X-API-Key": process.env.API_KEY as string,
		},
	};

	const response = await fetch("https://www.bungie.net/Platform/Destiny2/Manifest/", options);
	const data = await response.json();

	return Response.json(data);
}
