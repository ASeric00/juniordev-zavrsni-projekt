import { useState, useEffect, useContext } from "react"
import stil from './styles/Popis.module.css'
import axios from 'axios'

import InfoDiv from "../addComponents/InfoDiv"
import RadioPolje from "../addComponents/RadioPolje"
import ImageDiv from "../addComponents/ImageDiv"
import PravaContext from '../addComponents/kontekst'
import UnosForma from "../addComponents/UnosForma"
import Footer from "./Footer"

function Popis({ zivotinje, postaviZivotinje, filtriraj }) {
    const prava = useContext(PravaContext)
    const [statusFilter, postaviStatusFilter] = useState([])
    const [vrsteFilter, postaviVrsteFilter] = useState([])

    const [prozorOpen, postaviProzorOpen] = useState(false)
    const [stavkaZaEdit, postaviStavkuZaEdit] = useState(null)

    useEffect(() => {
        axios
            .get('http://localhost:3001/status')
            .then(res => postaviStatusFilter(res.data))
        axios
            .get('http://localhost:3001/filtervrste')
            .then(res => postaviVrsteFilter(res.data))
    }, [])

    function filtrirajStatus(e) {
        const checked = e.target.value
        if (checked === 'udomljen') {
            axios
                .get('http://localhost:3001/zivotinje?q=&udomljen=true')
                .then(res => filtriraj(res.data))
        }
        else if (checked === 'nije udomljen') {
            axios
                .get('http://localhost:3001/zivotinje?q=&udomljen=false')
                .then(res => filtriraj(res.data))
        }
        else {
            axios
                .get('http://localhost:3001/zivotinje')
                .then(res => filtriraj(res.data))
        }
    }

    function filtrirajVrstu(e) {
        const checked = e.target.value
        if (checked === 'mačka') {
            axios
                .get('http://localhost:3001/zivotinje?q=&vrsta=mačka')
                .then(res => filtriraj(res.data))
        }
        else if (checked === 'pas') {
            axios
                .get('http://localhost:3001/zivotinje?q=&vrsta=pas')
                .then(res => filtriraj(res.data))
        }
        else {
            axios
                .get('http://localhost:3001/zivotinje')
                .then(res => filtriraj(res.data))
        }
    }

    async function saljiZahtjev(idx) {
        // event.preventDefault()
        await axios.patch('http://localhost:3001/zivotinje/' + idx, {
            udomljen: true,
        })
            .then(rez => console.log(rez))
        const res = await axios.get('http://localhost:3001/zivotinje')
        filtriraj(res.data)
    }

    function handleEdit(idx) {
        postaviStavkuZaEdit(idx)
        console.log(stavkaZaEdit)
        // console.log(idx)
        // console.log(zivotinje[idx])
        postaviProzorOpen(true)
    }

    async function brisiPodatak(idx) {
        console.log('Brišem podatak pod brojem ' + idx)
        await axios
            .delete('http://localhost:3001/zivotinje/' + idx)
        const res = await axios.get('http://localhost:3001/zivotinje')
        filtriraj(res.data)
    }

    return (
        <div >
            <ImageDiv slika={'popis'} natpis={'Popis životinja'} />
            <div className={stil.filterDiv}>
                <RadioPolje natpis={'Status:'} name={'status'} nizObjekata={statusFilter}
                    handleFunc={filtrirajStatus} />

                <RadioPolje natpis={'Vrsta:'} name={'vrsta'} nizObjekata={vrsteFilter}
                    handleFunc={filtrirajVrstu} />

            </div>
            {
                zivotinje.map(objekt => (
                    <InfoDiv key={objekt.id}>
                        <div className={objekt.udomljen === true ? stil.udomljenDiv : stil.infoDiv}>
                            <img src={`../src/assets/${objekt.vrsta}.jpg`} alt={objekt.vrsta} />
                            <div>
                                <h2>{objekt.ime}</h2>
                                <p><b>Udomljen:</b> {(objekt.udomljen === true) ? ('Da') : ('Ne')}</p>
                                <p><b>Vrsta:</b> {objekt.vrsta}</p>
                                <p><b>Godine:</b> {objekt.godine}</p>
                                <p><b>Čip:</b> {(objekt.cip === true) ? ('Da') : ('Ne')}</p>
                                <p><b>Posljednji pregled:</b> {objekt.pregled ? objekt.pregled : 'Nepoznato'}</p>
                                <p>{objekt.opis}</p>
                            </div>
                            <div>
                                {(prava == 'korisnik' && objekt.udomljen == false) && <button onClick={() => saljiZahtjev(objekt.id)}>Udomi</button>}
                                {(prava == 'admin') && <div className={stil.buttonDiv}>
                                    <button onClick={() => handleEdit(objekt.id - 1)}>Uredi</button>
                                    <button onClick={() => brisiPodatak(objekt.id)}>Ukloni</button>
                                </div>}
                            </div>
                        </div>
                    </InfoDiv>
                ))
            }
            <div>
                {prozorOpen && <UnosForma
                    dodaj={postaviZivotinje}
                    editStavka={stavkaZaEdit}
                    zatvoriUnos={() => postaviProzorOpen(false)}
                    defaultValue={stavkaZaEdit !== null && zivotinje[stavkaZaEdit]}
                />}
            </div>
            <Footer />
        </div>
    )
}

export default Popis