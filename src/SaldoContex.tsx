import { createContext, useContext, useState, ReactNode, } from "react";

type SaldoContextType = {
    saldo: number;
    setSaldo: (novoSaldo: number) => void;
};

const SaldoContext = createContext<SaldoContextType | undefined>(undefined);

export const SaldoProvider = ({children}: {children: ReactNode}) => {
    const [saldo, setSaldo] = useState(0); // Valor inicial do saldo, pode ser alterado conforme necessário

    return (
        <SaldoContext.Provider value={{ saldo, setSaldo }}>
            {children}
        </SaldoContext.Provider>
    );
};

export const useSaldo = () => {
    const context = useContext(SaldoContext);
    if (!context) {
        throw new Error("useSaldo deve ser usado dentro de um SaldoProvider");
    }
    return context;
};