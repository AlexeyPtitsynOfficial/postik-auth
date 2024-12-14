import { api } from "../../app/api";

export type User = {
  id: string;
  UserName: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Role: string;
  exp: number;
  sub: string;
};

export type UserSignUpRequest = {
  UserName: string;
  FirstName: string;
  LastName: string;
  Email: string;
  exp: number;
  sub: string;
};

export interface LoginRequest {
  Email: string;
  Password: string;
}

export interface UserResponse {
  user: User;
  token: string;
}

export const authApiSlice = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    getuserData: build.mutation<UserResponse, LoginRequest>({
      query: () => ({
        url: "getuserdata",
        method: "POST",
      }),
    }),
    signup: build.mutation<UserResponse, UserSignUpRequest>({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation, useGetuserDataMutation, useSignupMutation } =
  authApiSlice;
