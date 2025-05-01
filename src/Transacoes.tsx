import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Transacao {
  tipo: "depósito" | "saque";
  valor: number;
  data: string;
  saldoRestante: number;
}

function Transacoes() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Mock de transações (substituir por chamada à API)
  const fetchTransacoes = async () => {
    setLoading(true);
    try {
      // Simulando delay de rede
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock data - substituir por chamada real à API
      const mockData: Transacao[] = [
        {
          tipo: "depósito",
          valor: 500.00,
          data: "2023-05-15T14:30:00",
          saldoRestante: 1500.00
        },
        {
          tipo: "saque",
          valor: 200.00,
          data: "2023-05-16T10:15:00",
          saldoRestante: 1300.00
        },
        {
          tipo: "depósito",
          valor: 1000.00,
          data: "2023-05-17T16:45:00",
          saldoRestante: 2300.00
        },
        {
          tipo: "saque",
          valor: 300.00,
          data: "2023-05-18T09:20:00",
          saldoRestante: 2000.00
        },
      ];
      
      setTransacoes(mockData);
      setError("");
    } catch {
      setError("Erro ao carregar o histórico de transações.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransacoes();
  }, []);

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

      {loading ? (
        <div className="text-white text-2xl">Carregando...</div>
      ) : error ? (
        <div className="text-red-500 text-xl">{error}</div>
      ) : transacoes.length === 0 ? (
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