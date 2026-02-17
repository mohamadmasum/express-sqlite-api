export function validatedData(req, res, next){
  if (!req.body) {
    return res.status(400).json({
      message: "Request body kosong atau tidak valid JSON",
    });
  }
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      message: "name dan email wajib di isi",
    });
  }
  
  next();
};