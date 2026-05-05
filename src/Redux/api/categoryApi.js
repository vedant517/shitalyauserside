import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: "include",
  }),
  tagTypes: ["Categories"],
  endpoints: (builder) => ({
    // GET /api/categories
    getCategories: builder.query({
      query: () => "/api/categories",
      // Normalise to always return a plain array
      transformResponse: (res) => {
        if (Array.isArray(res))       return res;
        if (Array.isArray(res?.data)) return res.data;
        return [];
      },
      providesTags: ["Categories"],
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryApi;
