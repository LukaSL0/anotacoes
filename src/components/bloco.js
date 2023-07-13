import { useEffect } from "react"
import Api from "../Api.js";

export default function Bloco() {

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await Api.get('/anotacoes')
                const data = res.data;
                console.log(data);
            } catch (err) {
                console.log(err.message);
            }
        }
        fetchData();
    }, [])

    return (
        <div>
            {/*Logica*/}
        </div>
    )
}