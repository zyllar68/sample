import jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import axios from "axios";

// function to check if user is authenticated
async function isAuthenticated() {
  // get JWT token from cookie
  const token = Cookies.get("token");

  if (token) {
    // decode JWT token
    const decodedToken = jwt.decode(token);

    try {
      const res = await axios({
        method: "GET",
        url: `users/${decodedToken.userId}`,
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.NEXT_PUBLIC_API_KEY,
        },
        baseURL: "https://swertres-v1.vercel.app/api/",
      });

      if (res.data !== null) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  }

  // token not found, user is not authenticated
  return false;
}

export default isAuthenticated;
