import { GoogleLogin } from "@react-oauth/google";
import React from "react";
import { useDispatch } from "react-redux";
import { loginWithGoogle } from "../../redux/feature/auth/action";

const GoogleAuthButton = () => {
  const dispatch = useDispatch();

  const handleSuccess = (response) => {
    // The `response.credential` should be the Google JWT token
    console.log("Google login success, credential:", response.credential);
    dispatch(loginWithGoogle(response.credential));
  };

  const handleError = () => {
    console.log("Google Login Failed");
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 border-t-2 border-gray-200 pt-5">
      <p className="text-lg font-medium text-gray-600">
        Or sign in with your Google account
      </p>
      <div className="w-full max-w-xs">
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          useOneTap={false} // Optional: Prevents auto-sign-in
          render={(renderProps) => (
            <button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              className="w-full flex items-center justify-center gap-2 p-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition hover:bg-gray-50"
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google Logo"
                className="w-5 h-5"
              />
              <span className="text-gray-700 font-medium">
                Sign in with Google
              </span>
            </button>
          )}
        />
      </div>
    </div>
  );
};

export default GoogleAuthButton;
