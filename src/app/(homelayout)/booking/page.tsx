"use client";

import Loading from "@/app/loading";
import {
  useUpdateAppointmentStatusMutation,
  useUserAppointmentsQuery,
} from "@/redux/api/appointmentApi";
import { Tooltip, message } from "antd";
import dayjs from "dayjs";
import Image from "next/image";

const BookingPage = () => {
  const { data, isLoading } = useUserAppointmentsQuery(undefined);
  const [updateAppointmentStatus] = useUpdateAppointmentStatusMutation();

  const handleCancelBooking = async (id: string) => {
    const data = { id, status: "cancelled" };
    const response = await updateAppointmentStatus(data).unwrap();
    if (response?._id) {
      message.success("Booking cancelled");
    } else {
      message.error("Failed to cancel booking");
    }
    return;
  };

  if (isLoading) return <Loading />;

  return (
    <section className=" text-gray-800 min-h-screen">
      <div className="container flex flex-col justify-center px-6 py-10 mx-auto mb-20">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-4xl lg:font-bold ">
            My <span className="text-teal-600">Bookings</span>
          </h1>

          <p className="max-w-lg mx-auto mt-4 text-gray-500">
            See all your bookings status here. Cancel anytime
          </p>
        </div>
        <div className="flex justify-center mt-8">
          <div
            className="w-screen max-w-3xl border border-gray-300 shadow px-4 py-8 sm:px-6 lg:px-8 rounded-lg"
            aria-modal="true"
            role="dialog"
            tabIndex={1}
          >
            <div className="mt-4 space-y-6 ">
              <ul className="space-y-4 ">
                {data?.map((appointment: any) => (
                  <li
                    key={appointment?._id}
                    className="flex items-center gap-4 border border-gray-200 shadow px-4 py-4 rounded-md"
                  >
                    <Image
                      src={appointment?.serviceId?.image_url}
                      alt="Service photo"
                      className="h-16 w-16 rounded object-cover"
                      height={500}
                      width={500}
                    />

                    <div>
                      <h3 className="text-sm text-gray-900">
                        {appointment?.serviceId?.name}
                      </h3>

                      <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                        <div>
                          <dt className="inline">Price: </dt>
                          <dd className="inline">
                            ${appointment?.serviceId?.price}
                          </dd>
                        </div>

                        <div>
                          <dt className="inline">Status: </dt>
                          <dd className="inline">
                            {appointment?.appointment_status}
                          </dd>
                        </div>

                        <div>
                          <dt className="inline">Appointment Date: </dt>
                          <dd className="inline">
                            {dayjs(appointment?.appointment_date).format(
                              "MMM D, YYYY"
                            )}
                          </dd>
                        </div>
                      </dl>
                    </div>

                    <div className="flex flex-1 items-center justify-end gap-2">
                      <Tooltip title="Cancel booking">
                        {appointment?.appointment_status === "pending" && (
                          <button
                            onClick={() =>
                              handleCancelBooking(appointment?._id)
                            }
                            className="text-gray-600 transition hover:text-[#8687C5] rounded border-gray-200 bg-gray-50 px-2 py-1"
                          >
                            <span className="sr-only">Cancel booking</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="h-5 w-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        )}
                      </Tooltip>
                      {appointment?.appointment_status === "approved" && (
                        <small className="text-green-600 cursor-pointer text-sm transition hover:text-[#8687C5] rounded border-gray-200 bg-gray-50 px-2 py-1">
                          Approved
                        </small>
                      )}
                      {appointment?.appointment_status === "rejected" && (
                        <small className="text-red-600 cursor-pointer text-sm transition hover:text-[#8687C5] rounded border-gray-200 bg-gray-50 px-2 py-1">
                          Rejected
                        </small>
                      )}
                      {appointment?.appointment_status === "cancelled" && (
                        <small className="text-[#8687C5] cursor-pointer text-sm transition hover:text-[#8687C5] rounded border-gray-200 bg-gray-50 px-2 py-1">
                          Cancelled
                        </small>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingPage;
