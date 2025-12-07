const express = require('express');
const router = express.Router();

// Importujte sql na vrhu fajla
const sql = require('../database');
const JWT_SECRET = process.env.JWT_SECRET || 'tvoj_super_tajni_kljuc';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// Ruta za provjeru baze - KORISTITE TAGGED TEMPLATE
router.post('/register', async (req, res) => {
    console.log('Primljen zahtjev za registraciju:', req.body);
  try {
    const formData = req.body;
      console.log('Registracijski podaci primljeni:', formData);
     const existingUser=await sql`SELECT id FROM users WHERE email=${formData.email}`;
        if (existingUser.length > 0) {
          return res.status(400).json({ error: 'Korisnik s ovim emailom već postoji' })  
          }
            const haspas=await bcrypt.hash(formData.password,12);
           const newuser=await sql`INSERT INTO users (name, surname, email, password,user_type) VALUES (${formData.firstName}, ${formData.lastName}, ${formData.email}, ${haspas}, ${formData.user_type}) returning id, email,name, surname`;
              const token=jwt.sign(
                {userId:newuser[0].id, 
                email:newuser[0].email,
                name:newuser[0].name,  
                surname:newuser[0].surname},
                JWT_SECRET,
                {expiresIn:'1h'}
              );

              res.cookie('token', token, {
                httpOnly:true,
                secure:process.env.NODE_ENV==='production',
                maxAge:3600000 
              });
              console.log('Korisnik uspješno registrovan:', newuser[0]);
              res.json({message:'Registracija uspješna!', token});
              
    
    } catch (error) {
    console.error('❌ GREŠKA U BAZI:', error.message);
    res.status(500).json({
      status: "error",
      error: "Greška pri spajanju na bazu",
    });
}
});

module.exports = router;