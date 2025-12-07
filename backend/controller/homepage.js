const express = require('express');
const router = express.Router();


router.get('/user', (req, res) => {
    const token = req.cookies?.token;

    if (!token) {
      console.log('nema')
        return res.status(401).json({ error: 'Nema tokena' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log('Decoded token:', decoded);

        return res.json({
            user: {
                id: decoded.userId,
                email: decoded.email,
                name: decoded.name,
                surname: decoded.surname
            }
        });

    } catch (error) {
        return res.status(401).json({ error: 'Neispravan token' });
    }
});

module.exports = router;