"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useRef } from "react";
import debounce from "@/lib/debounce";

export function useSearchQuery(
  paramName: string = "search",
  delay: number = 300
) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const debouncedSearchRef = useRef(
    debounce((...args: unknown[]) => {
      const searchValue = args[0] as string;
      const params = new URLSearchParams(searchParams.toString());

      if (searchValue) {
        params.set(paramName, searchValue);
      } else {
        params.delete(paramName);
      }

      router.push(`?${params.toString()}`);
    }, delay)
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      debouncedSearchRef.current(e.target.value);
    },
    []
  );

  return handleSearchChange;
}
