import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: `https://smartphone-management-dashboard-server-by-adnan-sarkar.vercel.app/api/v1`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).user.token;

    if (token) {
      headers.set("Authorization", token);
    }

    return headers;
  },
});

const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery,
  tagTypes: ["products", "salesHistory", "user"],
  endpoints: () => ({}),
});

export default baseApi;
