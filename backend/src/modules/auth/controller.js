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
        console.log('[LOGIN] body:', req.body);  // debug

        const {rows} =  await pool.query(`SELECT * FROM users WHERE username=$1`, [username]);
        const user = rows[0];

        console.log('[LOGIN] user:', user ? { id: user.id, role: user.role, hasHash: !!user.password_hash } : 'NOT FOUND');

        if (!user) return res.status(401).json({ message: 'invalid credentials'});
        if (!user.password_hash) {
            console.error('[LOGIN] password_hash missing');
            return res.status(500).json({ message: 'login failed here?' });
        }
        const ok = await bcrypt.compare(password, user.password_hash);
        if (!ok) return res.status(401).json({ message: 'invalid credentials'});

        if (user.role !== 'branch_manager') {
            return res.status(403).json({ message: 'forbidden: not a branch manager'});
        }

        const token = jwt.sign(
            { sub: user.id, role: user.role, username: user.username },
            jwtSecret,
            {expiresIn: '8h'}
        );

        res.json({token});
    } catch (e) {
    console.error('LOGIN ERROR:', e); 
    res.status(500).json({ message: 'login failed here i think' });
  }
}

module.exports = {login};