import { z } from 'zod';

export const userSchema = z
	.object({
		id: z.string().optional(),
		name: z.string().min(1),
		email: z.string().email()
	})
	.strip();

export type User = z.infer<typeof userSchema>;
