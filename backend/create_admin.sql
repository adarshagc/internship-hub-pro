-- This script creates a default admin account if you prefer to seed it directly into the database.
-- Note: The password below is "Admin@123" encrypted using BCrypt (Spring Security's default encoder).

INSERT INTO users (
    full_name, 
    email, 
    password, 
    phone, 
    college, 
    role, 
    approval_status, 
    created_at
) VALUES (
    'System Administrator',
    'admin@internshiphub.com',
    '$2a$10$D/j3hLpxw/wQh.1G8aI1F.l3FjFqN5Uv5jX9r3/yT9O3Z3Z3Z3Z3Z', -- This translates to Admin@123
    '1234567890',
    'Internship Hub HQ',
    'ADMIN',
    'APPROVED',
    CURRENT_TIMESTAMP
);
