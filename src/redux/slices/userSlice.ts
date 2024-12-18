import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserInfo {
    fullName: string;
    roles: string[];
    userName: string;
    token: string;
}

export interface User {
    Id: number;
    FullName: string;
    UserName: string;
    Password: string;
    OrganizationName: string;
    OrganizationId: string;
    Roles: string[];
    Token: string | null;
}

export const userInfo : UserInfo = {
    fullName: "",
    roles: [],
    userName: "",
    token: ""
}
  
export const adminInfo = {
    userRegisterActive: true,
    userList: [],
    userSelected: null as User | null,
}

export interface AuthState {
    isAuthenticated: boolean;
  }
  
  const initialState: AuthState = {
    isAuthenticated: false,
  };
  
  const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      setAuthenticated(state, action: PayloadAction<boolean>) {
        state.isAuthenticated = action.payload;
      },
    },
  });
  
  export const { setAuthenticated } = authSlice.actions;
  export default authSlice.reducer;

