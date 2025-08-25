import {Tabs, Tab} from "@heroui/react";
import { typePlaceEat } from "../../../consts/places";
import { FC, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export const HeaderButtons: FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  
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
          className="fixed bottom-4 right-4 z-50 bg-gray-600 text-white p-3 rounded-full shadow-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <Bars3Icon className="w-6 h-6" />
          )}
        </button>

        <div className={`
          fixed bottom-0 left-0 right-0
          ${isOpen ? 'translate-y-0' : 'translate-y-full'}
          transition-transform duration-300 ease-in-out
          bg-white
          shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]
          rounded-t-2xl
          p-4
          z-40
        `}>
          <Tabs 
            selectedKey={pathname}
            onSelectionChange={() => {}}
            aria-label="Dynamic tabs"
            isVertical={true}
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
