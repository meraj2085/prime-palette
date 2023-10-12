// import book_img from "../assets/service.jpg";

import Image from "next/image";

const ServiceCard = ({ service }: any) => {
  return (
    <div className="w-full overflow-hidden bg-white rounded-lg shadow-lg min-h-96">
      <Image
        src={service?.image_url}
        width={1000}
        height={1000}
        alt="Service image"
      />

      <div className="px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-800 ">
          {service?.title}
        </h1>
        <p className="py-2 text-gray-700 font-semibold">{service?.name}</p>
        <p className=" text-gray-700 font-semibold">
          Price: <span className="font-normal">${service?.price}</span>
        </p>
        <p className="py-2 text-gray-700 font-semibold">
          <span className="font-normal">{service?.description}</span>
        </p>
      </div>
    </div>
  );
};

export default ServiceCard;
