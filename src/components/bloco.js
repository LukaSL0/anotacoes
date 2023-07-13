import { useEffect, useState } from "react"
import Api from "../Api.js";

export default function Bloco() {
    
    const [anotacoes, setAnotacoes] = useState([]);

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
    })

    const toggleInput = () => {
        const input = document.querySelector('.conteudo');
        input.classList.toggle('visibility');
    }

    const adicionarAnotacao = async (e) => {
        e.preventDefault();
        const input = document.querySelector('.conteudo');
        if (!input.value) {
            alert("[204] Nenhum conteúdo enviado");
            return;
        }
        const info = {
            conteudoEnviado: input.value
        }
        
        await Api.post(`/anotacoes/database/`, info);
        input.classList.toggle('visibility');
        input.value = "";
    }

    const deletearAnotacao = async (e) => {
        const id = e.target.className;
        const anotacaoRef = document.querySelector(`.anotacao-${id}`);
        const idEnviado = anotacaoRef.id;

        await Api.delete(`/anotacoes/database/${encodeURIComponent(idEnviado)}`);
    }
    
    const editarAnotacao = async (e) => {
        const id = e.target.className;
        const anotacaoRef = document.querySelector(`.anotacao-${id}`);
        const idEnviado = anotacaoRef.id;
        const info = {
            novoConteudo: "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        }

        await Api.put(`/anotacoes/database/${encodeURIComponent(idEnviado)}`, info);
    }

    return (
        <section className="bloco">
            <div className="bloco__header">
                <h1>Luka Notes</h1>
                <div className="bloco__header__adicionar">
                    <form onSubmit={(e) => {adicionarAnotacao(e)}}>
                        <input type="text" placeholder="Digite sua anotação" className="conteudo visibility" />
                    </form>
                    <button onClick={toggleInput}>+</button>
                </div>
            </div>
            <div className="bloco__lista">
                {
                    anotacoes.map(( anotacao, i ) => (
                        <div key={i} className="bloco__lista__anotacao">
                            <li id={anotacao._id} className={`anotacao-id-${i}`}>{anotacao.conteudo}</li>
                            <button className={`id-${i}`} onClick={(e) => {editarAnotacao(e)}}>E</button>
                            <button className={`id-${i}`} onClick={(e) => {deletearAnotacao(e)}}>X</button>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}