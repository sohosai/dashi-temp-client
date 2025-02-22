import { z } from 'zod';

const generateSchema = z.object({
  quantity: z.coerce.number().refine((quantity) => quantity <= 49 && quantity >= 1 && Number.isInteger(quantity), {
    message: `1個から49個までの間で生成する数を指定してください。`,
  }),
  record: z.enum(['Qr', 'Barcode', 'Nothing']),
});

export { generateSchema };
export type GenerateSchemaType = z.infer<typeof generateSchema>;
