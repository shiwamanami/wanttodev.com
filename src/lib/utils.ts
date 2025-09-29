import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 日付文字列を「September, 2023」形式に変換する
 * @param dateString - "2023.09" 形式の日付文字列
 * @returns "September, 2023" 形式の日付文字列
 */
export function formatDate(dateString: string): string {
  const [year, month] = dateString.split(".");
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthIndex = parseInt(month, 10) - 1;
  const monthName = monthNames[monthIndex];

  return `${monthName}, ${year}`;
}
