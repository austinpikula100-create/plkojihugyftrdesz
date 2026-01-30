import { z } from 'zod';
import { apps, messages, documents } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  apps: {
    list: {
      method: 'GET' as const,
      path: '/api/apps',
      responses: {
        200: z.array(z.custom<typeof apps.$inferSelect>()),
      },
    },
  },
  ai: {
    chat: {
      method: 'POST' as const,
      path: '/api/ai/chat',
      input: z.object({ message: z.string() }),
      responses: {
        200: z.object({ response: z.string() }),
        400: errorSchemas.validation,
      },
    },
    messages: {
      list: {
        method: 'GET' as const,
        path: '/api/ai/messages',
        responses: {
          200: z.array(z.custom<typeof messages.$inferSelect>()),
        },
      },
    },
  },
  docs: {
    list: {
      method: 'GET' as const,
      path: '/api/docs',
      responses: {
        200: z.array(z.custom<typeof documents.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/docs/:id',
      responses: {
        200: z.custom<typeof documents.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/docs',
      input: z.object({ title: z.string().optional(), content: z.string().optional() }),
      responses: {
        201: z.custom<typeof documents.$inferSelect>(),
      },
    },
    update: {
      method: 'PATCH' as const,
      path: '/api/docs/:id',
      input: z.object({ title: z.string().optional(), content: z.string().optional() }),
      responses: {
        200: z.custom<typeof documents.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
