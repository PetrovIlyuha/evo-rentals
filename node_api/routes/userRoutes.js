import express from 'express';
const router = express.Router();

router.post('login', (req, res) => {
  console.log(req.body);
  res.json({ message: 'About to login' });
});

router.post('register', (req, res) => {
  console.log(req.body);
  res.json({ message: 'Register endpoint' });
});

export default router;
