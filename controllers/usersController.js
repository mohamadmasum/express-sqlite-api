import User from "../schema/userSchema.js";

export async function createUser(req, res){
  const {name, email, password} = req.body;
  const hasil = await User.create({
    name, 
    email,
    password
  });
  return res.json(hasil);
}