import { useState } from "react";
import { Input, Button } from "@/components";
import { useRouter } from "next/router";

const LoginCard = () => {
  const router = useRouter();

  const [page, setPage] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (page === "admin") {
      router.push("/admin");
    } else {
      router.push("/mobile");
    }
  };

  return (
    <div className='loginCard'>
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <Input
          value={page}
          onChange={(e) => setPage(e.target.value)}
          marginTop='31px'
          placeholder='Username'
        />
        <Input marginTop='1.25rem' placeholder='password' type='password' />
        <p>error message</p>
        <Button marginTop='1.875rem' title='Login' width='100%' primary />
      </form>
    </div>
  );
};

export default LoginCard;
