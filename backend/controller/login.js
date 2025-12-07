const express = require('express');
const router = express.Router();

// Importujte sql na vrhu fajla
const sql = require('../database');
const JWT_SECRET = process.env.JWT_SECRET || 'tvoj_super_tajni_kljuc';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.post('/login', async (req, res) => {
  try {
    const formData = req.body;
    console.log('Login podaci primljeni:', formData);
    const user = await sql`SELECT * FROM users WHERE email=${formData.email}`;
    if (user.length === 0) {
      return res.status(400).json({ error: 'Korisnik s ovim emailom ne postoji' });
    }
    const validPassword = await bcrypt.compare(formData.password, user[0].password);
    if (!validPassword) {
        return res.status(400).json({ error: 'Pogrešna lozinka' });
    }
    const token = jwt.sign(
      {
        userId: user[0].id, 
        email: user[0].email,
        name: user[0].name,
        surname: user[0].surname
        },
        JWT_SECRET, 
        { expiresIn: '1h' }
    );
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',    
    }); 
    res.json({ message: 'Prijava uspješna!', token });
    } catch (error) {
    console.error('❌ GREŠKA U BAZI:', error.message);
    res.status(500).json({
      status: "error",
      message: "Došlo je do greške prilikom prijave korisnika."
    });
  }
}); 

module.exports = router;