import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiPaths } from "./routes";

type LoginReqDto = {
  email: string;
  password: string;
};

type LoginResDto = {
  access_token: string;
  refresh_token: string;
};

type RegisterReqDto = {
  name: string;
  email: string;
  password: string;
  avatar: string;
};

type RegisterResDto = RegisterReqDto & {
  role: string;
  id: number;
};

export const authApi = createApi({
  reducerPath: "authApi",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({ baseUrl: ApiPaths.BASE_URL }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResDto, LoginReqDto>({
      query: (body) => ({
        url: ApiPaths.AUTH_LOGIN,
        method: "POST",
        body,
      }),
    }),

    registration: builder.mutation<RegisterResDto, RegisterReqDto>({
      query: (body) => ({
        url: ApiPaths.AUTH_REGISTRATION,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegistrationMutation } = authApi;
