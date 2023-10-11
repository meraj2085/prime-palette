import { baseApi } from "./api/baseApi";
import configReducer from "./slices/configSlice";

export const reducer = {
  config: configReducer,
  [baseApi.reducerPath]: baseApi.reducer,
};
