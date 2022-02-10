import { useState } from "react";

export default function useToken() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem("token");
    if (token != undefined) {
      return JSON.parse(tokenString);
    } else return null;
  };

  const [token, setToken] = useState(getToken());
  console.log(token);
  const saveToken = (userToken) => {
    sessionStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token,
  };
}
