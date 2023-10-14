import { IMeta, IService, IUser } from "@/types";
import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";
const USER_URL = "/users";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllUsers: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `${USER_URL}`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IUser[], meta: IMeta) => {
        return {
          users: response,
          meta,
        };
      },
      providesTags: [tagTypes.user],
    }),
    updateUser: build.mutation({
      query: (id) => ({
        url: `${USER_URL}/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.user],
    }),
    getProfile: build.query({
      query: () => ({
        url: `${USER_URL}/my-profile`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    updateProfile: build.mutation({
      query: (data) => ({
        url: `${USER_URL}/my-profile`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation
} = userApi;
