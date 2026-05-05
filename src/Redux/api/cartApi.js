import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    credentials: "include",
    // Also attach Bearer token from cookie/localStorage if present
    prepareHeaders: (headers) => {
      const token = document.cookie
        .split("; ")
        .find((c) => c.startsWith("token="))
        ?.split("=")[1];
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    // GET /api/cart
    getCart: builder.query({
      query: () => "/api/cart",
      transformResponse: (res) => {
        // Normalise: bare array or { data: [...] } or { cart: [...] }
        if (Array.isArray(res))       return res;
        if (Array.isArray(res?.data)) return res.data;
        if (Array.isArray(res?.cart)) return res.cart;
        if (res?.items)               return res.items;
        return [];
      },
      providesTags: ["Cart"],
    }),

    // POST /api/cart/add   body: { productId, name, price, image, quantity }
    addToCart: builder.mutation({
      query: (item) => ({
        url: "/api/cart/add",
        method: "POST",
        body: item,
      }),
      invalidatesTags: ["Cart"],
    }),

    // DELETE /api/cart/remove/:cartItemId
    removeFromCart: builder.mutation({
      query: (cartItemId) => ({
        url: `/api/cart/remove/${cartItemId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const { useGetCartQuery, useAddToCartMutation, useRemoveFromCartMutation } = cartApi;