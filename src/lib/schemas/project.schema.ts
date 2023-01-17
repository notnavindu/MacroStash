import { z } from 'zod';

export const projectSchema = z
	.object({
		id: z.string().optional(),
		name: z.string().min(1).max(30),
		allowedDomains: z.array(z.string().url().or(z.literal('*'))),
		createdAt: z.date().optional()
	})
	.strip();

export type Project = z.infer<typeof projectSchema>;
