"use client";

import React from "react";
import editProfileIcon from "../../../../public/assets/editProfileIcon.png";
import Image from "next/image";
import { Tooltip } from "antd";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import BreadCrumb from "@/components/ui/BreadCrumb";
import Loading from "@/app/loading";
import { useAuth } from "@/utils/checkAuth";

const ProfilePage = () => {
  const user = useAppSelector((state) => state.user.user);
  const userAuth = useAuth();
  if (userAuth) return <Loading />;
  return (
    <div className="bg-white mt-[70px] max-w-[1200px] mx-auto">
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
          ]}
        />
      </div>
      <div className="flex items-center justify-center min-h-[600px] ">
        <div className="relative flex mb-20 flex-col justify-center max-w-xs p-6 shadow-md rounded-xl sm:px-12 ">
          <Image
            src="https://source.unsplash.com/150x150/?portrait?3"
            alt="profile image"
            height={32}
            width={32}
            className="w-32 h-32 mx-auto rounded-full  aspect-square"
          />
          <div className="space-y-4 text-center divide-y divide-gray-700">
            <div className="my-2 space-y-1">
              <h2 className="text-xl font-semibold sm:text-2xl">
                {user?.name?.firstName} {user?.name?.lastName}
              </h2>
              <p className="px-5 text-xs sm:text-base ">Colors can inspire</p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  aria-label="Phonenumber"
                  className="w-4 h-4"
                >
                  <path
                    fill="currentColor"
                    d="M449.366,89.648l-.685-.428L362.088,46.559,268.625,171.176l43,57.337a88.529,88.529,0,0,1-83.115,83.114l-57.336-43L46.558,362.088l42.306,85.869.356.725.429.684a25.085,25.085,0,0,0,21.393,11.857h22.344A327.836,327.836,0,0,0,461.222,133.386V111.041A25.084,25.084,0,0,0,449.366,89.648Zm-20.144,43.738c0,163.125-132.712,295.837-295.836,295.837h-18.08L87,371.76l84.18-63.135,46.867,35.149h5.333a120.535,120.535,0,0,0,120.4-120.4v-5.333l-35.149-46.866L371.759,87l57.463,28.311Z"
                  ></path>
                </svg>
                <span className="">+{user?.mobileNumber}</span>
              </span>
              <span className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  aria-label="Email address"
                  className="w-4 h-4"
                >
                  <path
                    fill="currentColor"
                    d="M274.6,25.623a32.006,32.006,0,0,0-37.2,0L16,183.766V496H496V183.766ZM464,402.693,339.97,322.96,464,226.492ZM256,51.662,454.429,193.4,311.434,304.615,256,268.979l-55.434,35.636L57.571,193.4ZM48,226.492,172.03,322.96,48,402.693ZM464,464H48V440.735L256,307.021,464,440.735Z"
                  ></path>
                </svg>
                <span className="">{user?.email}</span>
              </span>
            </div>
          </div>
          <div className="absolute top-0 right-0 m-4 bg-slate-100 py-2 px-2 rounded-md">
            <Tooltip title="Edit profile">
              <Link href="/profile/edit">
                <Image
                  src={editProfileIcon}
                  alt="editProfileIcon"
                  height={20}
                  width={20}
                />
              </Link>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
