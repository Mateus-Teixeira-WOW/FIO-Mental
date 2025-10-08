"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function RefazerQuestionario() {
    const router = useRouter()
    const [form, setForm] = useState({
        estresse: "",
        motivoEstresse: "",
        equilibrio: "",
        reacaoProblema: "",
        espacoBemEstar: "",
        motivacao: "",
        desmotivacao: "",
        melhorHorario: "",
        foco: "",
        satisfacao: "",
        pedirAjuda: "",
        conflitos: "",
        ouvido: "",
        tipoColega: "",
        ambiente: "",
        habilidades: "",
        oportunidades: "",
        confianca: "",
        palavra: "",
        mudanca: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const prompt = `
Com base nas respostas abaixo, gere um perfil psicológico objetivo e simples, estruturado em JSON com os seguintes campos:
{
  "nome": "Nome do colaborador",
  "diagnostico": "Resumo psicológico",
  "email": "Email",
  "telefone": "Telefone",
  "endereco": "Endereço",
  "desde": "Ano de entrada",
  "diagnosticadoPor": "Nome do responsável"
}
Respostas:
Saúde Mental e Bem-Estar
- Nível de estresse: ${form.estresse}
- Motivo do estresse: ${form.motivoEstresse}
- Equilíbrio trabalho/vida: ${form.equilibrio}
- Primeira reação a problemas: ${form.reacaoProblema}
- Espaço para falar sobre bem-estar: ${form.espacoBemEstar}

Motivação e Produtividade
- Motivação: ${form.motivacao}
- Desmotivação: ${form.desmotivacao}
- Melhor horário: ${form.melhorHorario}
- Foco: ${form.foco}
- Satisfação/motivação: ${form.satisfacao}

Relacionamento e Trabalho em Equipe
- Pedir ajuda: ${form.pedirAjuda}
- Conflitos: ${form.conflitos}
- Ouvido/respeitado: ${form.ouvido}
- Tipo de colega/líder: ${form.tipoColega}
- Ambiente preferido: ${form.ambiente}

Desenvolvimento e Futuro
- Habilidades para desenvolver: ${form.habilidades}
- Oportunidades de crescimento: ${form.oportunidades}
- Confiança para novas responsabilidades: ${form.confianca}
- Palavra sobre relação com trabalho: ${form.palavra}
- Mudança para bem-estar: ${form.mudanca}

Gere um perfil psicologico com dentre as opcoes:
Engajado: Alta motivação, energia positiva, sente-se útil e reconhecido.
Motivado, mas sobrecarregado: Gosta do trabalho, mas apresenta sinais de excesso de demandas e possíveis riscos de estresse prolongado.
Resiliente em construção: Consegue lidar com pressões, mas precisa de apoio para manter equilíbrio emocional.
Estressado: Apresenta tensão frequente, dificuldade em relaxar e sinais de desgaste.
Burnout (risco ou sinais iniciais): Fadiga intensa, queda de motivação, sentimentos de exaustão e desconexão com o trabalho.
Desmotivado/Desengajado: Baixa energia, pouca conexão emocional com as atividades, risco de queda de performance.
Equilibrado: Nível saudável de estresse (eustresse), boa organização pessoal e clareza de objetivos.
Ansioso no trabalho: Expectativas elevadas, preocupação constante com resultados e autocobrança.
Confiante/Autônomo: Boa percepção de autoeficácia, consegue lidar com pressões de forma produtiva.
        `
        const res = await fetch("/api/gemini", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt }),
        })
        const data = await res.json()
        try {
            const perfil = JSON.parse(data.result)
            localStorage.setItem("perfilIA", JSON.stringify(perfil))
        } catch {
            localStorage.setItem("perfilIA", data.result)
        }
        router.push("/result")
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-start p-8 bg-accent text-foreground">
            <div className="w-full max-w-xl bg-card rounded-lg shadow p-8 mb-4">
                <h2 className="text-2xl font-bold mb-6 text-center bg-accent border border-accent-500 rounded-xl p-2">
                    Saúde Mental e Bem-Estar
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {[
                        { label: "Como você avaliaria seu nível atual de estresse no trabalho de 1 a 10?", name: "estresse", type: "number" },
                        { label: "O que mais costuma gerar estresse ou ansiedade no seu dia a dia profissional?", name: "motivoEstresse" },
                        { label: "Você sente que consegue equilibrar bem trabalho e vida pessoal?", name: "equilibrio" },
                        { label: "Quando enfrenta um problema no trabalho, qual costuma ser sua primeira reação?", name: "reacaoProblema" },
                        { label: "Você sente que tem espaço para falar sobre seu bem-estar com colegas ou líderes?", name: "espacoBemEstar" },
                    ].map((q, i) => (
                        <div key={i}>
                            <label className="font-semibold">{q.label}</label>
                            {q.type === "number" ? (
                                <input
                                    name={q.name}
                                    type="number"
                                    min={1}
                                    max={10}
                                    className="bg-primary-foreground mt-2 w-full border rounded px-3 py-2"
                                    required
                                    value={(form as any)[q.name]}
                                    onChange={handleChange}
                                />
                            ) : (
                                <textarea
                                    name={q.name}
                                    className="bg-primary-foreground mt-2 w-full border rounded px-3 py-2"
                                    required
                                    value={(form as any)[q.name]}
                                    onChange={handleChange}
                                />
                            )}
                        </div>
                    ))}

                    <h2 className="text-2xl font-bold mt-8 mb-6 text-center">Motivação e Produtividade</h2>
                    {[
                        { label: "O que mais te motiva a dar o seu melhor no trabalho?", name: "motivacao" },
                        { label: "O que mais desmotiva ou atrapalha sua produtividade?", name: "desmotivacao" },
                        { label: "Em quais momentos do dia você sente que trabalha melhor (manhã, tarde, noite)?", name: "melhorHorario" },
                        { label: "Você se considera mais focado em tarefas individuais ou colaborativas?", name: "foco" },
                        { label: "O que poderia aumentar sua satisfação e motivação no ambiente de trabalho?", name: "satisfacao" },
                    ].map((q, i) => (
                        <div key={i}>
                            <label className="font-semibold">{q.label}</label>
                            <textarea
                                name={q.name}
                                className="bg-primary-foreground mt-2 w-full border rounded px-3 py-2"
                                required
                                value={(form as any)[q.name]}
                                onChange={handleChange}
                            />
                        </div>
                    ))}

                    <h2 className="text-2xl font-bold mt-8 mb-6 text-center">Relacionamento e Trabalho em Equipe</h2>
                    {[
                        { label: "Você se sente confortável em pedir ajuda quando precisa?", name: "pedirAjuda" },
                        { label: "Como você lida com conflitos ou divergências no time?", name: "conflitos" },
                        { label: "O quanto você sente que é ouvido e respeitado nas reuniões ou discussões de equipe?", name: "ouvido" },
                        { label: "Qual é o tipo de colega ou líder que mais te ajuda a render melhor?", name: "tipoColega" },
                        { label: "Você prefere ambientes mais calmos e estruturados ou dinâmicos e cheios de interações?", name: "ambiente" },
                    ].map((q, i) => (
                        <div key={i}>
                            <label className="font-semibold">{q.label}</label>
                            <textarea
                                name={q.name}
                                className="bg-primary-foreground mt-2 w-full border rounded px-3 py-2"
                                required
                                value={(form as any)[q.name]}
                                onChange={handleChange}
                            />
                        </div>
                    ))}

                    <h2 className="text-2xl font-bold mt-8 mb-6 text-center">Desenvolvimento e Futuro</h2>
                    {[
                        { label: "Quais habilidades você gostaria de desenvolver nos próximos meses?", name: "habilidades" },
                        { label: "Você sente que tem oportunidades reais de crescimento dentro da empresa?", name: "oportunidades" },
                        { label: "O que faria você se sentir mais confiante para assumir novas responsabilidades?", name: "confianca" },
                    ].map((q, i) => (
                        <div key={i}>
                            <label className="font-semibold">{q.label}</label>
                            <textarea
                                name={q.name}
                                className="bg-primary-foreground mt-2 w-full border rounded px-3 py-2"
                                required
                                value={(form as any)[q.name]}
                                onChange={handleChange}
                            />
                        </div>
                    ))}

                    <div>
                        <label className="font-semibold">Em uma palavra, como você definiria sua relação atual com o trabalho?</label>
                        <input
                            name="palavra"
                            type="text"
                            className="bg-primary-foreground mt-2 w-full border rounded px-3 py-2"
                            required
                            value={form.palavra}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="font-semibold">Se pudesse mudar uma coisa na empresa para melhorar o bem-estar dos colaboradores, o que seria?</label>
                        <textarea
                            name="mudanca"
                            className="bg-primary-foreground mt-2 w-full border rounded px-3 py-2"
                            required
                            value={form.mudanca}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex justify-center mt-8">
                        <Button type="submit" className="bg-primary text-primary-foreground px-8 py-2">
                            Enviar Respostas
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
