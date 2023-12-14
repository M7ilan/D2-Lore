export default async function fetchData(url: string, options?: RequestInit) {
	const res = await fetch(url, options);
	if (!res.ok) {
		throw new Error(`Failed to fetch data from ${url}`);
	}
	return res.json();
}
