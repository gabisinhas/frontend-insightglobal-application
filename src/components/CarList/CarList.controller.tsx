import { useState } from "react";
import { useCars } from "../../hooks/useCars";
import { CarListView } from "./CarList.view";

export const CarList = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"make" | "model" | "year">("make");

  const { cars, loading, error } = useCars(search, sort);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSortChange = (e: any) => {
    setSort(e.target.value);
  };

  return (
    <CarListView
      cars={cars}
      loading={loading}
      error={!!error}
      search={search}
      sort={sort}
      onSearchChange={handleSearchChange}
      onSortChange={handleSortChange}
    />
  );
};
