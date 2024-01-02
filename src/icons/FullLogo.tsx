import Link from "next/link";

export default function FullLogo({ className }: { className?: string }) {
	return (
		<Link href="/">
			<svg className={`animate cursor-pointer hover:text-opacity-100 ${className}`} xmlns="http://www.w3.org/2000/svg" width="140" height="24" fill="currentColor" viewBox="0 0 140 24">
				<path d="m24 12-6.5 5.5L12 24l-5.5-6.5L0 12l6.5-5.5L12 0l5.5 6.5L24 12Zm-10-2-2-2.5-2 2.5-2.5 2 2.5 2 2 2.5 2-2.5 2.5-2-2.5-2Zm35.8134 2c.0952 4.3325-4.0663 7.8429-8.8698 7.7763H34V4.22372h6.9436C45.7471 4.15706 49.9086 7.6675 49.8134 12ZM40.801 7.37867h-3.02v9.22043h3.02c2.8297 0 5.1364-2.044 5.1364-4.5991 0-2.5995-2.3067-4.62133-5.1364-4.62133Zm17.0403 9.42043H64.88v2.9772H52.0628v-2.6884l7.1577-5.3101c1.1176-.8887 1.5219-1.5108 1.5219-2.33286 0-1.08868-.9512-1.84409-2.3066-1.84409-1.4981 0-2.8774.68875-4.0188 1.99961L51.9915 7.6675c1.4981-2.04405 3.8999-3.2216 6.6345-3.2216 3.4956 0 5.9925 1.99961 5.9925 4.77686 0 1.84404-.8561 3.13274-3.9237 5.37674l-2.8535 2.1996ZM77.3517 4.22372V16.5991h8.4655v3.1772H73.5707V4.22372h3.781ZM105.231 12c.096 4.3103-4.09 8.0873-8.8456 7.9985-4.8272.0888-8.9887-3.6882-8.8936-7.9985-.0951-4.31028 4.0664-8.08733 8.8936-7.99846C101.141 3.91267 105.327 7.68972 105.231 12Zm-13.7917 0c0 2.5995 2.1163 4.6658 4.9461 4.6658 2.7822 0 4.9226-2.0885 4.9226-4.6658 0-2.5995-2.1404-4.68799-4.9226-4.68799-2.8298 0-4.9461 2.08849-4.9461 4.68799Zm32.5107 7.7763h-4.423l-3.448-4.9324h-3.638v4.9324h-3.781V4.22372h7.371c5.232 0 7.396 1.57747 7.396 5.199 0 2.55508-1.094 4.17698-3.377 4.91018l3.9 5.4434ZM112.441 7.28979v4.59911h3.781c2.354 0 3.257-.6665 3.257-2.28844 0-1.66635-.903-2.31067-3.257-2.31067h-3.781Zm27.393-3.06607v3.13273h-9.512v3.04385h8.822v2.9994h-8.822v3.2216H140v3.155h-13.459V4.22372h13.293Z" />
			</svg>
		</Link>
	);
}
