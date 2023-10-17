"use client";
import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { Button, Input, message } from "antd";
import Link from "next/link";
import {
  DeleteOutlined,
  EyeOutlined,
  EditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useDebounced } from "@/redux/hooks";
import UMTable from "@/components/ui/UMTable";
import { IUser } from "@/types";
import dayjs from "dayjs";
import { useDeleteFaqMutation, useGetAllFaqQuery } from "@/redux/api/faqApi";

const BlogManagementPage = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }
  const { data, isLoading } = useGetAllFaqQuery({ ...query });
  const [deleteFaq] = useDeleteFaqMutation();
  const meta = data?.meta;

  const deleteHandler = async (id: string) => {
    try {
      const response = await deleteFaq(id).unwrap();
      if (response?.id) {
        message.success("Faq deleted successfully");
      } else {
        message.error("Failed to delete faq");
      }
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const columns = [
    {
      title: "Question",
      dataIndex: "question",
      render: function (data: string) {
        const first100Chars = data.slice(0, 30);
        return `${first100Chars}...`;
      },
    },
    {
      title: "Answer",
      dataIndex: "answer",
      render: function (data: string) {
        const first100Chars = data.slice(0, 30);
        return `${first100Chars}...`;
      },
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY");
      },
      sorter: true,
    },
    {
      title: "Action",
      dataIndex: "id",
      render: function (data: any) {
        return (
          <>
            <Link href={`/dashboard/admin/content/faqManagement/view/${data}`}>
              <Button
                onClick={() => console.log(data)}
                className="bg-blue-300 text-white hover:text-violet-600"
              >
                <EyeOutlined />
              </Button>
            </Link>
            <Link href={`/dashboard/admin/content/faqManagement/edit/${data}`}>
              <Button
                style={{
                  margin: "0px 5px",
                }}
              >
                <EditOutlined />
              </Button>
            </Link>
            <Button onClick={() => deleteHandler(data)} type="primary" danger>
              <DeleteOutlined />
            </Button>
          </>
        );
      },
    },
  ];
  const onPaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setSize(pageSize);
  };
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };

  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: "Admin",
            link: "/dashboard/admin",
          },
          {
            label: "FAQ",
            link: "/dashboard/admin/content/faqManagement",
          },
        ]}
      />
      <ActionBar title="FAQ List">
        <Input
          size="large"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "20%",
          }}
        />
        <div>
          <Link href="/dashboard/admin/content/faqManagement/create">
            <Button>Create FAQ</Button>
          </Link>
          {(!!sortBy || !!sortOrder || !!searchTerm) && (
            <Button style={{ margin: "0px 5px" }} onClick={resetFilters}>
              <ReloadOutlined />
            </Button>
          )}
        </div>
      </ActionBar>

      <UMTable
        loading={isLoading}
        columns={columns}
        dataSource={data?.faq}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />
    </div>
  );
};

export default BlogManagementPage;
