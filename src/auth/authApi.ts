import { z } from 'zod';
import { http } from '@/src/api/http';

// TODO: Confirm exact backend endpoints + response shapes.

const LoginResponseSchema = z.object({
  accessToken: z.string(),
});

export async function loginWithEmailPassword(input: {
  email: string;
  password: string;
}): Promise<{ accessToken: string }> {
  const res = await http.post('/auth/login', input);
  return LoginResponseSchema.parse(res.data);
}
