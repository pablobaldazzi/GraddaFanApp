import { z } from 'zod';
import { http } from '@/src/api/http';

export const ClubSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  // theme fields may exist; we only require the basics for auth.
});

export async function fetchClubBySlug(slug: string) {
  const res = await http.get(`/public/clubs/${slug}`);
  return ClubSchema.parse(res.data);
}
