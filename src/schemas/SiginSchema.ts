import {z} from 'zod';

export const SigninSchema = z.object({
  identifier:z.string(),
  password:z.string().min(6,'Password must be at least 6 characters long').max(100,'Password must be no more than 100 characters long'),
  
});