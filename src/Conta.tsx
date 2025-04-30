import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Conta() {
  const [saldo, setSaldo] = useState(0);
  const [informacoesConta, setInformacoesConta] = useState<any>({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Função para buscar as informações da conta
  const fetchConta = async () => {
    setLoading(true); // Inicia o loading
    try {
      const response = await fetch("/mockConta.json"); // Mock local
      if (!response.ok) throw new Error(); // Verifica se a resposta é válida
      const data = await response.json();
      setSaldo(data.saldo); // Atualiza o saldo
      setInformacoesConta(data); // Atualiza as informações da conta
      setError("");  // Limpa o erro, se houver
    } catch {
      setError("Erro ao carregar as informações da conta."); // Erro ao carregar as informações
    } finally {
      setLoading(false); // Finaliza o loading
    }
  };

  useEffect(() => {
    fetchConta(); // Carregar as informações ao renderizar
  }, []);

  // Funções para as ações do usuário
  const handleDepositar = () => {
    navigate("/depositar"); // Navega para a página de depósito
  };

  const handleSacar = () => {
    navigate("/sacar"); // Navega para a página de saque
  };

  const handleVisualizarTransacoes = () => {
    navigate("/transacoes"); // Navega para a página de transações
  };

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center gap-4 bg-gray-900">
      <img
        src="/DevBankLogo.png"
        alt="Logo DevBank" // Logo
        className="absolute top-4 left-4 object-cover flex w-100 mb-10"
      />
      <h1 className="text-white text-5xl mb-4 font-bold absolute top-11 left-1/2 transform -translate-x-1/2">
        Bem-vindo à sua conta! {/* Título da página */}
      </h1>

      {/* Informações da conta no canto superior direito */}
      {!loading && informacoesConta && (
        <div className="bg-gray-800 border border-teal-300 rounded-2xl p-6 text-white absolute top-4 right-4 text-lg">
          <p>Nome: {informacoesConta.nome}</p>
          <p>Agência: {informacoesConta.agencia}</p>
          <p>Conta: {informacoesConta.conta}</p>
        </div>
      )}

      {loading ? (
        <p className="text-white">Carregando...</p> // Mensagem de loading
      ) : (
        <>
          <p className="bg-gray-800 border border-teal-300 rounded-2xl p-6 text-white text-3xl mb-5">
            {" "}
            O que você deseja fazer?
            <span className="font-bold text-4xl text-teal-300 ml-50">
              Saldo atual: R$ {saldo.toFixed(2)} {/* Saldo atual */}
            </span>
          </p>{" "}
          {error && <p className="text-red-500 text-sm -mt-2">{error}</p>} {/* Mensagem de erro */}
          <div className="flex gap-10">
            <button
              onClick={handleDepositar} // Navega para a página de depósito
              className="bg-teal-300 text-gray-900 text-4xl font-bold w-75 h-100 py-2 rounded-2xl hover:bg-teal-500 transition transform hover:scale-105"
            >
              Depositar
            </button>
            <button
              onClick={handleSacar} // Navega para a página de saque
              className="bg-teal-300 text-gray-900 text-4xl font-bold w-75 py-2 rounded-2xl hover:bg-teal-500 transition transform hover:scale-105"
            >
              Sacar
            </button>
            <button
              onClick={handleVisualizarTransacoes} // Navega para a página de transações
              className="bg-teal-300 text-gray-900 text-4xl font-bold w-75 py-2 rounded-2xl hover:bg-teal-500 transition transform hover:scale-105"
            >
              Ver Transações
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Conta; // Componente de conta do DevBank
