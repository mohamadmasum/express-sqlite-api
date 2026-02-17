import jwt from "jsonwebtoken";
import dotenv from "dotenv";

if(process.env.NODE_ENV != "production"){
    dotenv.config();
}


// console.log("CHECK SECRET KEY DARI VERIFY TOKEN ", process.env.BNI_SECRET);
export const onlyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token tidak ditemukan" });
  }

  const token = authHeader.split(" ")[1]; 

  if (!token) {
    return res.status(401).json({ message: "Token tidak valid" });
  }

  jwt.verify(token, process.env.BNI_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Token tidak valid atau expired" });
    }
    if (decoded.role != "admin") {
        return res.status(403).json({message: " token tidak sah"});
    }

    req.user = decoded;
    next();
  });
};
