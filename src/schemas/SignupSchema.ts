import {z} from 'zod';

export const usernamevalidation=z
.string()
.min(3,'Username must be at least 3 characters long')
.max(20,'must be no more then 20 char')
.regex(/^[a-zA-Z0-9_]+$/,'Username can only contain letters, numbers, and underscores')
.trim();