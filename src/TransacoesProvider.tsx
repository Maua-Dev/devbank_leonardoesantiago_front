import { createContext, useContext, useState } from "react";

interface Transacao {
    tipo: "depósito" | "saque";
    valor: number;
    data: string;
    saldoRestante: number;
}

interface TransacoesContextType {
    transacoes: Transacao[];
    addTransacao: (transacao: Transacao) => void;
}

const TransacoesContext = createContext<TransacoesContextType | undefined>(undefined);

export const TransacoesProvider = ({ children }: { children: React.ReactNode }) => {
    const [transacoes, setTransacoes] = useState<Transacao[]>([]);

    const addTransacao = (transacao: Transacao) => {
        setTransacoes(prev => [transacao, ...prev]); // Adiciona a nova transação no topo da lista
    }

    return (
        <TransacoesContext.Provider value={{ transacoes, addTransacao }}>
            {children}
        </TransacoesContext.Provider>
    );
};

export const useTransacoes = () => {
    const context = useContext(TransacoesContext);
    if (!context) {
        throw new Error("useTransacoes deve estar dentro do TransacoesProvider");
    }
    return context;
};