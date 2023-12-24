export default function loading() {
	return (
		<div className="animate-pulse my-8 mx-[2%] grid grid-rows-[min-content_1fr] gap-8">
			<div className="flex gap-4 items-center">
				<div className="h-16 w-16 bg-default-20 rounded-md"></div>
				<div className="flex flex-col gap-4">
					<div className="header bg-default-20 h-4 w-64 rounded-full"></div>
					<div className="text-default-50 bg-default-20 h-2 w-32 rounded-full"></div>
				</div>
			</div>
			<div className="grid grid-rows-[min-content_1fr] gap-8">
				<div className="bg-default-20 h-4 rounded-full"></div>
				<div className="bg-default-20 h-4 rounded-full"></div>
			</div>
		</div>
	);
}
