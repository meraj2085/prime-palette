"use client";

import Loading from "@/app/loading";
import BreadCrumb from "@/components/ui/BreadCumb";
import {
  useAddCommentMutation,
  useSingleServiceQuery,
} from "@/redux/api/serviceApi";
import { message } from "antd";
import Image from "next/image";
import Link from "next/link";

type IDProps = {
  params: any;
};
const ServiceDetailsPage = ({ params }: IDProps) => {
  const { id } = params;
  const { data, isLoading } = useSingleServiceQuery(id);
  const [addComment] = useAddCommentMutation();

  const handleAddComment = async (e: any) => {
    e.preventDefault();
    const comment = e.target.message.value;
    const options = {
      id: data?._id,
      comment: comment,
    };
    const response = await addComment(options).unwrap();
    if (response?._id) {
      message.success("Comment added successfully");
    } else {
      message.error("Failed to add comment");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <section className="bg-white my-10 max-w-[1200px] mx-auto">
      <div className="md:mb-2 mb-0 mx-5 md:mx-0">
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
            {
              label: "Details",
              link: `/services/details/${data?._id}`,
            },
          ]}
        />
      </div>
      <div>
        <div className="flex justify-center pt-10 pb-20 mx-5 md:mx-0">
          <div className="rounded-lg border border-gray-200 p-4 sm:p-6 lg:p-8 w-[500px] shadow-md">
            <div className="flex justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                  {data?.name}
                </h3>

                <p className="mt-1 text-xs font-medium text-gray-600">
                  Price: ${data?.price}
                </p>
              </div>

              <div className="">
                <Image
                  height={100}
                  width={100}
                  alt="Paul Clapton"
                  src={data?.image_url}
                  className="h-16 w-16 rounded-lg object-cover shadow-sm"
                />
              </div>
            </div>
            <div className="mt-4">
              <p className="max-w-[40ch] text-sm text-gray-500">
                <span className="font-semibold">Description:</span>{" "}
                {data?.description}
              </p>
            </div>
            <dl className="mt-6 flex gap-4 sm:gap-6 justify-between">
              <dd className="text-xs text-gray-500">
                Status: {data?.availability ? "Available" : "Not Available"}
              </dd>
            </dl>
            <div className="flex justify-end">
              <Link href={`/appointment/${id}`}>
                <p className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#8B8BCF]">
                  Book an appointment
                  <span
                    aria-hidden="true"
                    className="block transition-all group-hover:ms-0.5 rtl:rotate-180"
                  >
                    &rarr;
                  </span>
                </p>
              </Link>
            </div>
          </div>
        </div>
        <div className="mx-4 md:mx-20">
          {" "}
          <hr />
          <div className="my-5 md:my-10 flex flex-col md:flex-row md:justify-between gap-5 md:gap-20">
            <div className="md:mt-3 md:w-1/2">
              {" "}
              {data?.comments.map((comment: any, index: any) => (
                <article
                  key={index}
                  className="rounded-xl shadow-sm border border-gray-200 p-4 my-3 min-w-[300px] md:min-w-[500px]"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      height={100}
                      width={100}
                      alt="Developer"
                      src="https://images.unsplash.com/photo-1614644147724-2d4785d69962?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80"
                      className="h-16 w-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-md font-medium text-gray-800">
                        Claire Mac
                      </h3>
                      <div className="flow-root">
                        <p className="py-2 leading-none text-md font-medium text-gray-400">
                          {comment}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <form onSubmit={handleAddComment} className="md:w-1/2 md:mt-5 mt-0">
              {" "}
              <textarea
                id="message"
                name="message"
                className="block p-2.5 w-full md:w-[400px] h-[150px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-teal-600 focus:border-teal-600"
                placeholder="Write your thoughts here..."
              ></textarea>
              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  className="group relative inline-block text-sm font-medium text-teal-600 focus:outline-none active:text-teal-600"
                >
                  <span className="absolute inset-0 border border-current rounded-md"></span>
                  <span className="block border border-current bg-white px-8 md:px-12 py-3 rounded-md transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1">
                    Submit
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetailsPage;