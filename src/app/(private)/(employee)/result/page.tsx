"use client"

import { useEffect, useState } from "react"

export default function PerfilPsicologico() {
    const [perfil, setPerfil] = useState(null)
    const [showDetalhes, setShowDetalhes] = useState(false)

    useEffect(() => {
        const result = localStorage.getItem("perfilIA")
        if (!result) return

        try {
            // tenta pegar JSON puro mesmo se vier com texto antes/depois
            const jsonMatch = result.match(/\{[\s\S]*\}/)
            const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(result)
            setPerfil(parsed)
        } catch (err) {
            console.error("Erro ao ler perfil:", err)
            setPerfil(result) // fallback pra string bruta
        }
    }, [])

    if (!perfil) return <div className="text-center mt-20">Perfil não disponível.</div>

    // caso venha texto simples (não JSON)
    if (typeof perfil === "string") {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[#f7f7fb]">
                <div className="w-full max-w-2xl rounded-[16px] shadow bg-white overflow-hidden">
                    <div className="bg-[#b9a7e6] h-24 w-full"></div>
                    <div className="flex items-center gap-6 -mt-12 mb-4 px-6">
                        <img src="/avatar.png" alt="Avatar" className="w-20 h-20 rounded-full border bg-white" />
                        <div>
                            <h2 className="text-xl font-bold">Colaborador</h2>
                            <div className="text-[#6c6c6c] text-sm">Análise psicológica</div>
                        </div>
                    </div>
                    <div className="bg-[#ece9fa] rounded-lg p-6 m-6 text-center">
                        <div className="font-semibold mb-2 text-lg">Descrição do Perfil</div>
                        <pre className="text-base whitespace-pre-wrap text-left">{perfil}</pre>
                    </div>
                </div>
            </div>
        )
    }

    // Lista de possíveis perfis
    const opcoes = [
        "Engajado",
        "Motivado, mas sobrecarregado",
        "Resiliente em construção",
        "Estressado",
        "Burnout",
        "Desmotivado/Desengajado",
        "Equilibrado",
        "Ansioso no trabalho",
        "Confiante/Autônomo"
    ]

    // Extrai o nome principal do diagnóstico (tipo do perfil)
    const diagnosticoTexto = perfil.diagnostico?.toLowerCase() || ""
    const palavraPrincipal =
        opcoes.find(p => diagnosticoTexto.includes(p.toLowerCase().split(",")[0])) || "Perfil"

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[#f7f7fb]">
            <div className="w-full max-w-2xl rounded-[16px] shadow bg-white overflow-hidden">
                <div className="bg-[#b9a7e6] h-24 w-full"></div>
        
                <div className="flex items-center gap-6 -mt-12 mb-4 px-6">
                    <img src="/avatar.png" alt="Avatar" className="w-20 h-20 rounded-full border bg-white" />
                    <div>
                        <h2 className="text-xl font-bold">{perfil.nome || "Colaborador"}</h2>
                        <div className="text-[#6c6c6c] text-sm">
                            Paciente <span className="mx-1">|</span> Desde {perfil.desde || "—"}
                        </div>
                    </div>
                    {perfil.diagnosticadoPor && (
                        <div className="ml-auto text-right text-xs text-[#6c6c6c]">
                            diagnosticado por<br />{perfil.diagnosticadoPor}
                        </div>
                    )}
                </div>

                {/* Tipo de perfil (dinâmico) */}
                <div className="flex flex-col items-center mb-6">
                    <span className="text-2xl font-bold text-[#222] bg-[#ece9fa] px-4 py-2 rounded-lg">
                        {palavraPrincipal}
                    </span>
                    <button
                        className="mt-3 px-5 py-2 bg-[#b9a7e6] text-white rounded-lg font-semibold hover:bg-[#a18ad6] transition"
                        onClick={() => setShowDetalhes(!showDetalhes)}
                    >
                        {showDetalhes ? "Ocultar detalhes" : "Saber mais"}
                    </button>
                </div>

                {/* Diagnóstico completo (oculto até clicar) */}
                {showDetalhes && (
                    <div className="bg-[#ece9fa] rounded-lg p-6 mb-6 mx-6 text-center">
                        <div className="font-semibold mb-2 text-lg">Descrição do Perfil</div>
                        <div className="text-base whitespace-pre-wrap">{perfil.diagnostico}</div>
                    </div>
                )}

                {/* Informações adicionais */}
                <div className="bg-[#f7f7fb] rounded-lg p-6 mx-6 mb-6">
                    <div className="font-semibold mb-4 text-lg">Informações</div>
                    <div className="grid grid-cols-2 gap-2 items-center text-sm">
                        <div className="text-[#6c6c6c]">👤 Nome</div>
                        <div className="font-semibold">{perfil.nome || "—"}</div>
                        <div className="text-[#6c6c6c]">✉️ Email</div>
                        <div className="font-semibold">{perfil.email || "—"}</div>
                        <div className="text-[#6c6c6c]">📞 Telefone</div>
                        <div className="font-semibold">{perfil.telefone || "—"}</div>
                        <div className="text-[#6c6c6c]">🏠 Endereço</div>
                        <div className="font-semibold">{perfil.endereco || "—"}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
