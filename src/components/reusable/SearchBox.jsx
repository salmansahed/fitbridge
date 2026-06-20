"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Label, SearchField } from "@heroui/react";

const SearchBox = ({label, placeholder}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSearchUrl = searchParams.get("search") || "";

  const [inputValue, setInputValue] = useState(currentSearchUrl);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      const normalizedInput = inputValue.trim();

      if (normalizedInput) {
        params.set("search", normalizedInput);
      } else {
        params.delete("search");
      }

      if (normalizedInput !== currentSearchUrl) {
        params.set("page", "1");
        router.push(`?${params.toString()}`, { scroll: false });
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [inputValue, router, searchParams, currentSearchUrl]);
  return (
    <div>
      <SearchField name="search">
        <Label>{label}</Label>
        <SearchField.Group className="border border-gray-300 dark:border-gray-600 h-12">
          <SearchField.SearchIcon />
          <SearchField.Input
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            className="w-70"
            placeholder={placeholder}
          />
          <SearchField.ClearButton />
        </SearchField.Group>
      </SearchField>
    </div>
  );
};

export default SearchBox;
