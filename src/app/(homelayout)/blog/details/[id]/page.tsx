"use client";

import Loading from "@/app/loading";
import BreadCrumb from "@/components/ui/BreadCrumb";
import { useGetSingleBlogQuery } from "@/redux/api/blogApi";
import dayjs from "dayjs";
import Image from "next/image";

type IDProps = {
  params: any;
};
const BlogDetailsPage = ({ params }: IDProps) => {
  const { id } = params;
  const { data, isLoading } = useGetSingleBlogQuery(id);
  if (isLoading) return <Loading />;
  return (
    <section className="max-w-[1200px] mx-auto">
      <div className="mt-6 mx-5">
        <BreadCrumb
          items={[
            {
              label: "Home",
              link: "/",
            },
            {
              label: "Blog",
              link: "/blog",
            },
          ]}
        />
      </div>
      <div className="container mt-[70px] max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
        <a
          rel="noopener noreferrer"
          href="#"
          className="block max-w-sm gap-3 mx-auto sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12"
        >
          <Image
            height={360}
            width={480}
            src="https://source.unsplash.com/480x360/?house"
            alt=""
            className="object-cover w-full h-64 rounded sm:h-96 lg:col-span-7 "
          />
          <div className="p-6 space-y-2 lg:col-span-5">
            <h3 className="text-2xl font-semibold sm:text-4xl group-hover:underline group-focus:underline">
              {data?.title}
            </h3>
            <span className="text-xs ">
              {dayjs(data?.createdAt).format("MMM D, YYYY")}
            </span>
            <p>{data?.description}</p>
          </div>
        </a>
      </div>
    </section>
  );
};

export default BlogDetailsPage;
