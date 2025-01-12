/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React, { useState } from "react";


export default function SearchBar({
  data,
  onSearch,
  setIsSearch,
}: {
  data: any[];
  onSearch: any;
  setIsSearch: any;
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    const filteredData = data.filter((item: any) =>
      Object.values(item).some(
        (value: any) =>
          value &&
          value.toString().toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
    setIsSearch(true);
    onSearch(filteredData);
  };
  return (
    <div className="flex justify-between items-center gap-8 w-full">
      <div className="relative">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          id="search"
          name="search"
          type="search"
          placeholder="Search Here ..."
          className="pl-8 pr-4 py-2 border-gray-300 focus:border-[#004D40] focus:ring focus:ring-[#004D40]/20 rounded-md"
          value={searchTerm}
          autoComplete="search"
          onChange={handleSearch}
        />
      </div>{" "}
      */
    </div>
  );
}
