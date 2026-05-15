import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL =
  import.meta.env?.VITE_API_BASE_URL ||
  process.env?.REACT_APP_API_BASE_URL ||
  "";

export const couponApi = createApi({
  reducerPath: "couponApi",

  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
  }),

  tagTypes: ["Coupons"],

  endpoints: (builder) => ({

    // GET /api/coupons — fetch all available coupons
    getCoupons: builder.query({
      query: () => "/api/coupons",
      transformResponse: (res) => {
        if (Array.isArray(res))        return res;
        if (Array.isArray(res?.data))  return res.data;
        if (Array.isArray(res?.coupons)) return res.coupons;
        return [];
      },
      providesTags: ["Coupons"],
    }),

    // POST /api/coupons/apply — validate and apply a coupon
    applyCoupon: builder.mutation({
      query: (data) => ({
        url: "/api/coupons/apply",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Coupons"],
    }),
  }),
});

export const { useGetCouponsQuery, useApplyCouponMutation } = couponApi;
