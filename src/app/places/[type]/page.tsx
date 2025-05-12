"use client";

import { typePlaceEat } from '@/app/consts/places';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { StarIcon, MapPinIcon } from '@heroicons/react/24/solid';


type Place = {
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
  }[],
  dates?: {
    updated_at?: string;
  }
}

const API_KEY = "1dd398f5-c171-4588-a696-dd5ef16af838";

const getCityId = async () => {
  const res = await fetch(`https://catalog.api.2gis.com/3.0/items/geocode?q=Архангельск&key=${API_KEY}`, {
    method: "GET"
  });
  const data = await res.json();
  
  return data.result.items[0].id;
}

const getPlaces = async (type: string): Promise<Place[]> => {
  const cityId = await getCityId();
  
  const res = await fetch(`https://catalog.api.2gis.com/3.0/items?q=${type}&city_id=${cityId}&sort=creation_time&fields=items.external_content,items.dates&key=${API_KEY}`, {
    method: "GET"
  });
  const data = await res.json();
  console.log(data);
  return data.result.items;
}

type PlaceListProps = {
  places: Place[];
}

function PlaceList({ places }: PlaceListProps) {
  const getDate = (date: string) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  return (
    <div className='flex flex-col items-center w-full max-w-4xl mx-auto p-4'>
      <div className="flex flex-col gap-6 w-full">
        {places.length ? places?.map((place: Place) => (
          <div 
            key={place.id} 
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100"
          >
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-48 h-48 bg-gray-200 relative">
                {place?.external_content?.[0]?.main_photo_url ? (
                  <img 
                    src={place?.external_content?.[0]?.main_photo_url} 
                    alt={place.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">Нет фото</span>
                  </div>
                )}
              </div>
              <div className="p-6 flex-1">
                <div className="flex items-start justify-between">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{place.name}</h2>
                  {place.rating && (
                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
                      <StarIcon className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm font-medium text-yellow-700">{place.rating}</span>
                    </div>
                  )}
                </div>
                {place.dates?.updated_at && ( 
                  <div className="text-sm text-gray-600 mb-4">
                      {'Дата открытия:'} <b>{getDate(place.dates?.updated_at || '')}</b>
                  </div>
                )}
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <MapPinIcon className="w-4 h-4" />
                  <p>{place.address_name}</p>
                </div>
                <Link 
                  href={`https://2gis.ru/firm/${place.id}`} 
                  target="_blank" 
                  className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                >
                  Открыть на карте
                </Link>
              </div>
            </div>
          </div>
        )) : <div className="text-center text-gray-500 py-8">Ничего не найдено</div>}
      </div>
    </div>
  );
}

export default function Place() {
  const params = useParams();
  const type = params.type as string;
  const selectedPlacesType = typePlaceEat[type as keyof typeof typePlaceEat];
  const [places, setPlaces] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setIsLoading(true);
        const data = await getPlaces(selectedPlacesType);
        setPlaces(data);
      } catch (error) {
        console.error('Error fetching places:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaces();
  }, [selectedPlacesType]);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return <PlaceList places={places} />;
}