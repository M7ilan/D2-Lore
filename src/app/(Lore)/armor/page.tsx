"use client";

export default function ArmorPage() {
	const dotStyle = {
		animation: "dot 1.4s infinite",
		animationFillMode: "both",
	};

	const delay1Style = {
		...dotStyle,
		animationDelay: "0.2s",
	};

	const delay2Style = {
		...dotStyle,
		animationDelay: "0.4s",
	};

	return (
		<div className="grid border-y h-full items-center border-default header center py-8">
			Coming Soon
			<span style={dotStyle}>.</span>
			<span style={delay1Style}>.</span>
			<span style={delay2Style}>.</span>
			<style>
				{`
          @keyframes dot {
            0%, 80%, 100% {
              opacity: 0;
            }
            40% {
              opacity: 1;
            }
          }
        `}
			</style>
		</div>
	);
}
