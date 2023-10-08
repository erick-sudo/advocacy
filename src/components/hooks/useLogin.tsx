import { useContext } from "react";
import { endpoints } from "../../assets/apis";
import { apiCalls } from "../../assets/apiCalls";
import { useToken } from "./useToken";
import { AuthContext } from "../context/AuthContext";

export function useLogin() {
  const [handleToken] = useToken();
  const { setExpiredLogin } = useContext(AuthContext);

  function updateUserInformation(tokenObject) {
    handleToken(tokenObject.access_token);
    setExpiredLogin(false);
  }

  const handleLogin = ({ payload = {}, errorCallback = () => {} }) => {
    apiCalls.postRequest({
      endpoint: endpoints.getAccessToken,
      httpMethod: "POST",
      httpHeaders: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      httpBody: payload,
      successCallback: updateUserInformation,
      errorCallback,
    });
  };

  return [handleLogin];
}
