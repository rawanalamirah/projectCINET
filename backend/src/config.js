require('dotenv').config();

module.exports = {
    port: Number(process.env.PORT || 4000),
    dbUrl: process.env.DATABASE_URL || '',
    jwtSecret: process.env.JWT_Secret || 'dev',
    bcryptRounds: Number(process.env.BCRYPT_ROUNDS || 10)
};