import { z } from 'zod';

export const projectSchema = z
	.object({
		id: z.string(),
		name: z.string().min(1).max(30),
		allowedDomains: z.array(z.string().or(z.literal('*'))),
		createdAt: z.date().optional().or(z.unknown())
	})
	.strip();

export type Project = z.infer<typeof projectSchema>;
