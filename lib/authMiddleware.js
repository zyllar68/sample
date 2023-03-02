import jwt from "jsonwebtoken";

export default function authMiddleware(handler) {
  return async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }
    const token = authHeader.split(" ")[1];
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decodedToken.userId;
      req.username = decodedToken.username;
      return handler(req, res);
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
}
