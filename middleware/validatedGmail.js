export function validatedGmail(req, res, next) {
  let email = req.body.email;

  if (typeof email !== 'string') {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  email = email.trim().toLowerCase();

  if (email.slice(-10) !== '@gmail.com') {
    return res.status(400).json({
      message: 'Email must be a Gmail address'
    });
  }

  next();
}