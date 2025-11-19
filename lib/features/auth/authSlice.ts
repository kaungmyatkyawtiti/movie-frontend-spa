import { createAppSlice } from "@/lib/createAppSlice";
import { BASE_URL } from "@/utils/config";
import { log, logError } from "@/utils/logger";

export interface AuthSliceState {
  token: string;
}

interface LoginRequest {
  username: string;
  password: string;
}

const initialState: AuthSliceState = {
  token: "",
}

export const authSlice = createAppSlice({
  name: "auth",

  initialState,

  reducers: (create) => ({
    login: create.asyncThunk(
      async (userData: LoginRequest, thunkApi) => {
        try {
          const response = await fetch(BASE_URL + `/api/users/login`, {
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(userData),
          });
          const json = await response.json();
          log("Login response", json, "token", json.token, "response.ok", response.ok);

          if (!response.ok || !json.token) {
            log("Invalid token case", json);
            return thunkApi.rejectWithValue(json.error || "Invalid user");
          }
          return json;
        } catch (error) {
          return thunkApi.rejectWithValue(
            error instanceof Error
              // ? (log(error.message), error.message)
              ? error.message
              : "Network error"
          );
        }
      },
      {
        //pending
        pending: (state) => {
        },
        // fulfilled
        fulfilled: (state, action) => {
          log('fulfilled case');
          state.token = action.payload.token;
        },
        //rejected
        rejected: (state) => {
          logError('reject case');
          state.token = '';
        },
      },

    ),

    logout: create.reducer((state) => {
      state.token = "";
    }),

  }),

  selectors: {
    selectAuthToken: (state) => state.token,
  }
})

export const {
  login,
  logout,
} = authSlice.actions;

export const { selectAuthToken } = authSlice.selectors;
