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

export async function getUser(req, res){
  try {
    const users = await User.findAll();

    return res.json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message});
  }
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

export async function deleteUser(req, res){
  try {
    const {id} = req.params;

    const user = await User.findByPk(id);

    if(!user){
      return res.status(404).json({message: "user tidak ditemukan"});
    }

    await user.destroy();
    return res.json({ message: "user berhasil dihapus"});
  } catch (erroro) {
    return res.status(500).json({ message: error.message});
  } 
}
 
 
