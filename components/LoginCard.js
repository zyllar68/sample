import { useState } from "react";
import { Input, Button } from "@/components";
import { useRouter } from "next/router";
import axios from "axios";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";

const LoginCard = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (!username) {
      setErrorMessage("All fields required!");
    } else {
      try {
        const res = await axios({
          method: "POST",
          url: "auth",
          headers: {
            "Content-Type": "application/json",
            "api-key": process.env.NEXT_PUBLIC_API_KEY,
          },
          baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
          data: {
            username,
            password,
          },
        });

        if (Cookies.set("token", res.data.token, { expires: 365 })) {
          const decoded = jwt.decode(res.data.token);
          const accountType = decoded.accountType;
          if (accountType === "admin") {
            router.push("/admin");
          } else {
            router.push("/mobile");
          }
        }

        console.log(res.data);
      } catch (error) {
        setErrorMessage("Username or password are not correct!");
      }
    }
  };

  return (
    <div className='loginCard'>
      <h1>Login</h1>
      <form onSubmit={handleLoginSubmit}>
        <Input
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setErrorMessage("");
          }}
          marginTop='31px'
          placeholder='Username'
        />
        <Input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrorMessage("");
          }}
          marginTop='1.25rem'
          placeholder='password'
          type='password'
        />
        {errorMessage && <p>{errorMessage}</p>}
        <Button
          type='submit'
          marginTop='1.875rem'
          title='Login'
          width='100%'
          primary
        />
      </form>
    </div>
  );
};

export default LoginCard;
