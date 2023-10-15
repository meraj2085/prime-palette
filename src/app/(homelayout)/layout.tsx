"use client";

import dynamic from "next/dynamic";
import Footer from "@/components/shared/Footer";
import { useGetProfileQuery } from "@/redux/api/userApi";
import { getUserInfo } from "@/services/auth.service";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
// import Navbar from "@/components/shared/Navbar";

const Navbar = dynamic(() => import("@/components/shared/Navbar"), {
  ssr: false,
});

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetProfileQuery(undefined);

  useEffect(() => {
    dispatch({ type: "user/setUser", payload: data });
  }, [data, dispatch]);

  // const user = useAppSelector((state) => state.user.user);
  // console.log(user, "user");

  return (
    <div>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
