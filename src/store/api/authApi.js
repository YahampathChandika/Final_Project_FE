import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.BASE_URL }),
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
