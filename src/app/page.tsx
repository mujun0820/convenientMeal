"use client";

import React, { useState, useEffect } from "react";
import useSWR from "swr";
import { ChevronLeft, Github, Instagram, ChevronRight } from "lucide-react";
import Link from "next/link";

interface MealData {
  sandwich: string[];
  salad: string[];
  chicken: string[];
  grain: string[];
  etc: string[];
}

interface MenuData {
  date: string;
  morning: MealData | string[];
  evening: MealData | string[];
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function getWeekday(dateStr: string): string {
  const dateObj = new Date(dateStr);
  const weekdays = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];
  return weekdays[dateObj.getDay()] || "";
}

function changeDate(dateStr: string, diff: number): string {
  const dateObj = new Date(dateStr);
  dateObj.setDate(dateObj.getDate() + diff);
  return dateObj.toISOString().split("T")[0];
}

const keyMapping: Record<string, string> = {
  sandwich: "샌드위치",
  salad: "샐러드",
  chicken: "닭가슴살",
  grain: "선식",
};

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isMobile;
}

const renderMeal = (meal: string[] | MealData, isMobile: boolean) => {
  if (Array.isArray(meal)) {
    if (meal.length === 0) return isMobile ? null : <li className="text-gray-600 dark:text-gray-400">메뉴 없음</li>;
    return meal.map((item, idx) => (
        <li key={idx} className="text-gray-700 dark:text-gray-300">{item}</li>
    ));
  } else {
    const categories = Object.keys(meal) as (keyof MealData)[];
    const filteredCategories = categories.filter((category) => category !== "etc");
    if (isMobile) {
      const combinedItems = filteredCategories.reduce<string[]>((acc, category) => {
        return acc.concat(meal[category]);
      }, []);
      if (combinedItems.length === 0) return null;
      return combinedItems.map((item, idx) => (
          <li key={idx} className="text-gray-700 dark:text-gray-300">{item}</li>
      ));
    } else {
      return filteredCategories.map((category) => (
          <div key={category} className="mb-2">
            <h3 className="font-bold capitalize dark:text-white">{keyMapping[category] || category}</h3>
            <ul className="list-disc pl-5">
              {meal[category].length > 0 ? (
                  meal[category].map((item, idx) => (
                      <li key={idx} className="text-gray-700 dark:text-gray-300">{item}</li>
                  ))
              ) : (
                  <li className="text-gray-600 dark:text-gray-400">메뉴 없음</li>
              )}
            </ul>
          </div>
      ));
    }
  }
};

export default function Page() {
  const [currentDate, setCurrentDate] = useState<string>("");
  const isMobile = useIsMobile();

  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    setCurrentDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  const { data: menuData, error, isLoading } = useSWR<MenuData>(
      `/api/menu?date=${currentDate}`,
      fetcher
  );

  const handlePrevDate = () => {
    setCurrentDate((prev) => changeDate(prev, -1));
  };

  const handleNextDate = () => {
    setCurrentDate((prev) => changeDate(prev, 1));
  };

  return (
      <div className="flex justify-center items-center w-screen h-screen max-[640px]:h-[90svh] bg-white dark:bg-zinc-900 max-[640px]:pt-10">
        <div className="min-h-[70svh] max-[640px]:min-h-[90svh] w-[60vw] max-[640px]:w-[90vw] flex flex-col bg-white dark:bg-zinc-800 text-gray-900 dark:text-white border-gray-800 border-1 rounded-2xl m-4">
          <header className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="text-xl font-bold">디미고간편식</div>
            <div className="flex space-x-4">
            <span className="cursor-pointer">
              <Link href="https://github.com/mujun0820"><Github /></Link>
            </span>
              <span className="cursor-pointer">
              <Link href="https://www.instagram.com/mujun0820?igsh=MXdkcGVmM2pmaTV4Mw%3D%3D&utm_source=qr"><Instagram /></Link>
            </span>
            </div>
          </header>

          <div className="flex justify-center items-center mt-4">
            <button onClick={handlePrevDate} className="px-4 py-2 rounded mr-2 bg-gray-200 dark:bg-gray-700"> <ChevronLeft /> </button>
            <div className="text-center text-lg">
              {menuData ? `${menuData.date} ${getWeekday(menuData.date)}` : currentDate}
            </div>
            <button onClick={handleNextDate} className="px-4 py-2 rounded ml-2 bg-gray-200 dark:bg-gray-700"> <ChevronRight /> </button>
          </div>

          {isLoading ? (
              <div className="flex-grow flex items-center justify-center">
                <p>Loading...</p>
              </div>
          ) : error ? (
              <div className="flex-grow flex items-center justify-center">
                <p>Error loading menu.</p>
              </div>
          ) : (
              <main className="flex-grow flex items-center justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-5xl p-4">
                  <div className="bg-gray-100 dark:bg-zinc-700 p-4 rounded-xl shadow h-96 max-[640px]:h-40 max-[640px]:p-2">
                    <h2 className="text-center font-semibold mb-2 text-xl max-[640px]:text-lg">조식</h2>
                    <ul className="list-disc pl-5 max-[640px]:text-[0.9rem]">
                      {menuData && renderMeal(menuData.morning, isMobile)}
                    </ul>
                  </div>
                  <div className="bg-gray-100 dark:bg-zinc-700 p-4 rounded-xl shadow h-96 max-[640px]:h-40 max-[640px]:p-2">
                    <h2 className="text-center font-semibold mb-2 text-xl max-[640px]:text-lg">석식</h2>
                    <ul className="list-disc pl-5 max-[640px]:text-[0.9rem]">
                      {menuData && renderMeal(menuData.evening, isMobile)}
                    </ul>
                  </div>
                </div>
              </main>
          )}

          <footer className="text-center p-4 border-t border-gray-200 dark:border-gray-700">© 디미고간편식 by mujun0820</footer>
        </div>
      </div>
  );
}
