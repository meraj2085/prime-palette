"use client";

import Loading from "@/app/loading";
import { useGetAllFaqQuery } from "@/redux/api/faqApi";

const FAQPage = () => {
  const { data, isLoading } = useGetAllFaqQuery(undefined);
  if (isLoading) return <Loading />;
  return (
    <section className=" text-gray-800 min-h-screen">
      <div className="container flex flex-col justify-center px-6 py-10 mx-auto">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-4xl lg:font-bold ">
            FA<span className="text-teal-600">Q</span>
          </h1>

          <p className="max-w-lg mx-auto mt-4 text-gray-500">
            Frequently Asked Questions
          </p>
        </div>
        <div className="grid gap-10 mt-8 md:mt-16 md:gap-8 sm:p-3 md:grid-cols-2 lg:px-12 xl:px-32">
          {data?.map((item: any) => (
            <div key={item?._id}>
              <h3 className="font-semibold">{item?.question}</h3>
              <p className="mt-1 text-gray-400">{item?.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQPage;
