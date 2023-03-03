import { useState } from "react";
import { Input, Button } from "@/components";
import { useRouter } from "next/router";
import axios from "axios";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";

const LoginCard = () => {
  const router = useRouter();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin");

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios({
        method: "POST",
        url: "auth",
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.NEXT_PUBLIC_API_KEY,
        },
        baseURL: "http://localhost:3000/api/",
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
          router.push("/admin");
        }
      }

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='loginCard'>
      <h1>Login</h1>
      <form onSubmit={handleLoginSubmit}>
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          marginTop='31px'
          placeholder='Username'
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          marginTop='1.25rem'
          placeholder='password'
          type='password'
        />
        <p>error message</p>
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
