import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { ApiPaths } from "./routes.ts";

export type UserProfileDto = {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
};

type UpdateUserReqDto = Partial<Omit<UserProfileDto, "id">>;

export const userApi = createApi({
  reducerPath: "userApi",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({ baseUrl: ApiPaths.BASE_URL }),
  endpoints: (builder) => ({
    getUserProfile: builder.query<UserProfileDto, void>({
      query: () => ({
        url: ApiPaths.CURRENT_PROFILE,
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      }),
    }),

    updateUserProfile: builder.mutation<
      UserProfileDto,
      { id: number } & UpdateUserReqDto
    >({
      query: ({ id, ...body }) => ({
        url: `${ApiPaths.UPDATE_PROFILE}${id}`,
        method: "PUT",
        body,
      }),
    }),

    deleteUserProfile: builder.mutation<boolean, number>({
      query: (id) => ({
        url: `${ApiPaths.DELETE_PROFILE}${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useDeleteUserProfileMutation,
} = userApi;
