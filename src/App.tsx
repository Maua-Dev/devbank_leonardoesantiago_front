import { useState } from "react";

function App() {
  const [apiUrl, setApiUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiUrl(e.target.value);
    setError("");
  };

  const handleSubmit = async () => {
    if (apiUrl.trim() === "") {
      setError("Por favor, insira a URL da API");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/`);
      if (!response.ok) {
        throw new Error();
      }
      setError("");
      console.log("URL da API:", apiUrl);
    } catch {
      setError("Não foi possível conectar com esse endpoint.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center gap-4 bg-gray-900">
      <img
        src="/DevBankLogo.png"
        alt="Logo DevBank"
        className="object-cover flex w-300 mb-10"
      />
      <input
        type="text"
        value={apiUrl}
        onChange={handleChange}
        placeholder="Coloque aqui o endpoint da sua API"
        className="text-white border text-2xl border-teal-300 rounded-2xl px-4 py-2 w-220 h-20"
      />
      {error && <p className="text-red-500 text-sm -mt-2">{error}</p>}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`bg-teal-300 text-gray-900 font-bold px-6 py-2 rounded hover:bg-teal-500 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Verificando..." : "Entrar"}
      </button>
    </div>
  );
}

export default App;
