import { Link } from "@heroui/react";
import { FC } from "react";
import Image from "next/image";
import { MapPinIcon } from "@heroicons/react/24/solid";

export type TPlaceCard = {
	name: string;
	address_name: string;
	rating?: number;
	photo_url?: string;
	date: string;
	placeId: number;
};

export const Card: FC<TPlaceCard> = (props) => {
	const { name, address_name, photo_url, date, placeId } = props;

	return (
		<div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
			<div className="flex flex-col md:flex-row">
				<div className="w-full md:w-48 h-48 bg-gray-200 relative">
					{photo_url ? (
						<Image
							src={photo_url}
							alt={name}
							fill
							sizes="(max-width: 768px) 100vw, 192px"
							className="object-cover"
							unoptimized
						/>
					) : (
						<div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
							<span className="text-gray-400 text-sm md:text-base">
								Нет фото
							</span>
						</div>
					)}
				</div>
				<div className="p-4 md:p-6 flex-1">
					<div className="flex items-start justify-between max-w-[350px] overflow-hidden">
						<h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 truncate">
							{name}
						</h2>
					</div>
					{date && (
						<div className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4">
							{"Дата открытия:"} <b>{date}</b>
						</div>
					)}
					<div className="flex items-center gap-2 text-gray-600 mb-3 md:mb-4 text-sm md:text-base">
						<MapPinIcon className="w-4 h-4" />
						<p className="line-clamp-2">{address_name}</p>
					</div>
					<Link
						href={`https://2gis.ru/firm/${placeId}`}
						target="_blank"
						className="inline-flex items-center px-3 md:px-4 py-1.5 md:py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200"
					>
						Открыть на карте
					</Link>
				</div>
			</div>
		</div>
	);
};
