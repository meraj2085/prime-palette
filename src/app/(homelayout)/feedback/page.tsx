"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormTextArea from "@/components/Forms/FormTextArea";
import { useAddFeedbackMutation } from "@/redux/api/feedbackApi";
import { Button, message } from "antd";
import { Rate } from "antd";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import Loading from "@/app/loading";
import { useAuth } from "@/utils/checkAuth";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { IUser } from "@/types";

const FeedbackPage = () => {
  const desc = ["terrible", "bad", "normal", "good", "wonderful"];
  const user = useAppSelector((state): IUser | undefined => state.user.user);

  const defaultValues = {
    name: `${user?.name?.firstName} ${user?.name?.lastName}` || "",
    email: user?.email || "",
  };

  const router = useRouter();
  const [value, setValue] = useState(1);
  const [addFeedback] = useAddFeedbackMutation();
  type FormValues = {
    name: string;
    email: string;
    feedback: string;
  };

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      data.rating = value;
      const response = await addFeedback(data).unwrap();
      if (response?._id) {
        message.success("Thank you for your feedback");
        router.push("/");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };
  const userAuth = useAuth();
  if (userAuth) return <Loading />;

  return (
    <section className="bg-white max-w-[1200px] mx-auto">
      <div className="px-6 py-10">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-4xl lg:font-bold ">
            Service <span className="text-[#8484BD]">Feedback</span>
          </h1>

          <p className="max-w-lg mx-auto mt-4 text-gray-500">
            Your feedback is very important to us. Please share your experience.
          </p>
        </div>
        <div className="mt-8 md:mt-16 px-5 py-10 bg-slate-100 rounded-lg border-solid border border-gray-300">
          <div>
            <Form submitHandler={onSubmit} defaultValues={defaultValues}>
              <div>
                <FormInput
                  name="name"
                  type="text"
                  size="large"
                  label="Full Name"
                />
                <FormInput
                  name="email"
                  type="email"
                  size="large"
                  label="Email"
                />
              </div>
              <div className="mt-5">
                <p>Rating</p>
                <Rate tooltips={desc} onChange={setValue} value={value} />
              </div>
              <div
                style={{
                  margin: "15px 0px",
                }}
              >
                <FormTextArea name="feedback" label="Feedback" rows={6} />
              </div>
              <Button htmlType="submit">Submit</Button>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedbackPage;
