import { z } from 'zod';

export const LOG_LEVELS = ['debug', 'info', 'warn', 'error'] as const;

export const eventSchema = z
	.object({
		id: z.string().optional(),
		message: z.string(),
		level: z.enum(LOG_LEVELS),
		timestamp: z.any().optional(),
		projectId: z.string()
	})
	.strip();

export type Event = z.infer<typeof eventSchema>;
