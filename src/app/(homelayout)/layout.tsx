"use client";

import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default DashboardLayout;
