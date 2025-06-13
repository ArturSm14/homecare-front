import { z } from "zod"

export const attendanceFormSchema = z.object({
    name: z.string().min(1, { message: "Nome é Obrigatório" }),
    phone: z.string().min(1, { message: "Telefone é Obrigatório" }),
    address: z.string().min(1, { message: "Endereço é Obrigatório" }),
    symptoms: z.string().nullable(),
    status: z.string().nullable(),
})