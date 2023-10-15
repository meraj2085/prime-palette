"use client";
import { Button, Col, Row, message } from "antd";
import loginImage from "../../../assets/login-pana.png";
import Image from "next/image";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { SubmitHandler } from "react-hook-form";
import { useUserLoginMutation } from "@/redux/api/authApi";
import { storeUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import Link from "next/link";

type FormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [userLogin] = useUserLoginMutation();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      const res = await userLogin({ ...data }).unwrap();
      if (res?.accessToken) {
        router.push("/");
        message.success("User logged in successfully!");
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
      <Col className="hidden md:block" sm={12} md={16} lg={10}>
        <Image src={loginImage} width={500} alt="login image" />
      </Col>
      <Col className="mx-10 md:mx-0" sm={12} md={8} lg={8}>
        <h1 className="my-4 text-center text-xl">Login your account</h1>
        <div>
          <Form submitHandler={onSubmit}>
            <div>
              <FormInput name="email" type="email" size="large" label="Email" />
            </div>
            <div
              style={{
                margin: "15px 0px",
              }}
            >
              <FormInput
                name="password"
                type="password"
                size="large"
                label="Password"
              />
              <div className="flex justify-end mt-1">
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="text-xs hover:underline text-gray-400 hover:text-gray-800"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <p className="px-6 text-sm mb-5 text-start dark:text-gray-400">
              Don&rsquo;t have an account yet?{" "}
              <Link
                href="/auth/signUp"
                className="hover:underline text-violet-400"
              >
                Sign up
              </Link>
              .
            </p>
            <div className="flex justify-center">
              <Button htmlType="submit">Login</Button>
            </div>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default LoginPage;
