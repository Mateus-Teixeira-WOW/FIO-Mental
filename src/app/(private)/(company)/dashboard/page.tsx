import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { House } from "lucide-react"; // ← import do ícone

export default function Dashboard() {
  return (
    <div className="content-grid min-h-screen flex flex-col items-center justify-start p-8 bg-background text-foreground font-sans">
      {/* Header */}
      <div className="w-full max-w-5xl flex justify-between items-center mb-8">
        <span className="text-lg font-semibold flex items-center gap-2">
          <House className="w-5 h-5 text-primary" /> Início
        </span>

        <div className="flex items-center gap-3 bg-card rounded-xl px-5 py-3 shadow-sm border">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/assets/fiamulher.png" alt="Avatar" />
            <AvatarFallback>F</AvatarFallback>
          </Avatar>

          <div className="flex flex-col justify-center ml-2">
            <div className="font-semibold flex items-center gap-1">
              Cauane R. <span className="text-xs">✏️</span>
            </div>
            <div className="text-xs text-muted-foreground">Psicóloga</div>
          </div>

          {/* Botão de Logout com href */}
          <Button
            asChild
            variant="ghost"
            className="text-muted-foreground text-sm ml-4 hover:text-destructive"
          >
            <Link href="/">← Logout</Link>
          </Button>
        </div>
      </div>

      {/* Card principal */}
      <div className="w-full max-w-5xl bg-card rounded-2xl border border-border p-8 shadow">
        <div className="border-b border-border flex items-center gap-4 pb-4 mb-8">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/assets/fiamulher.png" alt="@fio" />
            <AvatarFallback>F</AvatarFallback>
          </Avatar>

          <div className="flex flex-col justify-center">
            <div className="font-bold">Cauane Rodrigues dos Santos</div>
            <div className="text-sm text-muted-foreground">Psicóloga</div>
          </div>
        </div>

        <h2 className="text-2xl text-center font-bold mb-10 leading-snug">
          Olá Cauane,
          <br />
          O que você quer fazer?
        </h2>

        {/* Três blocos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Relatórios */}
          <div className="bg-card rounded-2xl border border-border p-6 text-center shadow-sm hover:shadow-md transition flex flex-col items-center">
            <img
              src="/assets/image 3.png"
              alt="Relatórios"
              className="h-32 object-contain mb-4"
            />
            <div className="text-lg font-bold mb-2">Relatórios</div>
            <div className="text-sm text-muted-foreground mb-6">
              Veja seus relatórios detalhados de consultas e diagnósticos.
            </div>
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground w-full rounded-lg">
              <Link href="/employees-relatories">Abrir Relatórios</Link>
            </Button>
          </div>

          {/* Agendamentos */}
          <div className="bg-card/10 rounded-2xl border border-border p-6 text-center shadow-sm hover:shadow-md transition flex flex-col items-center">
            <img
              src="/assets/image 6.png"
              alt="Agendamentos"
              className="h-32 object-contain mb-4"
            />
            <div className="text-lg font-bold mb-2">Agendamentos</div>
            <div className="text-sm text-muted-foreground mb-6">
              Consulte, edite ou crie novos agendamentos de consulta.
            </div>
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground w-full rounded-lg">
              <Link href="/agendamentos">Ver Agendamentos</Link>
            </Button>
          </div>

          {/* Ver PerFIO */}
          <div className="bg-card rounded-2xl border border-border p-6 text-center shadow-sm hover:shadow-md transition flex flex-col items-center">
            <img
              src="/assets/image 5.png"
              alt="Ver PerFIO"
              className="h-32 object-contain mb-4"
            />
            <div className="text-lg font-bold mb-2">Ver PerFIO</div>
            <div className="text-sm text-muted-foreground mb-6">
              Acesse seu perfil no sistema FIO e atualize seus dados.
            </div>
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground w-full rounded-lg">
              <Link href="/perfil">Abrir PerFIO</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}