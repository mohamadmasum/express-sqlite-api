import User from "../schema/userSchema.js";
import jwt from "jsonwebtoken";

export async function loginUser(req, res) {
    const hasil = await User.findOne({
        where: {
            username: req.body.username,
            password: req.body.password
        }
    });

    if (hasil != null) {
    //ketika berhasil login maka generate token
    const dataUser = {
        username: hasil.username,
        email : hasil.email,
        role : hasil.role
    }
    const token = jwt.sign(dataUser, "BNI01");

        return res.json({
            pesan: "user berhasil login", 
            aksestoken: token
        });
    } else {
        return res.json({
            pesan: "user tidak berhasil login"
        });
    }

}



