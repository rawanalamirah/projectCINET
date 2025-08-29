require('dotenv').config();
const bcrypt = require('bcrypt');
const {Pool} = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const rounds = Number(process.env.BCRYOT_ROUNDS || 10);

(async () => {
    try{
        const hash = await bcrypt.hash('manager123', rounds);
        await pool.query(
            `INSERT INTO users (username, password_hash, role) Values ($1, $2, $3) ON CONFLICT (username) DO NOTHING`, 
            ['manager', hash, 'branch_manager']
        );
        console.log('seeded user: manager / manager123');
    } catch (e) {
        console.error('seed failed', e);
        process.exit(1);
    } finally {
        await pool.end();
    }

    })();