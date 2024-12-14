import {
  BaseQueryFn,
  CombinedState,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../lib/store";
import { Action, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
//import { logOut, setCredentials } from "./Auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5001/api/auth",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    //const token = "";
    if (token) {
      //headers.set("Access-Control-Allow-Origin", "*");
      headers.set("Authorization", `Beaber ${token}`);
      //headers.set("Content-Type", "application/x-www-form-urlencoded");
      //headers.set("Content-type", "application/json");
      //headers.set("Content-Type", "multipart/form-data");
    }

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status == 401) {
    console.log("sending refresh token");

    const refreshResult = await baseQuery("/refreshtoken", api, extraOptions);
    console.log(refreshResult);
    /*if (refreshResult?.data) {
      const user = (api.getState() as RootState).auth.user;
      api.dispatch(setCredentials({ ...refreshResult.data, user }));

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }*/
  }

  return result;
};

function isHydrateAction(action: Action): action is PayloadAction<RootState> {
  return action.type === HYDRATE;
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  extractRehydrationInfo(action, { reducerPath }): any {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ["Users", "Postiki"],
  keepUnusedDataFor: 30,
  endpoints: (builder) => ({}),
});
