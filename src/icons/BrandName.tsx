import Link from "next/link";

export default function BrandName({ className }: { className?: string }) {
	return (
		<Link href="/">
			<svg className={`animate cursor-pointer hover:text-opacity-100 ${className}`} xmlns="http://www.w3.org/2000/svg" width="106" height="16" fill="currentColor" viewBox="0 0 106 16">
				<path d="M15.8134 8c.0952 4.3325-4.0663 7.8429-8.86976 7.7763H0V.223717h6.94364C11.7471.157064 15.9086 3.6675 15.8134 8ZM6.80097 3.37867H3.78096v9.22043h3.02001c2.82977 0 5.13643-2.044 5.13643-4.5991 0-2.5995-2.30666-4.62133-5.13643-4.62133ZM23.8413 12.7991H30.88v2.9772H18.0628v-2.6884l7.1577-5.31008c1.1176-.88872 1.5219-1.51082 1.5219-2.33288 0-1.08868-.9512-1.84409-2.3066-1.84409-1.4981 0-2.8774.68875-4.0188 1.99961L17.9915 3.6675C19.4896 1.62345 21.8914.445896 24.626.445896c3.4956 0 5.9925 1.999614 5.9925 4.776864 0 1.84409-.8561 3.13273-3.9237 5.37674l-2.8535 2.1996ZM43.3517.223717V12.5991h8.4655v3.1772H39.5707V.223717h3.781ZM71.2314 8c.0952 4.3103-4.0901 8.0873-8.846 7.9985-4.8272.0888-8.9887-3.6882-8.8936-7.9985-.0951-4.31028 4.0664-8.0873346 8.8936-7.99846262C67.1413-.0873346 71.3266 3.68972 71.2314 8ZM57.4393 8c0 2.5995 2.1163 4.6658 4.9461 4.6658 2.7822 0 4.9224-2.0885 4.9224-4.6658 0-2.5995-2.1402-4.68799-4.9224-4.68799-2.8298 0-4.9461 2.08849-4.9461 4.68799Zm32.5106 7.7763h-4.423l-3.4481-4.9324h-3.6382v4.9324h-3.781V.223717h7.3717c5.2315 0 7.3954 1.577473 7.3954 5.199003 0 2.55506-1.0938 4.17697-3.3767 4.91018l3.8999 5.4434ZM78.4406 3.28979v4.59912h3.7809c2.3542 0 3.2578-.66654 3.2578-2.28845 0-1.66635-.9036-2.31067-3.2578-2.31067h-3.7809ZM105.834.223717V3.35645h-9.5123v3.04386h8.8223v2.99942h-8.8223v3.22157H106v3.155H92.5407V.223717h13.2933Z" />
			</svg>
		</Link>
	);
}