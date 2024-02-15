import baseApi from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/register",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["user"],
    }),

    login: builder.mutation({
      query: (userInfo) => ({
        url: `/auth/login`,
        method: "POST",
        body: userInfo,
      }),
    }),

    getAllUsers: builder.query({
      query: () => ({
        url: `/auth/users`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),

    updateUser: builder.mutation({
      query: (payload) => ({
        url: `/auth/user/${payload.id}`,
        method: "PATCH",
        body: payload.user,
      }),
      invalidatesTags: ["user"],
    }),

    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/auth/user/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
