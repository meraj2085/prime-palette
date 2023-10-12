"use client";

import dynamic from "next/dynamic";
import Footer from "@/components/shared/Footer";
// import Navbar from "@/components/shared/Navbar";

const Navbar = dynamic(() => import("@/components/shared/Navbar"), {
  ssr: false,
});

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
