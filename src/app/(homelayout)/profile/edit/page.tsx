"use client";

import React from "react";
import { Button, Col, Row, Tooltip, message } from "antd";
import { useAppSelector } from "@/redux/hooks";
import FormInput from "@/components/Forms/FormInput";
import Form from "@/components/Forms/Form";
import BreadCrumb from "@/components/ui/BreadCumb";
import { IUser } from "@/types";
import { useUpdateProfileMutation } from "@/redux/api/userApi";
import { useRouter } from "next/navigation";

const ProfileEditPage = () => {
  const router = useRouter();
  const user = useAppSelector((state): IUser | undefined => state.user.user);
  const [updateProfile] = useUpdateProfileMutation();

  const defaultValues = {
    name: {
      firstName: user?.name?.firstName || "",
      lastName: user?.name?.lastName || "",
    },
    email: user?.email || "",
    mobileNumber: user?.mobileNumber || "",
  };

  const formOnSubmit = async (data: any) => {
    try {
      const response = await updateProfile(data).unwrap();
      if (response?._id) {
        message.success("Profile updated successfully");
        router.push("/profile");
      } else {
        message.error("Failed to update profile");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <section className="bg-white max-w-[1200px] mx-auto">
      <div className="md:mb-2 mb-0 mx-5 md:mx-0 mt-10">
        <BreadCrumb
          items={[
            {
              label: "Home",
              link: "/",
            },
            {
              label: "Profile",
              link: "/profile",
            },
            {
              label: "Edit",
              link: "/profile/edit",
            },
          ]}
        />
      </div>
      <div className="flex items-center justify-center min-h-[600px] ">
        <Form submitHandler={formOnSubmit} defaultValues={defaultValues}>
          <div
            className="md:mx-0 max-w-[500px] mx-auto"
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "15px",
              marginBottom: "10px",
            }}
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={12} lg={12} style={{ margin: "10px 0" }}>
                <FormInput
                  name="name.firstName"
                  label="First name"
                  size="large"
                />
              </Col>
              <Col xs={24} sm={12} md={12} lg={12} style={{ margin: "10px 0" }}>
                <FormInput
                  name="name.lastName"
                  label="Last name"
                  size="large"
                />
              </Col>
              <Col xs={24} sm={12} md={24} lg={24} style={{ margin: "10px 0" }}>
                <FormInput
                  name="mobileNumber"
                  label="Mobile number"
                  size="large"
                />
              </Col>
              <Col xs={24} sm={12} md={24} lg={24} style={{ margin: "10px 0" }}>
                <FormInput name="email" label="Email" size="large" />
              </Col>
            </Row>
            <div className="flex md:justify-end justify-center mt-5">
              <Button htmlType="submit">Update</Button>
            </div>
          </div>
        </Form>
      </div>
    </section>
  );
};

export default ProfileEditPage;
