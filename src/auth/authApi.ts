import { z } from 'zod';
import { http } from '@/src/api/http';

// GRADA backend: POST /auth/login
const LoginResponseSchema = z.object({
  accessToken: z.string(),
  user: z.object({
    id: z.string(),
    email: z.string().email(),
    name: z.string().nullable(),
    clubId: z.string(),
    clubName: z.string(),
    clubSlug: z.string(),
  }),
});

export async function loginWithEmailPassword(input: {
  email: string;
  password: string;
}): Promise<z.infer<typeof LoginResponseSchema>> {
  const res = await http.post('/auth/login', input);
  return LoginResponseSchema.parse(res.data);
}
