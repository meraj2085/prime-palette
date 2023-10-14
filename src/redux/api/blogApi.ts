import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";
const BLOG_URL = "/blog";

export const blogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllBlogs: build.query({
      query: () => ({
        url: `${BLOG_URL}/`,
        method: "GET",
      }),
      providesTags: [tagTypes.blog],
    }),
    getSingleBlog: build.query({
      query: (id) => ({
        url: `${BLOG_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.blog],
    }),
    addBlog: build.mutation({
      query: (data) => ({
        url: `${BLOG_URL}/`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.blog],
    }),
    updateBlog: build.mutation({
      query: (data) => ({
        url: `${BLOG_URL}/${data.id}`,
        method: "PATCH",
        data: data?.data,
      }),
      invalidatesTags: [tagTypes.blog],
    }),
    deleteBlog: build.mutation({
      query: (data) => ({
        url: `${BLOG_URL}/`,
        method: "DELETE",
        data: data,
      }),
      invalidatesTags: [tagTypes.blog],
    }),
  }),
});

export const {
  useGetAllBlogsQuery,
  useGetSingleBlogQuery,
  useAddBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;
