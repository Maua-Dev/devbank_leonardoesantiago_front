import { createContext, ReactNode, useContext, useState } from "react";

const InfosdaContaContext = createContext<any>(null); // Contexto para informações da conta
export const InfosdaContaProvider = ({children}:{children:ReactNode}) => {
    const [informacoesConta, setInformacoesConta] = useState<any>({}); // Estado para armazenar as informações da conta

    return (
        <InfosdaContaContext.Provider value={{ informacoesConta, setInformacoesConta }}>
            {children}
        </InfosdaContaContext.Provider>
    );
}; // Exporta o provedor do contexto

export const useInfosdaConta = () => {
    const context = useContext(InfosdaContaContext); // Hook para acessar o contexto
    if (!context) {
        throw new Error("useInfosdaConta deve ser usado dentro de um InfosdaContaProvider"); // Verifica se o hook está sendo usado corretamente
    }
    return context;
}; // Exporta o hook para acessar o contexto