import { useForm } from "react-hook-form"
import type { AttendanceFormSchema, FormAttendanceProps } from "./types"
import { attendanceFormSchema } from "./schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { LoaderCircle } from "lucide-react"



export function FormAttendance({ onOpenChange, editMode } : FormAttendanceProps) {
    const [loading, setLoading] = useState(false)

    const form = useForm<AttendanceFormSchema>({
        resolver: zodResolver(attendanceFormSchema),
        defaultValues: {
            name: "",
            phone: "",
            address: "",
            symptoms: "",
            status: null,
        }
    })

    const onSubmit = (data: AttendanceFormSchema) => {
        try {
            setLoading(true)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField 
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                                <Input placeholder="Nome" {...field}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField 
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Telefone</FormLabel>
                            <FormControl>
                                <Input placeholder="Telefone" {...field}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField 
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Endereço</FormLabel>
                            <FormControl>
                                <Input placeholder="Endereço" {...field}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField 
                    control={form.control}
                    name="symptoms"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Sintomas</FormLabel>
                            <FormControl>
                                <Input 
                                    placeholder="Sintomas" 
                                    {...field} 
                                    value={field.value || ''}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {editMode && (
                     <FormField 
                     control={form.control}
                     name="status"
                     render={({ field }) => (
                         <FormItem>
                             <FormLabel>Status</FormLabel>
                             <Select 
                                 onValueChange={field.onChange} 
                                 defaultValue={field.value || undefined}
                             >
                                 <FormControl>
                                     <SelectTrigger>
                                         <SelectValue placeholder="Selecione um status" />
                                     </SelectTrigger>
                                 </FormControl>
                                 <SelectContent>
                                     <SelectItem value="pending">Pendente</SelectItem>
                                     <SelectItem value="in_progress">Em andamento</SelectItem>
                                     <SelectItem value="completed">Concluído</SelectItem>
                                     <SelectItem value="cancelled">Cancelado</SelectItem>
                                 </SelectContent>
                             </Select>
                             <FormMessage />
                         </FormItem>
                     )}
                 />
                )}
               

                <div className="flex justify-end gap-2">
                    <Button
                        type="button"
                        variant="destructive"
                        className="cursor-pointer"
                        onClick={() => onOpenChange(false)}
                        disabled={loading}
                    >
                        Cancelar
                    </Button>

                    <Button
                        type="submit"
                        className="bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <LoaderCircle className="animate-spin"/>
                                <span className="ml-2">Salvando...</span>
                            </>
                        ) : (
                            "Salvar Atendimento"
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    )
}