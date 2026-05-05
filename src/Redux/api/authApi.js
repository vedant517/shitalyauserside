import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: 'include', // sends cookies (token) automatically
  }),
  endpoints: (builder) => ({
    // POST /api/auth/send-otp  — { phonenum }
    sendOtp: builder.mutation({
      query: (phonenum) => ({
        url: '/api/auth/send-otp',
        method: 'POST',
        body: { phonenum },
      }),
    }),

    // POST /api/auth/verify-otp  — { phonenum, otp }
    verifyOtp: builder.mutation({
      query: ({ phonenum, otp }) => ({
        url: '/api/auth/verify-otp',
        method: 'POST',
        body: { phonenum, otp },
      }),
    }),

    // POST /api/auth/register  — { name, phonenum }
    register: builder.mutation({
      query: ({ name, phonenum }) => ({
        url: '/api/auth/register',
        method: 'POST',
        body: { name, phonenum },
      }),
    }),
  }),
});

export const { useSendOtpMutation, useVerifyOtpMutation, useRegisterMutation } =
  authApi;
