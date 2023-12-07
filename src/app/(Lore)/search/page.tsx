"use client";

import debounce from "lodash/debounce";
import { useManifest } from "@/src/providers/ManifestProvider";
import { useEffect, useState } from "react";
import SearchResultComponent from "@/src/components/Search/SearchResultComponent";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";

export default function SearchPage() {
	const { manifest } = useManifest();
	const [results, setResults] = useState<SearchResult[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [resultsPerPage] = useState(10);
	const searchParams = useSearchParams();

	const searchQuery = searchParams.get("search");

	const indexOfLastResult = currentPage * resultsPerPage;
	const indexOfFirstResult = indexOfLastResult - resultsPerPage;
	const paginatedResults = results.slice(indexOfFirstResult, indexOfLastResult);

	const totalPages = Math.ceil(results.length / resultsPerPage);

	const debouncedSearch = debounce((search: string) => {
		setSearchTerm(search);
		window.history.replaceState({}, "", `?search=${search}`);

		if (!search.trim()) {
			setResults([]);
			return;
		}

		const lowerCaseSearch = search.toLowerCase();
		const searchResults: SearchResult[] = [];

		const loreNodes = manifest?.DestinyPresentationNodeDefinition[4077680549]?.children.presentationNodes;

		loreNodes?.forEach((nodeId) => {
			const node = manifest?.DestinyPresentationNodeDefinition[nodeId.presentationNodeHash];
			const books = node?.children.presentationNodes;

			books?.forEach((bookId) => {
				const book = manifest?.DestinyPresentationNodeDefinition[bookId.presentationNodeHash];
				const bookTitle = book?.displayProperties.name;

				if (bookTitle?.toLowerCase().includes(lowerCaseSearch)) {
					searchResults.push({ node: nodeId.presentationNodeHash, book: bookId.presentationNodeHash });
				}

				const records = book?.children.records;
				records?.forEach((recordId) => {
					const record = manifest?.DestinyRecordDefinition[recordId.recordHash];
					const recordLoreHash = record?.loreHash;
					const recordContent = recordLoreHash ? manifest?.DestinyLoreDefinition[recordLoreHash]?.displayProperties : undefined;

					if (recordContent?.name.toLowerCase().includes(lowerCaseSearch) || recordContent?.description.toLowerCase().includes(lowerCaseSearch)) {
						searchResults.push({ node: nodeId.presentationNodeHash, book: bookId.presentationNodeHash, record: recordId.recordHash });
					}
				});
			});
		});

		setResults(searchResults);
	}, 1000);

	useEffect(() => {
		if (searchQuery) {
			setSearchTerm(searchQuery);
			debouncedSearch(searchQuery);
		}
	}, [manifest]);

	useEffect(() => {
		if (searchQuery) {
			setSearchTerm(searchQuery);
			debouncedSearch(searchQuery);
		}
	}, []);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		debouncedSearch(event.target.value);
	};

	const handlePageChange = (pageNumber: number) => {
		setCurrentPage(pageNumber);
	};

	return (
		<div className="grid">
			<input className="w-full" type="text" placeholder="Search" onChange={handleInputChange} />
			{paginatedResults.length > 0 && (
				<div className="mt-1">
					Total results for &quot;{searchTerm}&quot;: {results.length}
				</div>
			)}
			<div className="divide-y divide-default">
				{paginatedResults.length > 0 ? (
					<>
						{paginatedResults.map((result, index) => (
							<SearchResultComponent key={index} result={result} />
						))}
						<div className="grid grid-cols-[repeat(auto-fill,40px)] gap-2 pt-8">
							{[...Array(totalPages)].map((_, i) => (
								<div className={clsx("node w-10 h-10", { "active-node": currentPage === i + 1 })} key={i} onClick={() => handlePageChange(i + 1)}>
									{i + 1}
								</div>
							))}
						</div>
					</>
				) : (
					<>
						{searchTerm && (
							<div className="flex-col center gap-4 mt-16">
								<div className="header">Nothing found</div>
								<div>Searching for &quot;{searchTerm}&quot;</div>
							</div>
						)}
					</>
				)}
			</div>
		</div>
	);
}
