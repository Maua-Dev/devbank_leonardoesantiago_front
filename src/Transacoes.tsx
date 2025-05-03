import { useTransacoes } from "./TransacoesProvider";
import { useNavigate } from "react-router-dom";

interface Transacao {
  tipo: "depósito" | "saque";
  valor: number;
  data: string;
  saldoRestante: number;
}

function Transacoes() {

  const { transacoes } = useTransacoes();
  const navigate = useNavigate();

  const formatarData = (dataString: string) => {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR') + ' ' + data.toLocaleTimeString('pt-BR');
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gray-900 py-12 px-4">
      <img
        src="/DevBankLogo.png"
        alt="Logo DevBank"
        className="absolute top-4 left-4 object-cover w-100"
      />

      <h1 className="text-white text-4xl font-bold text-center mb-12">
        Histórico de Transações
      </h1>

      {transacoes.length === 0 ? (
        <div className="text-white text-2xl">Nenhuma transação encontrada</div>
      ) : (
        <div className="w-full max-w-4xl space-y-6 mb-10">
          {/* Cabeçalho da tabela */}
          <div className="grid grid-cols-4 gap-4 text-white text-2xl font-bold pb-4 border-b border-gray-600">
            <div>Tipo</div>
            <div>Valor</div>
            <div>Data</div>
            <div>Saldo</div>
          </div>

          {/* Lista de transações */}
          {transacoes.map((transacao, index) => (
            <div 
              key={index} 
              className={`grid grid-cols-4 gap-4 text-white text-xl p-4 rounded-lg ${
                transacao.tipo === "depósito" ? "bg-green-900/30" : "bg-red-900/30"
              }`}
            >
              <div className="flex items-center">
                <span className={`inline-block w-4 h-4 rounded-full mr-2 ${
                  transacao.tipo === "depósito" ? "bg-green-500" : "bg-red-500"
                }`}></span>
                {transacao.tipo.charAt(0).toUpperCase() + transacao.tipo.slice(1)}
              </div>
              <div className={`font-bold ${
                transacao.tipo === "depósito" ? "text-green-400" : "text-red-400"
              }`}>
                {transacao.tipo === "depósito" ? "+" : "-"} R$ {transacao.valor.toFixed(2)}
              </div>
              <div>{formatarData(transacao.data)}</div>
              <div>R$ {transacao.saldoRestante.toFixed(2)}</div>
            </div>
          ))}
        </div>
      )}

      {/* Botão Voltar */}
      <div className="flex justify-center w-full max-w-md mt-6">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-700 text-white text-2xl font-bold px-8 py-3 rounded-2xl hover:bg-gray-600 transition w-full"
        >
          Voltar
        </button>
      </div>
    </div>
  );
}

export default Transacoes;