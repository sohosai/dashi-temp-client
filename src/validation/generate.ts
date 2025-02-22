import { z } from 'zod';

const generateSchema = z.object({
  quantity: z.number().int().min(1, { message: '数量は、1以上の整数を入れてください。' }),
  record: z.enum(['Qr', 'Barcode', 'Nothing']),
});

export { generateSchema };
export type GenerateSchemaType = z.infer<typeof generateSchema>;
