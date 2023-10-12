import { IMeta, IService } from "@/types";
import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";
const SERVICE_URL = "/service";

export const serviceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    services: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: SERVICE_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IService[], meta: IMeta) => {
        return {
          services: response,
          meta,
        };
      },
      providesTags: [tagTypes.service],
    }),
  }),
});

export const { useServicesQuery } = serviceApi;
