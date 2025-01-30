import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import organizacion from "pages/organizacion";
import {
  CurrentUser,
  DigipointsUser,
  StatusUser,
} from "services/User/user.service";

export interface InitialStateUserReducer {
  user: CurrentUserToken | null;
  token: string | null;
  loading: boolean;
  error: null;
  organization: any;
  digipoints: DigipointsUser;
  status: StatusUser | null;
  userSwitch: CurrentUser | null;
}

interface CurrentUserToken extends CurrentUser {
  token: string;
}

const initialState: InitialStateUserReducer = {
  user: null,
  token: null,
  loading: false,
  error: null,
  organization: null,
  digipoints: {
    current_points:0,
    history_points:0,
    redeemed_points:0
  },
  userSwitch: null,
  status: null,
};

export const currentUserActions = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    userLogin: (state, action: PayloadAction<CurrentUserToken>) => {
      state.user = action.payload;
      state.token = action.payload.token;
      state.organization = action.payload.profile.organizations;
      state.digipoints = action.payload.points;
      state.status = action.payload.status;
    },
    userSwitch: (state, action: PayloadAction<CurrentUserToken>) => {
      state.userSwitch = action.payload;
      state.token = action.payload.token;
      state.organization = action.payload;
      state.digipoints = action.payload.points;
    },
    userToken: (state, action) => {
      state.token = action.payload;
    },

    userUpdate: (state, action) => {

      state.user = {...state.user,...action.payload};
    },

    loadingUser: (state, action) => {
      state.loading = action.payload;
    },

    setDigipoints: (state, action) => {
      state.digipoints = action.payload;
    },

    udpateDigipoints: (state, action) => {
      state.digipoints = action.payload;
    },

    setUserStatus: (state, action) => {
      if (!state.user?.id) {
        throw new Error("User ID is required");
      }

      const data = action.payload;

      state.user = {
        ...state.user,
        status: { ...(state.user?.status || []), ...data },
      };
    },

    setInitialStateUser: () => {
      return initialState;
    },
  },
});

export const {
  userLogin,
  loadingUser,
  setDigipoints,
  userToken,
  setInitialStateUser,
  userUpdate,
  setUserStatus,
} = currentUserActions.actions;

export default currentUserActions.reducer;
