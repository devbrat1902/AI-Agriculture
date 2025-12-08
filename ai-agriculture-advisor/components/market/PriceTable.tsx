"use client";

import React, { useState } from "react";
import { CropPrice } from "@/lib/api/market-prices";
import { Sparkline } from "@/components/ui/Sparkline";
import { Search, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

interface PriceTableProps {
  prices: CropPrice[];
}

type SortField = "crop" | "price" | "change" | "market";
type SortOrder = "asc" | "desc";

export function PriceTable({ prices }: PriceTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [sortField, setSortField] = useState<SortField>("crop");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const categories = ["All", "Grains", "Vegetables", "Fruits"];

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const filteredPrices = prices
    .filter((price) => {
      const matchesSearch = price.crop.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === "All" || price.category === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  return (
    <div className="bg-agri-900/50 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
      {/* Header Controls */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
          <Input
            type="text"
            placeholder="Search crops..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-black/50 border-white/10 text-white"
          />
        </div>

        {/* Category Filter */}
        <div className="flex gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setCategoryFilter(category)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                categoryFilter === category
                  ? "bg-primary-500 text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3 px-4 text-gray-400 font-medium">
                <button
                  onClick={() => handleSort("crop")}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  Crop
                  <ArrowUpDown className="h-4 w-4" />
                </button>
              </th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Category</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">
                <button
                  onClick={() => handleSort("market")}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  Market
                  <ArrowUpDown className="h-4 w-4" />
                </button>
              </th>
              <th className="text-right py-3 px-4 text-gray-400 font-medium">
                <button
                  onClick={() => handleSort("price")}
                  className="flex items-center gap-2 ml-auto hover:text-white transition-colors"
                >
                  Price (₹/q)
                  <ArrowUpDown className="h-4 w-4" />
                </button>
              </th>
              <th className="text-right py-3 px-4 text-gray-400 font-medium">
                <button
                  onClick={() => handleSort("change")}
                  className="flex items-center gap-2 ml-auto hover:text-white transition-colors"
                >
                  Change
                  <ArrowUpDown className="h-4 w-4" />
                </button>
              </th>
              <th className="text-right py-3 px-4 text-gray-400 font-medium">Trend (7D)</th>
            </tr>
          </thead>
          <tbody>
            {filteredPrices.map((price) => (
              <tr
                key={price.id}
                className="border-b border-white/5 hover:bg-white/5 transition-colors"
              >
                <td className="py-4 px-4 font-medium text-white">{price.crop}</td>
                <td className="py-4 px-4 text-gray-400 text-sm">{price.category}</td>
                <td className="py-4 px-4 text-gray-400 text-sm">{price.market}</td>
                <td className="py-4 px-4 text-right font-bold text-white">
                  ₹{price.price.toLocaleString()}
                </td>
                <td className="py-4 px-4 text-right">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 px-2 py-1 rounded text-sm font-medium",
                      price.change >= 0
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    )}
                  >
                    {price.change >= 0 ? "↑" : "↓"}
                    {Math.abs(price.change)}%
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <Sparkline
                    data={price.history}
                    color={price.change >= 0 ? "success" : "danger"}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredPrices.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            No crops found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
}
