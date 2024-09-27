import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://dcb3-112-135-220-49.ngrok-free.app" }),
  // baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/" }),
  // baseQuery: fetchBaseQuery({ baseUrl: "http://44.204.115.155:4000/" }),

  reducerPath: "authApi",
  endpoints: (build) => ({
    loginUser: build.mutation({
      query: (data) => {
        return {
          url: "user/login",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const { useLoginUserMutation } = authApi;
