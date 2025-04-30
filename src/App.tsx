import { useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const [apiUrl, setApiUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const validApi = "https://r2tcz6zsokynb72jb6o4ffd5nm0ryfyz.lambda-url.us-west-2.on.aws/"; // Essa é a UNICA api válida
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { // Atualiza o valor da URL da API
    setApiUrl(e.target.value);
    setError("");
  };

  const handleSubmit = async () => {
    if (apiUrl.trim() === "") {
      setError("Por favor, insira a URL da API"); // URL vazia
      return;
    }

    if (apiUrl.trim() !== validApi) {
      setError("Endpoint inválido. Use a URL correta."); // URL incorreta (nem api é)
      return;
    }

    setLoading(true);
    try {
      const formattedApiUrl = apiUrl.trim().replace(/\/$/, ""); // Remove a barra final, se houver
      const response = await fetch(`${formattedApiUrl}/`); // Usa a URL sem a barra final, se não, não funciona
      if (!response.ok) throw new Error();
      setError("");
      navigate("/conta"); // Redireciona para a próxima tela
    } catch {
      setError("Não foi possível conectar com esse endpoint."); // URL incorreta
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center gap-4 bg-gray-900">
      <img
        src="/DevBankLogo.png"
        alt="Logo DevBank"
        className="object-cover flex w-300 mb-10" // Logo
      />
      <input
        type="text"
        value={apiUrl}
        onChange={handleChange}
        placeholder="Coloque aqui o endpoint da sua API" // Caixa de texto
        className="text-white border text-2xl border-teal-300 rounded-2xl px-4 py-2 w-220 h-20"
      />
      {error && <p className="text-red-500 text-sm -mt-2">{error}</p>} {/* Mensagem de erro */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`bg-teal-300 text-gray-900 font-bold px-6 py-2 rounded hover:bg-teal-500 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Verificando..." : "Entrar"} {/* Botão de entrar */}
      </button>
    </div>
  );
}

export default App; // Componente da conta do DevBank
