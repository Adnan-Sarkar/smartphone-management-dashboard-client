import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../../types/user.type";

// initial state for user
const initialState: IUser = {
  fullName: "",
  userName: "",
  email: "",
  phone: "",
  gender: null,
  age: null,
  profileImage: "",
  token: "",
};

// create slice for user
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const {
        fullName,
        userName,
        email,
        phone,
        gender,
        age,
        profileImage,
        token,
      } = action.payload;

      state.fullName = fullName;
      state.userName = userName;
      state.email = email;
      state.phone = phone;
      state.gender = gender;
      state.age = age;
      state.profileImage = profileImage;
      state.token = token;
    },

    logOut: (state) => {
      state.fullName = "";
      state.userName = "";
      state.email = "";
      state.phone = "";
      state.gender = null;
      state.age = null;
      state.profileImage = "";
      state.token = "";
    },
  },
});

export const { addUser, logOut } = userSlice.actions;
export default userSlice.reducer;
