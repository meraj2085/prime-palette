"use client";

import { useState } from "react";
import { Pagination, PaginationProps, Select } from "antd";
import {
  useCategoryServicesQuery,
  useServicesQuery,
} from "@/redux/api/serviceApi";
import ServiceCard from "@/components/shared/ServiceCard";
import SkeletonCard from "@/components/shared/SkeletonCard";
import BreadCrumb from "@/components/ui/BreadCumb";
import { useDebounced } from "@/redux/hooks";

type IDProps = {
  params: any;
};

const CategoryServicePage = ({ params }: IDProps) => {
  const { id } = params;
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }

  const { data, isLoading } = useCategoryServicesQuery({ id, params: query });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
    current,
    pageSize
  ) => {
    setSize(pageSize);
  };

  const onSortChange = (value: string) => {
    setSortBy(value);
  };

  const onSortOrderChange = (value: string) => {
    setSortOrder(value);
  };

  return (
    <section className="bg-white my-10 max-w-[1200px] mx-auto">
      <div className="flex justify-between mb-5">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            className="block w-full p-1.5 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
            placeholder="Search..."
            required
          />
        </div>
        <div className="flex gap-2">
          <Select
            showSearch
            placeholder="Sort by"
            onChange={onSortChange}
            options={[
              {
                value: "name",
                label: "Name",
              },
              {
                value: "description",
                label: "Description",
              },
            ]}
          />
          <Select
            showSearch
            placeholder="Sort Order"
            onChange={onSortOrderChange}
            options={[
              {
                value: "asc",
                label: "Ascending",
              },
              {
                value: "desc",
                label: "Descending",
              },
            ]}
          />
        </div>
      </div>
      <div className="mb-2">
        <BreadCrumb
          items={[
            {
              label: "Home",
              link: "/",
            },
            {
              label: "Services",
              link: "/services",
            },
          ]}
        />
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4 mx-6 md:mx-0">
        {isLoading && [1, 2, 3, 4].map((n) => <SkeletonCard key={n} />)}
        {data?.services?.map((service: any) => (
          <ServiceCard service={service} key={service?._id} />
        ))}
      </div>
      <div className="mt-10 flex justify-end">
        <Pagination
          current={page}
          defaultCurrent={1}
          total={data?.meta?.total ?? 0}
          pageSize={size}
          onChange={handlePageChange}
          showSizeChanger
          onShowSizeChange={onShowSizeChange}
        />
      </div>
    </section>
  );
};

export default CategoryServicePage;
