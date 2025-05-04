import { useState } from "react";
import { useSaldo } from "./SaldoContex";
import { useNavigate } from "react-router-dom";
import { useTransacoes } from "./TransacoesProvider";

export interface QuantidadeNotas {
  [key: number]: number; // Mapeia o valor da nota para a quantidade
}
function Depositar() {
  const { saldo, setSaldo } = useSaldo(); // Hook para acessar o saldo
  const { addTransacao } = useTransacoes(); // Hook para acessar as transações
  const [quantidades, setQuantidades] = useState<QuantidadeNotas>({
    2: 0,
    5: 0,
    10: 0,
    20: 0,
    50: 0,
    100: 0,
    200: 0,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Função para calcular o valor total a ser depositado
  const calcularDeposito = () => {
    return Object.keys(quantidades).reduce((acc, key) => {
      return acc + parseInt(key) * quantidades[Number(key)];
    }, 0);
  };

  // Função para atualizar a quantidade de notas
  const handleQuantidadeChange = (nota: number, valor: number) => {
    setQuantidades((prev) => ({
      ...prev,
      [nota]: valor < 0 ? 0 : valor,
    }));
  };

  // Função para confirmar o depósito
  const handleConfirmarDeposito = () => {
    const valorDeposito: number = calcularDeposito();

    if (valorDeposito <= 0) {
      setError("O valor do depósito deve ser maior que zero.");
      return;
    }

    // Se tudo estiver ok, realiza o depósito
    setSaldo(saldo + valorDeposito);

    // Registra a transação
    addTransacao({
      tipo: "depósito",
      valor: valorDeposito,
      data: new Date().toISOString(),
      saldoRestante: saldo + valorDeposito,
    });

    setSuccess(
      `Depósito de R$ ${valorDeposito.toFixed(2)} realizado com sucesso!`
    );
    setError("");

    // Aqui você pode adicionar a lógica para enviar os dados para o backend
    console.log("Depósito realizado:", quantidades);
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
    <div key={nota} className="flex justify-between items-center mb-4 gap-4">
      <span>{`R$ ${nota}.00`}</span>
      <div className="flex items-center gap-2">
        <button
          onClick={() =>
            handleQuantidadeChange(Number(nota), quantidades[Number(nota)] - 1)
          }
          className="bg-gray-800 border border-teal-300 text-red-500 font-bold text-center px-5 py-1 rounded text-xl w-14 ml-5 hover: transition transform hover:scale-120"
        >
          -
        </button>
        <input
          type="text"
          value={quantidades[Number(nota)]}
          readOnly
          className="text-gray-900 p-2 rounded w-5 text-center"
        />
        <button
          onClick={() =>
            handleQuantidadeChange(Number(nota), quantidades[Number(nota)] + 1)
          }
          className="bg-gray-800 border border-teal-300 text-green-500 font-bold px-5 py-1 rounded text-xl hover: transition transform hover:scale-120"
        >
          +
        </button>
      </div>
    </div>
  ))}
</div>

      <div className="bg-gray-800 border border-teal-300 rounded-2xl p-6 text-white text-3xl mt-6">
        <p>Total a depositar: R$ {calcularDeposito().toFixed(2)}</p>
      </div>

      {error && <p className="text-red-500 text-xl -mt-2">{error}</p>}
      {success && <p className="text-teal-300 text-xl -mt-2">{success}</p>}

      <div className="flex gap-4 mt-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-700 text-white text-4xl font-bold w-75 py-4 rounded-2xl hover:gray-teal-600 transition transform hover:scale-105 mt-6"
        >
          Voltar
        </button>

        <button
          onClick={handleConfirmarDeposito}
          className="bg-teal-300 text-gray-900 text-4xl font-bold w-75 py-4 rounded-2xl hover:bg-teal-500 transition transform hover:scale-105 mt-6"
        >
          Confirmar Depósito
        </button>
      </div>
    </div>
  );
}

export default Depositar;
