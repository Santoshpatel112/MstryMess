import {z} from 'zod';

export const usernamevalidation=z
.string()
.min(3,'Username must be at least 3 characters long')
.max(20,'must be no more then 20 char')
.regex(/^[a-zA-Z0-9_]+$/,'Username can only contain letters, numbers, and underscores')
.trim();

export const SignUpSchema=z.object({
    username:usernamevalidation,
    email:z.string().email({message:'Invalid email address'}).max(100,'Email must be no more than 100 characters long').trim(),
    password:z.string().min(6,'Password must be at least 6 characters long').max(100,'Password must be no more than 100 characters long'),
    
})

