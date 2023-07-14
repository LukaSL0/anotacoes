import { useEffect, useState } from "react"
import Pagination from "./modules/pagination.js";
import autosize from "autosize";
import Api from "../Api.js";

export default function Bloco() {
    
    const [anotacoes, setAnotacoes] = useState([]);
    const [trigger, setTrigger] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await Api.get('/anotacoes')
                const { data } = res;
                setAnotacoes(data);
            } catch (err) {
                console.log(err.message);
            }
        }
        fetchData();
    }, [trigger])

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
        try {
            const info = {
                conteudoEnviado: input.value
            }

            const res = await Api.post(`/anotacoes/database/`, info);
            input.classList.toggle('visibility');
            input.value = "";
            setTrigger((prevTrigger) => prevTrigger + 1);
        }
        catch (err) {
            console.log(err);
        }
    }

    const deletearAnotacao = async (e) => {
        const id = e.currentTarget.id;
        const anotacaoRef = document.querySelector(`.anotacao-id-${id}`);
        const idEnviado = anotacaoRef.id;

        try {
            const res = await Api.delete(`/anotacoes/database/${encodeURIComponent(idEnviado)}`);
            window.location.reload();
        }
        catch (err) {
            console.log(err);
        }
    }
    
    const editarAnotacao = (e) => {
        const id = e.currentTarget.id;
        const anotacaoRef = document.querySelector(`.anotacao-id-${id}`);
        const botaoConfirm = document.querySelector(`.botaoConfirm-${id}`);

        anotacaoRef.readOnly = false;
        anotacaoRef.focus();

        e.currentTarget.style.display = "none";
        botaoConfirm.style.display = "block"
    }

    const cancelarEdicao = async (e, i) => {
        const anotacaoRef = document.querySelector(`.${e.target.className}`);
        if (anotacaoRef.readOnly) {
          return;
        }
      
        if (e.key === "Escape") {
            const id = anotacaoRef.id;
            const botaoConfirm = document.querySelector(`.botaoConfirm-${i}`);
            const botaoEdit = document.querySelector(`.botaoEdit-${i}`);

            anotacaoRef.readOnly = true;

            try {
                const res = await Api.get('/anotacoes');
                const { data } = res;
                const acharAnotacao = data.find(anotacao => anotacao._id === id);
                if (acharAnotacao) {
                    anotacaoRef.value = acharAnotacao.conteudo;
                    botaoConfirm.style.display = "none";
                    botaoEdit.style.display = "block";
                }
            } catch (err) {
                console.error(err);
            }
        }
    }

    const enviarEdicao = async (e) => {
        const id = e.currentTarget.id;
        const anotacaoRef = document.querySelector(`.anotacao-id-${id}`);
        const idEnviado = anotacaoRef.id;
        const conteudo = anotacaoRef.value;
        const botaoEdit = document.querySelector(`.botaoEdit-${id}`);

        anotacaoRef.readOnly = true;

        e.currentTarget.style.display = "none";
        botaoEdit.style.display = "block";

        try {
            const info = {
                novoConteudo: conteudo
            }

            const res = await Api.put(`/anotacoes/database/${encodeURIComponent(idEnviado)}`, info);
            setTrigger((prevTrigger) => prevTrigger + 1);
        }
        catch (err) {
            console.log(err);
        }
    }

    const textareas = document.getElementsByTagName("textarea");
    autosize(textareas);

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
                <Pagination>
                    {
                        anotacoes.map(( anotacao, i ) => (
                            <div key={i} className="bloco__lista__anotacao">
                                <textarea defaultValue={anotacao.conteudo} onKeyDown={(e) => {cancelarEdicao(e, i)}} readOnly={true} id={anotacao._id} className={`anotacao-id-${i}`}></textarea>
                                <button className={`botaoConfirm-${i} botoesConfirm`} id={`${i}`} onClick={(e) => {enviarEdicao(e)}}><i className="fa-solid fa-check" /></button>
                                <button className={`botaoEdit-${i}`} id={`${i}`} onClick={(e) => {editarAnotacao(e)}}><i className="fa-solid fa-pencil" /></button>
                                <button className={`botaoDelete-${i}`} id={`${i}`} onClick={(e) => {deletearAnotacao(e)}}><i className="fa-solid fa-circle-xmark" /></button>
                            </div>
                        ))
                    }
                </Pagination>
            </div>
        </section>
    )
}