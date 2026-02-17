import jwt from "jsonwebtoken";
import dotenv from "dotenv";

if (process.env.NODE_ENV != "production") {
  dotenv.config();
}

// console.log("CHECK SECRET KEY DARI VERIFY TOKEN ", process.env.BNI_SECRET);
export const onlyUser = (req, res, next) => {
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
      return res
        .status(403)
        .json({ message: "Token tidak valid atau expired" });
    }
  console.log("CHECK DECODE TOKEN", JSON.stringify(decoded, null, 3));
    
    if (decoded.role == "admin" || decoded.role == "user") {
      next();
    } else {
      return res.json("hanya boleh diakses oleh admin dan user")
    }
  });
};
