require('dotenv').config();
const bcrypt = require('bcrypt');
const {Pool} = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const rounds = Number(process.env.BCRYPT_ROUNDS || 10);

(async () => {
    try{
        const hash = await bcrypt.hash('manager123', rounds);
        await pool.query(
            `INSERT INTO users (username, password_hash, role) \n
             Values ($1, $2, $3) \n
             ON CONFLICT (username) DO UPDATE \n
                SET password_hash = EXCLUDED.password_hash,\n
                    role = EXCLUDED.role`, 
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