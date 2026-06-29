"use client";
import { Label, Select } from "@heroui/react";
import { ListBox } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";

const CategoryFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categories = [
    { id: "all", label: "All Categories" },
    { id: "yoga", label: "Yoga" },
    { id: "pilates", label: "Pilates" },
    { id: "stretching", label: "Stretching" },
    { id: "cardio", label: "Cardio" },
    { id: "dance", label: "Dance" },
    { id: "strength", label: "Strength Training" },
    { id: "fitness", label: "Fitness" },
  ];

  const handleCategoryChange = (value) => {
    console.log("category value ?", value);
    const params = new URLSearchParams(searchParams);
    params.set("category", value);
    router.push(`?${params.toString()}`);
  };

  return (
    <div>
      <Select
        className="w-full md:w-[256px]"
        placeholder="Select one"
        onChange={handleCategoryChange}
      >
        <Label>Search by Category</Label>
        <Select.Trigger className="border border-gray-300 dark:border-gray-600 py-3.5">
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox>
            {categories.map((category) => (
              <ListBox.Item
                key={category.id}
                id={category.id}
                textValue={category.label}
              >
                {category.label}
                <ListBox.ItemIndicator />
              </ListBox.Item>
            ))}
          </ListBox>
        </Select.Popover>
      </Select>
    </div>
  );
};

export default CategoryFilter;
