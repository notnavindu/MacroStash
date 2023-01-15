import { z } from 'zod';

const LOG_LEVELS = ['debug', 'info', 'warn', 'error'] as const;

export const eventSchema = z
	.object({
		id: z.string().optional(),
		message: z.string(),
		level: z.enum(LOG_LEVELS),
		timestamp: z.date().optional()
	})
	.strip();

export type Event = z.infer<typeof eventSchema>;
