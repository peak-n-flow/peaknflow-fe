"use client";

import type React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  iconClassName?: string;
}

export function SearchInput({
  onChange,
  placeholder = "Search...",
  className = "relative w-full max-w-xs",
  inputClassName = "pl-8 w-full",
  iconClassName = "absolute left-2.5 top-2.5 h-4 w-4 text-black",
}: SearchInputProps) {
  return (
    <div className={className}>
      <Search className={iconClassName} />
      <Input
        className={inputClassName}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}
