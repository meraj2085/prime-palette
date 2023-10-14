"use client";
import { Button, Col, Row, message } from "antd";
import loginImage from "../../../assets/login.png";
import Image from "next/image";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { SubmitHandler } from "react-hook-form";
import { useUserSignUpMutation } from "@/redux/api/authApi";
import { storeUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";

type FormValues = {
  name: {
    firstName: string;
    lastName: string;
  };
  email: string;
  password: string;
};

const SignUpPage = () => {
  const [userSignUp] = useUserSignUpMutation();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      const res = await userSignUp({ ...data }).unwrap();
      if (res?.accessToken) {
        router.push("/");
        message.success("User signUp successfully!");
      }
      storeUserInfo({ accessToken: res?.accessToken });
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        minHeight: "100vh",
      }}
    >
      <Col sm={12} md={16} lg={10}>
        <Image src={loginImage} width={500} alt="login image" />
      </Col>
      <Col sm={12} md={8} lg={8}>
        <h1 className="my-4 text-center text-xl">Register new account</h1>
        <div>
          <Form submitHandler={onSubmit}>
            <div className="flex gap-4">
              <div>
                <FormInput
                  name="name.firstName"
                  type="text"
                  size="large"
                  label="First Name"
                />
              </div>
              <div>
                <FormInput
                  name="name.lastName"
                  type="text"
                  size="large"
                  label="Last Name"
                />
              </div>
            </div>
            <div className="mt-4">
              <FormInput name="email" type="email" size="large" label="Email" />
            </div>
            <div className="mt-4">
              <FormInput
                name="mobileNumber"
                type="text"
                size="large"
                label="Mobile Number"
              />
            </div>
            <div className="mt-4">
              <FormInput
                name="password"
                type="password"
                size="large"
                label="Password"
              />
            </div>
            <div className="flex justify-center">
              <Button className="mt-4" htmlType="submit">
                Login
              </Button>
            </div>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default SignUpPage;
