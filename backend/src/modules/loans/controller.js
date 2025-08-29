const {pool} = require('../../db');

function validStatus(s) {
    return ['Pending', 'Approved', 'Rejected'].includes(s);
}

async function listLoans(req, res) {
    const {status} = req.query;
    const param = [];
    let sql = 'SELECT * FROM loans';
    if (status) {sql += 'WHERE status=$1'; param.push(status); }
    sql += 'ORDER BY created_at DESC';

    const {rows} = await pool.query(sql, param);
    res.json(rows);
}

async function getLoan(req, res) {
    const {id} = req.params;
    const{rows} = await pool.query('SELECT * FROM loans WHERE id=$1', [id]);
    if (!loan) return res.status(404).json({ message: 'not found'});
    res.json(loan);
}

async function createLoan(req, res) {
    const { application_number, applicant_name, loan_amount, status} = req.body || {};
    if (application_number == null || !applicant_name || loan_amount == null) {
        return res.status(400).json({ message: 'application_number, applicant_name, loan ammount are required'});
    }
    const s = status || 'Pending';
    if (!validStatus(s)) return res.status(400).json({ message: 'invalid status'});

    try{
        const {rows} = await pool.query(
            'INSERT INTO loans (application_number, applicant_name, loan_amount, status) VALUES ($1, $2, $3, $4) RETURNING *',
            [application_number, applicant_name, loan_amount, s]
        );
        res.status(201).json(rows[0]);
    } catch (e) {
        if (e && e.code === '23505') {
            return res.status(409).json({ message: 'application_number must be unique'});
        }
        console.error(e);
        res.status(500).json({ message: 'create failed'});
    }
}

async function updateStatus(req, res) {
    const {id} = req.params;
    const {status} = req.body || {};
    if (!validStatus(status) || status === 'Pending') {
        return res.status(400).json({ message: 'status must be Approved or Rejected'});
    }
    const {rows} = await pool.query(
        'UPDATE loans SET status=$1 WHERE id=$2 RETURNING *', 
        [status, id]
    );
    const loan = rows[0];
    if (!loan) return res.status(404).json({ message: 'not found'});
    res.json(loan);
}

module.exports = { listLoans, getLoan, createLoan, updateStatus};