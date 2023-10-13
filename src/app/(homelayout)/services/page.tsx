"use client";

import { useState } from "react";
import { Pagination } from "antd";
import { useServicesQuery } from "@/redux/api/serviceApi";
import ServiceCard from "@/components/shared/ServiceCard";
import SkeletonCard from "@/components/shared/SkeletonCard";

const ServicesPage = () => {
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

  const { data, isLoading } = useServicesQuery({ ...query });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <section className="bg-white my-10 max-w-[1200px] mx-auto">
        <div>
            <h1>hew</h1>
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
        />
      </div>
    </section>
  );
};

export default ServicesPage;
