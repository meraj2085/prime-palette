"use client";

type IDProps = {
  params: any;
};
const ServiceDetailsPage = ({ params }: IDProps) => {
  const { id } = params;
  return (
    <div>
      <h1>im service details {id}</h1>
    </div>
  );
};

export default ServiceDetailsPage;
