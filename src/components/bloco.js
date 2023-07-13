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
    }, [])

    const adicionarAnotacao = async () => {
        
    }

    return (
        <section className="bloco">
            <div className="bloco__header">
                <h1>Luka Notes</h1>
                <button onClick={adicionarAnotacao}>+</button>
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