import { Input, Button } from "@/components";

const LoginCard = () => {
  return (
    <div className='loginCard'>
      <h1>Login</h1>
      <form>
        <Input marginTop='31px' placeholder='Username' />
        <Input marginTop='1.25rem' placeholder='password' type='password' />
        <p>error message</p>
        <Button marginTop='1.875rem' title='Login' primary />
      </form>
    </div>
  );
};

export default LoginCard;
