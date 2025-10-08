import { ArrowLeft, Mail, Phone, MapPin, User } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function PerfilPaciente() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6">
      {/* Container Principal */}
      <div className="w-full max-w-3xl bg-card overflow-hidden  border-border flex flex-col gap-5 rounded-lg">

        {/* Header */}
        <div className="rounded-lg">
            <div className="relative bg-[#b8a5f3] h-32 ">
              <button className="absolute left-4 top-4 text-black hover:opacity-70">
                <ArrowLeft size={22} />
              </button>
            </div>
            {/* Bloco com Avatar e Nome */}
            <div className="bg-muted flex items-center p-6 rounded-b-lg gap-2">
            <Avatar className="bg-accent size-30 -top-16">
                        <AvatarImage src="/assets/fiohomem.png" alt="@fio" />
                        <AvatarFallback>F</AvatarFallback>
                    </Avatar>
              <div className="flex flex-col mb-18">
                <h2 className="text-xl font">Cauã Rodrigues dos Santos</h2>
                <p className="text-muted-foreground text-sm">
                  Paciente <span className="mx-2">|</span> Desde 2020
                </p>
              </div>
              <p className="ml-auto text-xs text-muted-foreground">
                diagnosticado por<br />Gustavo B.
              </p>
            </div>
        </div>

        {/* Informações */}
        <div className="bg-muted/50 p-6 rounded-lg">
          <h3 className="font-bold text-md mb-4">Informações</h3>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <User size={16} />
              <p className="font-semibold w-48">Nome</p>
              <p>Cauã Rodrigues dos Santos</p>
            </div>

            <div className="flex items-center gap-2">
              <Mail size={16} />
              <p className="font-semibold w-48">Email</p>
              <p>cauathegoat@gmail.com</p>
            </div>

            <div className="flex items-center gap-2">
              <Phone size={16} />
              <p className="font-semibold w-48">Telefone</p>
              <p>(10) 98765-4321</p>
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <p className="font-semibold w-48">Endereço</p>
              <p>Rua Peepers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}