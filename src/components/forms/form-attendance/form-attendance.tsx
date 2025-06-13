import { useForm } from "react-hook-form";
import type { AttendanceFormSchema, FormAttendanceProps } from "./types";
import { attendanceFormSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import {
  ChartNoAxesColumn,
  Check,
  ChevronsUpDown,
  FileMinus,
  LoaderCircle,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { statusOptions } from "@/utils/const/statusOptions";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { api } from "@/api";
import { toast } from "sonner";

export function FormAttendance({
  onOpenChange,
  editMode,
  attendance,
  onSuccess,
}: FormAttendanceProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm<AttendanceFormSchema>({
    resolver: zodResolver(attendanceFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      symptoms: "",
      status: null,
    },
  });

  useEffect(() => {
    if (editMode && attendance) {
      form.reset({
        name: attendance.name,
        phone: attendance.phone,
        address: attendance.address,
        symptoms: attendance.symptoms,
        status: attendance.status,
      });
    }
  }, [editMode, attendance, form]);

  const onSubmit = async (data: AttendanceFormSchema) => {
    try {
      setLoading(true);
      if(editMode && attendance) {
        const res = await api.attendance.update(attendance.id.toString(), data);

        if(!res) {
          setLoading(false);
          toast.error("Erro ao atualizar atendimento. Tente novamente.");
          return;
        }
        toast.success("Atendimento atualizado com sucesso!");
        
        if (onSuccess) {
          await onSuccess();
        }
        
        onOpenChange(false);
      } else {
        const res = await api.attendance.create(data);
        
        if(!res) {
          setLoading(false);
          toast.error("Erro ao criar atendimento. Tente novamente.");
          return;
        }
        toast.success("Atendimento criado com sucesso!");
        
        if (onSuccess) {
          await onSuccess();
        }
        
        onOpenChange(false);
      }
      
    } catch (error) {
      console.error("Erro ao salvar atendimento:", error);
      toast.error("Erro ao salvar atendimento. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <User size={15} />
                Nome
              </FormLabel>
              <FormControl>
                <Input placeholder="Nome" {...field} />
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
              <FormLabel className="flex items-center gap-2">
                <Phone size={15} />
                Telefone
              </FormLabel>
              <FormControl>
                <Input placeholder="Telefone" {...field} />
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
              <FormLabel className="flex items-center gap-2">
                <MapPin size={15} />
                Endereço Completo
              </FormLabel>
              <FormControl>
                <Input placeholder="Endereço" {...field} />
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
              <FormLabel className="flex items-center gap-2">
                <FileMinus size={15} />
                Sintomas
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Sintomas"
                  {...field}
                  value={field.value || ""}
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
              <FormItem className="flex flex-col">
                <FormLabel className="flex items-center gap-2">
                  <ChartNoAxesColumn size={15} />
                  Status
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? statusOptions.find(
                              (statusOption) =>
                                statusOption.value === field.value
                            )?.label
                          : "Selecione o Status"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search language..." />
                      <CommandList>
                        <CommandEmpty>No language found.</CommandEmpty>
                        <CommandGroup>
                          {statusOptions.map((statusOption) => (
                            <CommandItem
                              value={statusOption.label}
                              key={statusOption.value}
                              onSelect={() => {
                                form.setValue(
                                  "status",
                                  statusOption.value
                                );
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  statusOption.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {statusOption.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
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
                <LoaderCircle className="animate-spin" />
                <span className="ml-2">Salvando...</span>
              </>
            ) : (
                <span>
                    {editMode? "Editar Atendimento" : "Criar Atendimento"}
                </span>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
