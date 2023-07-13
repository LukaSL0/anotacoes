import { useEffect, useState } from "react"
import Api from "../Api.js";

export default function Bloco() {
    
    const [anotacoes, setAnotacoes] = useState([]);
    const [atualizar, setAtualizar] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await Api.get('/anotacoes')
                const data = res.data;
                setAnotacoes(data);
            } catch (err) {
                console.log(err.message);
            }
        }
        fetchData();
    }, [atualizar])

    const toggleInput = () => {
        const input = document.querySelector('.conteudo');
        input.classList.toggle('visibility');
    }

    const adicionarAnotacao = async (e) => {
        e.preventDefault();
        const input = document.querySelector('.conteudo');
        const info = {
            conteudo: input.value
        }
        
        const res = await Api.post("/anotacoes/database", info);
        const data = res.data;
        input.classList.toggle('visibility');
        setAtualizar(Math.random() < 0.5)
    }

    return (
        <section className="bloco">
            <div className="bloco__header">
                <h1>Luka Notes</h1>
                <div className="bloco__header__adicionar">
                    <form onSubmit={(e) => {adicionarAnotacao(e)}}>
                        <input type="text" className="conteudo visibility" />
                    </form>
                    <button onClick={toggleInput}>+</button>
                </div>
            </div>
            <div className="bloco__lista">
                <ul>
                    {
                        anotacoes.map(( anotacao, i ) => (
                            <li key={i}>{anotacao.conteudo}</li>
                        ))
                    }
                </ul>
            </div>
        </section>
    )
}