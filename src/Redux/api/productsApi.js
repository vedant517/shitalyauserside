import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL =
  import.meta.env?.VITE_API_BASE_URL ||
  process.env?.REACT_APP_API_BASE_URL ||
  "";

export const productsApi = createApi({
  reducerPath: "productsApi",

  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
  }),

  tagTypes: ["Products"],

  endpoints: (builder) => ({
    // GET /api/products
    getProducts: builder.query({
      query: (params = {}) => {
        const search = new URLSearchParams();
        if (params.category) search.set("category", params.category);
        if (params.color)    search.set("color",    params.color);
        if (params.fabric)   search.set("fabric",   params.fabric);
        if (params.minPrice) search.set("minPrice", params.minPrice);
        if (params.maxPrice) search.set("maxPrice", params.maxPrice);
        if (params.sort)     search.set("sort",     params.sort);
        if (params.search)   search.set("search",   params.search);
        const qs = search.toString();
        return qs ? `/api/products?${qs}` : `/api/products`;
      },
      // ✅ Normalise the response — backend returns { success, data: [...] }
      transformResponse: (res) => {
        if (Array.isArray(res))       return res;
        if (Array.isArray(res?.data)) return res.data;
        return [];
      },
      providesTags: ["Products"],
    }),

    // GET /api/products/:id
    getProductById: builder.query({
      query: (id) => `/api/products/${id}`,
      providesTags: (_result, _err, id) => [{ type: "Products", id }],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;