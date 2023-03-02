import jwt from "jsonwebtoken";

export async function protectPage(context) {
  // get the cookie with the JWT token
  const jwtCookie = context.req.cookies.jwt;

  // check if the cookie exists
  if (!jwtCookie) {
    // redirect to login page if not authenticated
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  try {
    // verify JWT token
    const verified = jwt.verify(jwtCookie, process.env.JWT_SECRET);

    // pass authenticated user object as prop
    return {
      props: {
        user: verified,
      },
    };
  } catch (error) {
    // redirect to login page if JWT token is invalid
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
}
