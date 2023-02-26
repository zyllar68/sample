import { Input, Button } from "@/components";
import { useRouter } from "next/router";

const LoginCard = () => {
  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault();
    router.push("/mobile");
  };

  return (
    <div className='loginCard'>
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <Input marginTop='31px' placeholder='Username' />
        <Input marginTop='1.25rem' placeholder='password' type='password' />
        <p>error message</p>
        <Button marginTop='1.875rem' title='Login' primary />
      </form>
    </div>
  );
};

export default LoginCard;
