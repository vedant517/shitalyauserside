import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const orderApi = createApi({
  reducerPath: "orderApi",

  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,

    // ✅ important for cookies
    credentials: "include",
  }),

  tagTypes: ["Orders"],

  endpoints: (builder) => ({

    // ======================
    // PLACE ORDER
    // POST /api/orders
    // ======================
    placeOrder: builder.mutation({
      query: (orderPayload) => ({
        url: "/api/orders",
        method: "POST",
        body: orderPayload,
      }),

      invalidatesTags: ["Orders"],
    }),

    // ======================
    // GET ORDER BY ID
    // GET /api/orders/:id
    // ======================
    getOrderById: builder.query({
      query: (id) => ({
        url: `/api/orders/${id}`,
        method: "GET",
      }),

      providesTags: (_result, _error, id) => [
        { type: "Orders", id },
      ],
    }),

    // ======================
    // GET MY ORDERS
    // GET /api/orders/my-orders
    // ======================
    getUserOrders: builder.query({
      query: () => ({
        url: "/api/orders/my-orders",
        method: "GET",
      }),

      providesTags: ["Orders"],
    }),
  }),
});

export const {
  usePlaceOrderMutation,
  useGetOrderByIdQuery,
  useGetUserOrdersQuery,
} = orderApi;