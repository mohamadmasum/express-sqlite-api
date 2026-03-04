import User from "../schema/userSchema.js";

const adminId = 2;

export async function verifikasiUser(req, res, next){
    
    const id        = req.params.id;
    const hasil = await User.findByPk(id);
    const roleUser  = hasil.role
    const userId    = hasil.id

    console.log("chek variable role", roleUser);

    if (userId == adminId && roleUser == "admin" ){
        console.log("akses diperbolehkan")

        next();
    }else {
        console.log ("hanya admin yg bisa akses")
        return res.json({
            pesan:"hanya admin yg bisa akses"
        })
    }

}