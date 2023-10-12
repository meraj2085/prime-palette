"use client";

import { useState } from "react";
import { ConfigProvider, Layout, Menu, MenuTheme } from "antd";
const { Sider } = Layout;
import { sidebarItems } from "@/constants/sidebarItems";
import { USER_ROLE } from "@/constants/role";
import { getUserInfo } from "@/services/auth.service";
import { useAppSelector } from "@/redux/hooks";
import { SiderTheme } from "antd/es/layout/Sider";
import universityImage from "../../assets/university.png";
import Image from "next/image";

const SideBar = () => {
  const theme = useAppSelector((state) => state.config.theme);
  const [collapsed, setCollapsed] = useState(false);
  const { role } = getUserInfo() as any;

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#4c92d4",
          borderRadius: 2,
          fontSize: 16,
        },
      }}
    >
      <Sider
        collapsible
        theme={theme as SiderTheme | undefined}
        // theme="dark"
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={280}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "sticky",
          left: 0,
          top: 0,
          bottom: 0,
          // backgroundColor: "#cdb4db",
        }}
      >
        <div
          style={{
            color: "#A5C5E9",
            fontSize: "2rem",
            textAlign: "center",
            fontWeight: "bold",
            margin: "4px",
            // padding: "10px 0px",
            cursor: "pointer",
          }}
        >
          {/* UMS */}
          <Image src={universityImage} width={49} alt="University image" />
        </div>
        <Menu
          style={{
            borderTop: "0.5px solid #e8e8e8",
            borderRight: "none",
          }}
          theme={theme as MenuTheme | undefined}
          // theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={sidebarItems(role)}
        />
      </Sider>
    </ConfigProvider>
  );
};

export default SideBar;
