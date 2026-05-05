import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// same env logic you used
const BASE_URL =
  import.meta.env?.VITE_API_BASE_URL ||
  process.env?.REACT_APP_API_BASE_URL ||
  "";

export const contactApi = createApi({
  reducerPath: "contactApi",

  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include", // ✅ needed for cookies (your token)
  }),

  tagTypes: ["Enquiry"],

  endpoints: (builder) => ({
    // POST /enquiries
    createEnquiry: builder.mutation({
      query: (body) => ({
        url: "api/enquiries",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCreateEnquiryMutation } = contactApi;