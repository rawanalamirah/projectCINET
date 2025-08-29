INSERT INTO loans (application_number, applicant_name, loan_amount, status) VALUES
    (1001, 'Munira Amer', 10000, 'Pending'),
    (1002, 'Nawaf Nasser', 11500, 'Approved'),
    (1003, 'Nora Ahmad', 8000, 'Rejected')
ON CONFLICT DO NOTHING;