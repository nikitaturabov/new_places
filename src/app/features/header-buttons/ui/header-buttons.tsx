import { Tabs, Tab } from "@heroui/react";
import { typePlaceEat } from "../../../consts/places";
import { FC, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export const HeaderButtons: FC = () => {
	const pathname = usePathname();
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);

	return (
		<>
			<div className="hidden md:block">
				<Tabs
					selectedKey={pathname}
					onSelectionChange={() => {}}
					aria-label="Dynamic tabs"
				>
					{Object.keys(typePlaceEat).map((type) => (
						<Tab
							key={`/places/${type}`}
							title={typePlaceEat[type as keyof typeof typePlaceEat]}
							onClick={() => router.push(`/places/${type}`)}
						/>
					))}
				</Tabs>
			</div>

			<div className="md:hidden">
				<button
					className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-50 bg-gray-600 text-white p-3 rounded-full shadow-lg"
					onClick={() => setIsOpen(!isOpen)}
				>
					{isOpen ? (
						<XMarkIcon className="w-6 h-6" />
					) : (
						<Bars3Icon className="w-6 h-6" />
					)}
				</button>

				{isOpen && (
					<div
						className="fixed inset-0 bg-black/40 z-30"
						onClick={() => setIsOpen(false)}
					/>
				)}

				<div
					className={`
          fixed bottom-0 left-0 right-0
          ${isOpen ? "translate-y-0" : "translate-y-full"}
          transition-transform duration-300 ease-in-out
          bg-white
          shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]
          rounded-t-2xl
          p-4 pt-2
          z-40
          max-h-[65vh]
          overflow-y-auto
          pb-[env(safe-area-inset-bottom)]
        `}
				>
					<div className="flex flex-col items-center mb-2">
						<div className="h-1.5 w-10 rounded-full bg-gray-300 mb-2" />
						<div className="flex items-center justify-end w-full">
							<button
								aria-label="Закрыть меню"
								className="p-2 -mr-2"
								onClick={() => setIsOpen(false)}
							>
								<XMarkIcon className="w-5 h-5" />
							</button>
						</div>
					</div>
					<Tabs
						selectedKey={pathname}
						onSelectionChange={() => {}}
						aria-label="Dynamic tabs"
						isVertical={true}
						size="lg"
						classNames={{
							base: "w-full",
							tabList: "w-full flex flex-col gap-1",
							tab: "w-full justify-start",
							panel: "w-full",
						}}
					>
						{Object.keys(typePlaceEat).map((type) => (
							<Tab
								key={`/places/${type}`}
								title={typePlaceEat[type as keyof typeof typePlaceEat]}
								onClick={() => {
									router.push(`/places/${type}`);
									setIsOpen(false);
								}}
							/>
						))}
					</Tabs>
				</div>
			</div>
		</>
	);
};
