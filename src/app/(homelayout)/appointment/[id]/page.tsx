"use client";

import Loading from "@/app/loading";
import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import BreadCrumb from "@/components/ui/BreadCumb";
import { useAddAppointmentMutation } from "@/redux/api/appointmentApi";
import { useSingleServiceQuery } from "@/redux/api/serviceApi";
import { Button, Col, Row, message } from "antd";
import { redirect, useRouter } from "next/navigation";
import dayjs from "dayjs";
import { getUserInfo } from "@/services/auth.service";
import { useAppSelector } from "@/redux/hooks";
import { IUser } from "@/types";

type IDProps = {
  params: any;
};

const AppointmentPage = ({ params }: IDProps) => {
  const user = useAppSelector((state): IUser | undefined => state.user.user);
  const router = useRouter();
  const { id } = params;
  const { userId } = getUserInfo() as any;
  const { data, isLoading } = useSingleServiceQuery(id);
  const [addAppointment] = useAddAppointmentMutation();

  const defaultValues = {
    fullName: `${user?.name?.firstName} ${user?.name?.lastName}` || "",
    mobileNumber: user?.mobileNumber || "",
  };

  const formOnSubmit = async (data: any) => {
    const originalDate = new Date(data.appointment_date);
    const formattedDate = originalDate?.toISOString();
    data.appointment_date = formattedDate;

    data.userId = userId;
    data.serviceId = id;

    try {
      const res = await addAppointment(data).unwrap();
      if (res?._id) {
        message.success("Appointment booked successfully");
        router.push("/booking");
      } else {
        message.error("Booking failed");
      }
    } catch (err: any) {
      console.error(err.message);
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
            {
              label: "Appointment",
              link: `/appointment/${data?._id}`,
            },
          ]}
        />
      </div>
      <Form submitHandler={formOnSubmit} defaultValues={defaultValues}>
        <div
          className="mx-5 md:mx-0"
          style={{
            border: "1px solid #d9d9d9",
            borderRadius: "5px",
            padding: "15px",
            marginBottom: "10px",
          }}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8} lg={8} style={{ margin: "10px 0" }}>
              <FormInput name="fullName" label="Full name" size="large" />
            </Col>

            <Col xs={24} sm={12} md={8} lg={8} style={{ margin: "10px 0" }}>
              <FormInput
                name="mobileNumber"
                label="Mobile number"
                size="large"
              />
            </Col>

            <Col xs={24} sm={12} md={8} lg={8} style={{ margin: "10px 0" }}>
              <FormInput name="address" label="Address" size="large" />
            </Col>

            <Col xs={24} sm={12} md={12} lg={8} style={{ margin: "10px 0" }}>
              <FormDatePicker
                name="appointment_date"
                label="Appointment Date"
                size="large"
              />
            </Col>
          </Row>
        </div>
        <div className="flex md:justify-end justify-center">
          <Button htmlType="submit">Book Appointment</Button>
        </div>
      </Form>
    </section>
  );
};

export default AppointmentPage;
