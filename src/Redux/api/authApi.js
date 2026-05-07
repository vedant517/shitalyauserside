import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const authApi = createApi({
  reducerPath: "authApi",

  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,

    // ✅ VERY IMPORTANT
    credentials: "include",
  }),

  endpoints: (builder) => ({

    // ======================
    // SEND OTP
    // ======================
    sendOtp: builder.mutation({
      query: (phonenum) => ({
        url: "/api/auth/send-otp",
        method: "POST",

        credentials: "include",

        body: { phonenum },
      }),
    }),

    // ======================
    // VERIFY OTP
    // ======================
    verifyOtp: builder.mutation({
      query: ({ phonenum, otp }) => ({
        url: "/api/auth/verify-otp",
        method: "POST",

        credentials: "include",

        body: {
          phonenum,
          otp,
        },
      }),
    }),

    // ======================
    // REGISTER
    // ======================
    register: builder.mutation({
      query: ({ name, phonenum }) => ({
        url: "/api/auth/register",
        method: "POST",

        credentials: "include",

        body: {
          name,
          phonenum,
        },
      }),
    }),
  }),
});

export const {
  useSendOtpMutation,
  useVerifyOtpMutation,
  useRegisterMutation,
} = authApi;