"use client";
import { Label, Select } from "@heroui/react";
import { ListBox } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";

const CategoryFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const CATEGORIES = [
    { id: "all", label: "All Categories" },
    { value: "yoga", label: "Yoga" },
    { value: "pilates", label: "Pilates" },
    { value: "stretching", label: "Stretching" },
    { value: "cardio", label: "Cardio" },
    { value: "dance", label: "Dance" },
    { value: "strength", label: "Strength Training" },
    { value: "fitness", label: "Fitness" },
  ];

  const handleCategoryChange = (value) => {
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
            {CATEGORIES.map((category) => (
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
