import User from "../schema/userSchema.js";
import jwt from "jsonwebtoken";

export async function verifikasiUser(req, res, next) {
    if (req.body.accesToken == null) {
        return res.json("token wajib disertakan")
    }

    jwt.verify(req.body.accesToken, "BNI01", (error, decoded) => {
        if (error)
            return res.json("token tidak valid");

        if (decoded) {
            next();
        } else {
            return res.json({
                pesan: "akses ditolak atau token tidak sah"
            })
        }
    });


}