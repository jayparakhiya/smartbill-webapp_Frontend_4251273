import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    signupStart(state) {
      state.loading = true;
      state.error = null;
    },
    signupSuccess(state, action) {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    signupFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    forgotPasswordStart(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    forgotPasswordSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    forgotPasswordFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    resetPasswordStart(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    resetPasswordSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    resetPasswordFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      state.error = null;
      state.isAuthenticated = false;
    },
  },
  // extraReducers: {
  //   // Add rehydration handling if needed
  //   // [REHYDRATE]: (state, action) => {
  //   //   const incoming = action.payload.auth;
  //   //   if (incoming) {
  //   //     return { ...state, ...incoming };
  //   //   }
  //   // },
  // },
  // extraReducers: (builder) => {
  //   builder.addCase(REHYDRATE, () => {
  //     const incoming = action.payload.auth;
  //     if (incoming) {
  //       return {
  //        ...state,
  //        user: incoming.user,
  //        isAuthenticated: incoming.isAuthenticated,
  //       };
  //     }
  //     return state;
  //   })
  // }
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  signupStart,
  signupSuccess,
  signupFailure,
  forgotPasswordStart,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  resetPasswordStart,
  resetPasswordSuccess,
  resetPasswordFailure,
  logout,
} = authSlice.actions;

export default authSlice;

// import { createSlice } from "@reduxjs/toolkit";
// import { REHYDRATE } from "redux-persist";

// const initialState = {
//   user: null,
//   loading: false,
//   error: null,
//   isAuthenticated: false,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     loginStart(state) {
//       state.loading = true;
//       state.error = null;
//     },
//     loginSuccess(state, action) {
//       state.loading = false;
//       state.user = action.payload;
//       console.log("  state.user ===== ", state.user);
//       state.isAuthenticated = true;
//     },
//     loginFailure(state, action) {
//       state.loading = false;
//       state.error = action.payload;
//       state.isAuthenticated = false;
//     },
//     signupStart(state) {
//       state.loading = true;
//       state.error = null;
//     },
//     signupSuccess(state, action) {
//       state.loading = false;
//       state.user = action.payload;
//       state.isAuthenticated = true;
//     },
//     signupFailure(state, action) {
//       state.loading = false;
//       state.error = action.payload;
//       state.isAuthenticated = false;
//     },
//     logout(state) {
//       state.user = null;
//       state.isAuthenticated = false;
//     },
//   },
// });

// export const {
//   loginStart,
//   loginSuccess,
//   loginFailure,
//   signupStart,
//   signupSuccess,
//   signupFailure,
//   logout,
// } = authSlice.actions;

// export default authSlice;
