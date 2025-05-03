import { useState, } from "react";
import { useSaldo } from "./SaldoContex";
import { useNavigate } from "react-router-dom";
import { useTransacoes } from './TransacoesProvider'; // Importe o hook useTransacoes

function Depositar() {
  const {saldo, setSaldo} = useSaldo(); // Hook para acessar o saldo
  const { addTransacao } = useTransacoes();
  const [quantidades, setQuantidades] = useState({
    2: 0,
    5: 0,
    10: 0,
    20: 0,
    50: 0,
    100: 0,
    200: 0,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Função para calcular o valor total a ser depositado
  const calcularDeposito = () => {
    return Object.keys(quantidades).reduce((acc, key) => {
      return acc + parseInt(key) * quantidades[key];
    }, 0);
  };

  // Função para atualizar a quantidade de notas
  const handleQuantidadeChange = (nota: number, valor: number) => {
    setQuantidades(prev => ({
      ...prev,
      [nota]: valor,
    }));
  };

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center gap-4 bg-gray-900">
      <img
        src="/DevBankLogo.png"
        alt="Logo DevBank"
        className="absolute top-4 left-4 object-cover flex w-100 mb-10"
      />

      <div className="flex justify-between items-center bg-gray-800 border border-teal-300 rounded-2xl p-6 text-white text-3xl mb-5 w-full max-w-lg">
        <span>Saldo atual:</span>
        <span className="font-bold text-4xl text-teal-300">
          R$ {saldo.toFixed(2)}
        </span>
      </div>

      <div className="text-white text-2xl">
        {Object.keys(quantidades).map((nota) => (
          <div key={nota} className="flex justify-between items-center mb-4">
            <span>{`Notas de R$ ${nota}`}</span>
            <input
              type="number"
              value={quantidades[nota]}
              onChange={(e) =>
                handleQuantidadeChange(Number(nota), Number(e.target.value))
              }
              className="text-gray-900 p-2 rounded"
              min="0"
            />
          </div>
        ))}
      </div>

      <div className="bg-gray-800 border border-teal-300 rounded-2xl p-6 text-white text-3xl mt-6">
        <p>Total a depositar: R$ {calcularDeposito().toFixed(2)}</p>
      </div>

      {error && <p className="text-red-500 text-sm -mt-2">{error}</p>}

      <div className="flex gap-4 mt-4 items-align-center justify-center">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-700 text-white text-4xl font-bold w-75 py-5 rounded-2xl hover:bg-gray-600 transition transform hover:scale-105"
        >
          Voltar
        </button>
      
        <button
          onClick={() => {
            const valorDeposito = calcularDeposito();
            if (valorDeposito <= 0) {
              setError("Você precisa selecionar pelo menos uma nota.");
              return;
            }

            const novoSaldo = saldo + valorDeposito; // calcula o novo saldo
        
            setSaldo((prevSaldo) => prevSaldo + valorDeposito);
            setQuantidades({
              2: 0,
              5: 0,
              10: 0,
              20: 0,
              50: 0,
              100: 0,
              200: 0,
            });
            setError("");
        
            // Aqui é onde você registra a transação:
            addTransacao({
              tipo: "depósito",
              valor: valorDeposito,
              data: new Date().toISOString(),
              saldoRestante: novoSaldo
            });
        
            console.log(`Depósito de R$${valorDeposito} realizado com sucesso!`);
          }}
          className="bg-teal-300 text-gray-900 text-4xl font-bold w-75 py-2 rounded-2xl hover:bg-teal-500 transition transform hover:scale-105 mt-6"
        >
          Confirmar Depósito
        </button>
      </div>
    </div>
  );
}

export default Depositar;
