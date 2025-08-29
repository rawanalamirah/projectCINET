const {pool} = require('../../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../../config');

async function login(req, res) {
    const {username, password} = req.body || {};
    if (!username || !password) {
        return res.status(400).json({ message: 'username and password are required'});
    }

    try {
        const {rows} =  await pool.query('SELECT * FROM useres WHERE username=$1', [username]);
        const user = rows[0];
        if (!user) return res.status(401).json({ message: 'invalid credentials'});

        const ok = await bcrypt.compare(password, user.passwrd_hash);
        if (!ok) return res.status(401).json({ message: 'invalid credentials'});

        if (user.role !== 'branch manager') {
            return res.status(403).json({ message: 'forbidden: not a branch manager'});
        }

        const token = jwt.sign(
            { sub: user.id, role: user.role, username: user.username },
            jwtSecret,
            {expiresIn: '8h'}
        );

        res.json({token});
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'login failed'});
    }
}

module.exports = {login};