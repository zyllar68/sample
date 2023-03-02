import Cookies from "js-cookie";

export const getToken = () => {
  const token = Cookies.get("jwt");
  return token ? token : null;
};
