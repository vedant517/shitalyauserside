import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
  reducerPath: "cartApi",

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL || "",

    // ✅ send cookies automatically
    credentials: "include",
  }),

  tagTypes: ["Cart"],

  endpoints: (builder) => ({

    // ✅ GET USER CART
    getCart: builder.query({
      query: () => "/api/cart",

      transformResponse: (res) => {
        if (Array.isArray(res)) return res;
        if (Array.isArray(res?.data)) return res.data;
        if (Array.isArray(res?.cart)) return res.cart;
        if (Array.isArray(res?.items)) return res.items;

        return [];
      },

      providesTags: ["Cart"],
    }),

    // ✅ ADD TO CART
    addToCart: builder.mutation({
      query: (item) => ({
        url: "/api/cart/add",
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: item,
      }),

      invalidatesTags: ["Cart"],
    }),

    // ✅ REMOVE FROM CART
    removeFromCart: builder.mutation({
      query: (cartItemId) => ({
        url: `/api/cart/remove/${cartItemId}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Cart"],
    }),

  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
} = cartApi;