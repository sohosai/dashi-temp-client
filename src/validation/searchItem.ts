import { z } from 'zod';

const searchItemSchema = z.object({
  keywords: z.string().min(1, { message: 'キーワードは、1文字以上入れてください。' }),
});

export { searchItemSchema };
export type SearchItemSchemaType = z.infer<typeof searchItemSchema>;
