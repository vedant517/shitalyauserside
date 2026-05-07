import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    addReview: builder.mutation({
      query: (reviewData) => ({
        url: "/api/reviews",
        method: "POST",
        body: reviewData,
      }),
    }),
  }),
});

export const { useAddReviewMutation } = reviewApi;