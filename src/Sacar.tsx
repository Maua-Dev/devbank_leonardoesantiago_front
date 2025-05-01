import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Sacar() {
  const [saldo, setSaldo] = useState(1020.00);
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
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Função para buscar o saldo atual (simulando com um mock)
  const fetchSaldo = async () => {
    setLoading(true);
    try {
      const response = await fetch("/mockConta.json"); // Mock local
      if (!response.ok) throw new Error();
      const data = await response.json();
      setSaldo(data.saldo); // Atualiza o saldo
      setError("");  // Limpa o erro
    } catch {
      setError("Erro ao carregar as informações.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSaldo(); // Carregar o saldo ao renderizar
  }, []);

  // Função para calcular o valor total a ser sacado
  const calcularSaque = () => {
    return Object.keys(quantidades).reduce((acc, key) => {
      return acc + parseInt(key) * quantidades[key];
    }, 0);
  };

  // Função para atualizar a quantidade de notas
  const handleQuantidadeChange = (nota: number, valor: number) => {
    setQuantidades(prev => ({
      ...prev,
      [nota]: valor < 0 ? 0 : valor,
    }));
  };

  // Função para confirmar o saque
  const handleConfirmarSaque = () => {
    const valorSaque = calcularSaque();
    
    if (valorSaque <= 0) {
      setError("O valor do saque deve ser maior que zero.");
      return;
    }
    
    if (valorSaque > saldo) {
      setError("Saldo insuficiente para realizar o saque.");
      return;
    }
    
    // Se tudo estiver ok, realiza o saque
    setSaldo(prev => prev - valorSaque);
    setSuccess(`Saque de R$ ${valorSaque.toFixed(2)} realizado com sucesso!`);
    setError("");
    
    // Aqui você pode adicionar a lógica para enviar os dados para o backend
    console.log("Saque realizado:", quantidades);
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
              className="text-gray-900 p-2 rounded w-20 text-center"
              min="0"
            />
          </div>
        ))}
      </div>

      <div className="bg-gray-800 border border-teal-300 rounded-2xl p-6 text-white text-3xl mt-6">
        <p>Total a sacar: R$ {calcularSaque().toFixed(2)}</p>
      </div>

      {error && <p className="text-red-500 text-xl -mt-2">{error}</p>}
      {success && <p className="text-teal-300 text-xl -mt-2">{success}</p>}

      <div className="flex gap-4 mt-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-700 text-white text-2xl font-bold w-40 py-2 rounded-2xl hover:bg-gray-600 transition transform hover:scale-105"
        >
          Voltar
        </button>
        
        <button
          onClick={handleConfirmarSaque}
          className="bg-teal-300 text-gray-900 text-2xl font-bold w-40 py-2 rounded-2xl hover:bg-teal-500 transition transform hover:scale-105"
        >
          Confirmar Saque
        </button>
      </div>
    </div>
  );
}

export default Sacar;