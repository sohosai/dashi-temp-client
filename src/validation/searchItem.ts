import { z } from 'zod';

type SearchItem = {
  id: number;
  visible_id: string;
  name: string;
  connector: string[];
  is_rent: boolean;
  color: string;
};

export type SearchItems = {
  search_items: SearchItem[];
};

const searchItemSchema = z.object({
  keywords: z.string().min(1, { message: 'キーワードは、1文字以上入れてください。' }),
});

export { searchItemSchema };
export type SearchItemSchemaType = z.infer<typeof searchItemSchema>;
