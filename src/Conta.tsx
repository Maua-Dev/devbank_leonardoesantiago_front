import { useSaldo } from "./SaldoContex"; // Hook para acessar o saldo
import { useNavigate } from "react-router-dom";
import { useInfosdaConta } from "./InfosdaConta";

function Conta() {
  const navigate = useNavigate();
  const {saldo} = useSaldo(); // Hook para acessar o saldo
  const {informacoesConta} = useInfosdaConta(); // Hook para acessar as informações da conta

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
      {informacoesConta && (
        <div className="bg-gray-800 border border-teal-300 rounded-2xl p-6 text-white absolute top-4 right-4 text-lg">
          <p>Nome: {informacoesConta.name}</p>
          <p>Agência: {informacoesConta.agency}</p>
          <p>Conta: {informacoesConta.account}</p>
        </div>
      )}
        <>
          <p className="bg-gray-800 border border-teal-300 rounded-2xl p-6 text-white text-3xl mb-5">
            {" "}
            O que você deseja fazer?
            <span className="font-bold text-4xl text-teal-300 ml-50">
              Saldo atual: R$ {saldo.toFixed(2)} {/* Saldo atual */}
            </span>
          </p>{" "}
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
    </div>
  );
}

export default Conta; // Componente de conta do DevBank
