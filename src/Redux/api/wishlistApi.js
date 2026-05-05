import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const wishlistApi = createApi({
  reducerPath: 'wishlistApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    credentials: 'include', // automatically sends the token cookie
  }),
  tagTypes: ['Wishlist'],
  endpoints: (builder) => ({
    getWishlist: builder.query({
      query: () => '/api/wishlist',
      providesTags: ['Wishlist'],
    }),
  }),
});

export const { useGetWishlistQuery } = wishlistApi;