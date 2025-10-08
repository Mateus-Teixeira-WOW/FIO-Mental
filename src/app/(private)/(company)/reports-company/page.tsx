import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function EmployeesRelatoriesPage({
  searchParams,
}: {
  searchParams: { filtro?: string };
}) {
  const filtro = searchParams.filtro || "todos";

  const funcionarios = [
    {
      nome: "Cauã Rodrigues",
      telefone: "(10) 98765-4321",
      status: "respondido",
      data: "10 de Set, 2025",
    },
    {
      nome: "Flávio Henrique",
      telefone: "(11) 00000-0001",
      status: "aguardando",
      data: "10 de Set, 2025",
    },
    {
      nome: "Mateus Texeira",
      telefone: "(11) 99975-4337",
      status: "respondido",
      data: "11 de Set, 2025",
    },
    {
      nome: "Alexandre Salcines",
      telefone: "(11) 97061-2223",
      status: "aguardando",
      data: "10 de Set, 2025",
    },
    {
      nome: "Kevin Simões",
      telefone: "(11) 98821-7322",
      status: "aguardando",
      data: "10 de Set, 2025",
    },
  ];

  const filtrados =
    filtro === "todos"
      ? funcionarios
      : funcionarios.filter((f) => f.status === filtro);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex items-center mb-6">
        <Link href="/dash-company" className="text-2xl mr-3">
          ←
        </Link>
        <h1 className="text-2xl font-bold mx-auto">Relatórios do Questionário</h1>
      </div>
      <hr className="border-muted mb-6" />

      {/* Filtros */}
      <div className="flex justify-center gap-3 mb-6">
        <Link href="?filtro=todos">
          <Button
            variant={filtro === "todos" ? "default" : "outline"}
            className="px-4"
          >
            Todos
          </Button>
        </Link>
        <Link href="?filtro=respondido">
          <Button
            variant={filtro === "respondido" ? "default" : "outline"}
            className="px-4"
          >
            Respondidos
          </Button>
        </Link>
        <Link href="?filtro=aguardando">
          <Button
            variant={filtro === "aguardando" ? "default" : "outline"}
            className="px-4"
          >
            Aguardando
          </Button>
        </Link>
      </div>

      {/* Tabela */}
      <div className="bg-card rounded-lg shadow border overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted/40 text-foreground">
            <tr>
              <th className="p-3 font-medium">Funcionários</th>
              <th className="p-3 font-medium">Telefone</th>
              <th className="p-3 font-medium">Status</th>
              <th className="p-3 font-medium">Respostas</th>
              <th className="p-3 font-medium">Data de envio</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((f, i) => (
              <tr
                key={i}
                className="border-t hover:bg-muted/20 transition-colors"
              >
                <td className="p-3 font-semibold">{f.nome}</td>
                <td className="p-3 text-muted-foreground">{f.telefone}</td>
                <td className="p-3">
                  {f.status === "respondido" ? (
                    <span className="bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded">
                      Respondido
                    </span>
                  ) : (
                    <span className="bg-gray-200 text-gray-600 text-xs font-semibold px-3 py-1 rounded">
                      Aguardando...
                    </span>
                  )}
                </td>
                <td className="p-3">
                  <Button variant="outline" size="sm" className="text-xs">
                    Consultar
                  </Button>
                </td>
                <td className="p-3 text-muted-foreground">{f.data}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

