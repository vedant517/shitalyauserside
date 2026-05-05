import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL =
  import.meta.env?.VITE_API_BASE_URL || "";

export const orderApi = createApi({
  reducerPath: "orderApi",

  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      // Read JWT token from localStorage (set it at login time)
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),

  tagTypes: ["Orders"],

  endpoints: (builder) => ({
    // POST /orders
    placeOrder: builder.mutation({
      query: (orderPayload) => ({
        url: "/api/orders",
        method: "POST",
        body: orderPayload,
      }),
      invalidatesTags: ["Orders"],
    }),

    // GET /orders/:id  (optional — for order confirmation page)
    getOrderById: builder.query({
      query: (id) => `/orders/${id}`,
      providesTags: (_result, _err, id) => [{ type: "Orders", id }],
    }),
  }),
});

export const { usePlaceOrderMutation, useGetOrderByIdQuery } = orderApi;
