import { z } from 'zod';
import { http } from '@/src/api/http';

// GRADA backend (fan auth): POST /public/fans/login-password
const FanLoginResponseSchema = z.object({
  accessToken: z.string(),
  fan: z.object({
    id: z.string(),
    email: z.string().email(),
    name: z.string().nullable().optional(),
    firstName: z.string().nullable().optional(),
    lastName: z.string().nullable().optional(),
    phone: z.string().nullable().optional(),
    clubId: z.string(),
    clubName: z.string().optional(),
    clubSlug: z.string().optional(),
  }),
});

export async function fanLoginWithEmailPassword(input: {
  clubId: string;
  email: string;
  password: string;
}): Promise<z.infer<typeof FanLoginResponseSchema>> {
  const res = await http.post('/public/fans/login-password', input);
  return FanLoginResponseSchema.parse(res.data);
}
