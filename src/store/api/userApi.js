import api from "./api";

export const userApi = api.injectEndpoints({
  reducerPath: "userApi",
  endpoints: (builder) => ({
    addUser: builder.mutation({
      query: (data) => {
        console.log("Data before making API call:", data);
        return {
          url: "user/registerUser",
          method: "POST",
          body: data,
        };
      },
    }),

    getAllUsers: builder.query({
      query: () => "user/getAllUsers",
    }),

    getSignedUser: builder.query({
      query: () => "user/getSignedUser",
    }),
  }),
});

export const {
  useAddUserMutation,
  useGetAllUsersQuery,
  useGetSignedUserQuery,
} = userApi;
