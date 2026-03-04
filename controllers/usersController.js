import User from "../schema/userSchema.js";

export async function createUser(req, res){
  const {username, name, email, password} = req.body;
  console.log("check : ", username);
  const hasil = await User.create({
    username,
    name, 
    email,
    password
  });
  return res.json(hasil);
}

export async function createUserAdmin(req, res){
  const {username, name, email, password, role } = req.body;
  console.log("check : ", username);
  const hasil = await User.create({
    username,
    name, 
    email,
    password,
    role
  });
  return res.json(hasil);
}


export async function updateUser(req, res){
 try {
  const { id } = req.params;
  const { name, email } = req.body;
  
  const user = await User.findByPk(id);

  if (!user){
    return res.status(404).json({ message: "user tidak ditemukan"});
  }

  await user.update({
    name,
    email
  });
  
  return res.json(user);
} catch (error) {
  return res.status(500).json({ message: error.message });
}
}
 
 
