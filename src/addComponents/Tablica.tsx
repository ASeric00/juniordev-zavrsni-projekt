import { useState, useEffect } from 'react'
import axios from 'axios'
import stil from './styles/Tablica.module.css'

import RedakTablice from "./RedakTablice"

function Tablica({ kategorija, edit }) {
    const [donacije, postaviDonacije] = useState([])
    useEffect(() => {
        axios
            .get('http://localhost:3001/donacije?q=&kategorija=' + kategorija)
            .then(res => postaviDonacije(res.data))
            .catch(err => console.log(err.message))
    }, [])

    return (
        <table className={stil.tableDiv}>
            <thead>
                <tr>
                    <th>Tip</th>
                    <th>Vrijednost</th>
                    <th>Opis</th>
                    <th>{' '}</th>
                </tr>
            </thead>
            <tbody>
                {donacije.map(objekt => (
                    <RedakTablice
                        key={objekt.id}
                        donacije={objekt}
                        osvjezi={postaviDonacije}
                        edit={edit}
                        kateg={kategorija} />
                ))}
            </tbody>
        </table>
    )

}

export default Tablica