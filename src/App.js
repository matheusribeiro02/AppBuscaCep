import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import "./styles.css";
import api from "./services/api";

function App() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});

  async function handleSearch() {
    //https://viacep.com.br/ws/01001000/json/

    if (input === "") {
      alert("Digite algum cep válido!");
      return;
    }

    try {
      const res = await api.get(`${input}/json`);
      setCep(res.data);
      setInput("");
    } catch {
      alert("CEP INVÁLIDO");
      setInput("");
    }
  }

  return (
    <div className="container">
      <h1 className="tittle">Buscador CEP</h1>
      <div className="containerInput">
        <input
          type="text"
          placeholder="digite o cep..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={18} color="#fff" />
        </button>
      </div>

      {Object.keys(cep).length > 1 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>{cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>
            {cep.localidade} - {cep.uf}
          </span>
        </main>
      )}
    </div>
  );
}

export default App;
