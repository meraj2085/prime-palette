import {
  Avatar,
  Button,
  Dropdown,
  Layout,
  MenuProps,
  Row,
  Space,
  Switch,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { getUserInfo, removeUserInfo } from "@/services/auth.service";
import { authKey } from "@/constants/storageKey";
import { useRouter } from "next/navigation";
import { FireOutlined, BugOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/localStorage";
import Link from "next/link";
const { Header: AntHeader } = Layout;

const Header = () => {
  // const theme = useAppSelector((state) => state.config.theme);
  const localStorageTheme = getFromLocalStorage("theme");
  const theme = localStorageTheme ? JSON.parse(localStorageTheme) : null;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { role } = getUserInfo() as any;

  const logOut = () => {
    removeUserInfo(authKey);
    router.push("/auth/login");
  };

  const items: MenuProps["items"] = [
    {
      key: "0",
      label: (
        <Link href="/dashboard/profile">
          <p className="bg-gray-600 rounded-md py-2 px-10 text-white text-center">
            Profile
          </p>
        </Link>
      ),
    },
    {
      key: "0",
      label: (
        <p
          className="bg-red-300 rounded-md py-2 px-10 text-white text-center"
          onClick={logOut}
        >
          Logout
        </p>
      ),
    },
  ];

  return (
    <AntHeader
      style={{
        height: "65.5px",
        background: "#FFFFFF",
        // marginLeft: "1px",
      }}
    >
      <Row
        justify="end"
        align="middle"
        style={{
          height: "100%",
        }}
      >
        <p
          style={{
            margin: "0px 10px",
            color: "black",
          }}
        >
          <Switch
            onChange={(checked) => {
              if (checked) {
                setToLocalStorage("theme", JSON.stringify({ theme: "dark" }));
                dispatch({ type: "config/setTheme", payload: "dark" });
              } else {
                setToLocalStorage("theme", JSON.stringify({ theme: "light" }));
                dispatch({ type: "config/setTheme", payload: "light" });
              }
            }}
            checkedChildren={<BugOutlined />}
            unCheckedChildren={<FireOutlined />}
            defaultChecked={theme?.theme === "dark" ? true : false}
          />
        </p>
        <Dropdown menu={{ items }}>
          <a>
            <Space wrap size={16}>
              <Avatar size="large" icon={<UserOutlined />} />
            </Space>
          </a>
        </Dropdown>
      </Row>
    </AntHeader>
  );
};

export default Header;
