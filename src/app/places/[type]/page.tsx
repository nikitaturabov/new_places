"use client";

import { typePlaceEat } from "@/app/consts/places";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { HeaderButtons } from "@/app/features/header-buttons/ui/header-buttons";
import { Card } from "@/app/components/Card";

export type TPlace = {
	id: number;
	name: string;
	address_name: string;
	rating?: number;
	image?: string;
	external_content?: {
		count?: number;
		main_photo_url?: string;
		subtype?: string;
		type?: string;
	}[];
	dates?: {
		updated_at?: string;
	};
};

const API_KEY = process.env.NEXT_PUBLIC_2GIS_API_KEY || "";

const getCityId = async () => {
	if (!API_KEY) {
		throw new Error("Missing NEXT_PUBLIC_2GIS_API_KEY env variable");
	}
	const res = await fetch(
		`https://catalog.api.2gis.com/3.0/items/geocode?q=Архангельск&key=${API_KEY}`,
		{
			method: "GET",
		}
	);
	const data = await res.json();

	return data.result.items[0].id;
};

const getPlaces = async (type: string): Promise<TPlace[]> => {
	const cityId = await getCityId();

	const res = await fetch(
		`https://catalog.api.2gis.com/3.0/items?q=${type}&city_id=${cityId}&sort=creation_time&fields=items.external_content,items.dates&key=${API_KEY}`,
		{
			method: "GET",
		}
	);
	const data = await res.json();
	console.log(data);
	return data.result.items;
};

type PlaceListProps = {
	places: TPlace[];
};

function PlaceList({ places }: PlaceListProps) {
	const getDate = (date: string) => {
		const dateObj = new Date(date);
		return dateObj.toLocaleDateString("ru-RU", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		});
	};

	return (
		<div className="flex flex-col items-center w-full p-4">
			<div className="flex flex-col gap-6">
				{places.length ? (
					places?.map((place: TPlace) => (
						<Card
							key={place.id}
							placeId={place.id}
							name={place.name}
							address_name={place.address_name}
							rating={place.rating}
							photo_url={place.external_content?.[0]?.main_photo_url}
							date={getDate(place.dates?.updated_at || "")}
						/>
					))
				) : (
					<div className="text-center text-gray-500 py-8">
						Ничего не найдено
					</div>
				)}
			</div>
		</div>
	);
}

export default function Place() {
	const params = useParams();
	const type = params.type as string;
	const selectedPlacesType = typePlaceEat[type as keyof typeof typePlaceEat];
	const [places, setPlaces] = useState<TPlace[]>([]);

	useEffect(() => {
		const fetchPlaces = async () => {
			try {
				const data = await getPlaces(selectedPlacesType);
				setPlaces(data);
			} catch (error) {
				console.error("Error fetching places:", error);
			}
		};

		fetchPlaces();
	}, [selectedPlacesType]);

	return (
		<div>
			<HeaderButtons />
			<PlaceList places={places} />
		</div>
	);
}
