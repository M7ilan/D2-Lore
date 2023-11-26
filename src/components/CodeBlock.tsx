import clsx from "clsx";
import SyntaxHighlighter from "react-syntax-highlighter";
import { useState } from "react";
import { MdOutlineContentCopy } from "react-icons/md";
import LoadingIcon from "./LoadingIcon";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

type CodeBlockProps = {
	name?: string;
	code: object;
	language: string;
};

export default function CodeBlock({ name, code, language }: CodeBlockProps) {
	name = name ?? language;

	const [copied, setCopied] = useState(false);
	const [loading, setLoading] = useState(false);

	const copy = async () => {
		setLoading(true);
		try {
			await navigator.clipboard.writeText(JSON.stringify(code, null, 4));
			setCopied(true);
			setTimeout(() => setCopied(false), 3000);
		} catch (err) {
			console.error("Copy failed", err);
		}
		setLoading(false);
	};

	return (
		<div className="rounded-md overflow-hidden">
			<div className="bg-[#202123] px-4 py-2 flex justify-between">
				<div>{name}</div>
				<div onClick={copy} className={clsx("flex items-center gap-1", { "cursor-pointer": !copied })} aria-label="Copy code to clipboard">
					{loading ? (
						<LoadingIcon size={16} />
					) : (
						<>
							{!copied && <MdOutlineContentCopy />}
							<div>{copied ? "Copied!" : "Copy code"}</div>
						</>
					)}
				</div>
			</div>
			<SyntaxHighlighter language={language} style={atomOneDark} customStyle={{ padding: "16px", backgroundColor: "black" }}>
				{JSON.stringify(code, null, 2)}
			</SyntaxHighlighter>
		</div>
	);
}
