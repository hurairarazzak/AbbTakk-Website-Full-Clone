import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ message: "No token provided ❌" });

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err)
      return res.status(401).json({ message: "Invalid token ❌" });

    // Optional: attach admin info to request
    req.admin = decoded;
    next();
  });
};

export default verifyAdmin;
