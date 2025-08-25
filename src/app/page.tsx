"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
	const router = useRouter();

	useEffect(() => {
		router.replace("/places/restaurant");
	}, [router]);

	return (
		<div className="flex items-center justify-center min-h-screen">
			<span className="text-gray-500">Загрузка...</span>
		</div>
	);
}
