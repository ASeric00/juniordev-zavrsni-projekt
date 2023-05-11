import { useState, useEffect } from 'react'
import axios from 'axios'
import stil from './styles/UnosForma.module.css'

import InputPolje from "./InputPolje"
import OptionPolje from './OptionPolje'
import TextareaPolje from './Textarea'

function UnosForma({ dodaj, editStavka, zatvoriUnos, defaultValue }) {

    const [unosPodatci, postaviPodatke] = useState(defaultValue || {
        ime: '',
        udomljen: false,
        vrsta: '',
        godine: '',
        cip: false,
        pregled: '',
        opis: ''
    })

    const [vrste, postaviVrstu] = useState([])

    useEffect(() => {
        axios
            .get('http://localhost:3001/vrste')
            .then(res => postaviVrstu(res.data))
            .catch(err => console.log(err.message))
    }, [])

    function promjenaUlaza(e) {
        const { name, value } = e.target
        postaviPodatke({ ...unosPodatci, [name]: value })
    }

    function promjenaUlazaSelect(e) {
        const activeData = e.target.value
        console.log(activeData)
        const name = e.target.name
        if (activeData == 'Da') {
            postaviPodatke({ ...unosPodatci, [name]: true })
        }
        else if (activeData == 'Ne') {
            postaviPodatke({ ...unosPodatci, [name]: false })
        }
    }

    async function saljiPodatke(e) {
        e.preventDefault()
        console.log(unosPodatci)
        console.log(editStavka)

        const zaSlanje = obradiPodatke(unosPodatci)

        if (editStavka === null) {
            await axios
                .post('http://localhost:3001/zivotinje', zaSlanje)
                .then(res => dodaj(stanje => [...stanje, res.data]))
        }
        else {
            await axios
                .patch('http://localhost:3001/zivotinje/' + (editStavka + 1), zaSlanje)
            const res = await axios.get('http://localhost:3001/zivotinje')
            dodaj(res.data)
        }
        zatvoriUnos()
    }

    function obradiPodatke(objekt) {
        return {
            "ime": objekt.ime,
            "udomljen": objekt.udomljen,
            "vrsta": objekt.vrsta,
            "godine": objekt.godine,
            "cip": objekt.cip,
            "pregled": objekt.pregled,
            "opis": objekt.opis
        }
    }

    return (
        <div className={stil.unosContainer}
            onClick={(e) => {
                if (e.target.className == stil.unosContainer)
                    zatvoriUnos()
            }}
        >
            <div >
                <form onSubmit={saljiPodatke} className={stil.formaDiv}>
                    <div className={stil.flexDiv}>
                        <div >
                            <InputPolje natpis={'Ime'} type={'text'} name={'ime'} value={unosPodatci.ime}
                                handleFunc={promjenaUlaza} obavezno={true} />
                            <OptionPolje natpis={'Vrsta'} name={'vrsta'} value={unosPodatci.vrsta}
                                handleFunc={promjenaUlaza} holder={'Odaberite vrstu'} nizObjekata={vrste} obavezno={false} />
                            <InputPolje natpis={'Godine'} type={'number'} name={'godine'} value={unosPodatci.godine}
                                handleFunc={promjenaUlaza} obavezno={false} />
                            <OptionPolje natpis={'Udomljen'} name={'udomljen'} value={unosPodatci.udomljen}
                                handleFunc={promjenaUlazaSelect} holder={'Odaberite status'} nizObjekata={["Da", "Ne"]} obavezno={false} />
                        </div>
                        <div>
                            <TextareaPolje natpis={'Opis'} name={'opis'} value={unosPodatci.opis}
                                handleFunc={promjenaUlaza} min={10} max={150} />
                            <OptionPolje natpis={'Čip'} name={'cip'} value={unosPodatci.cip}
                                handleFunc={promjenaUlazaSelect} holder={'Odaberite status'} nizObjekata={['Da', 'Ne']} obavezno={false} />
                            <InputPolje natpis={'Zadnji pregled'} type={'date'} name={'pregled'} value={unosPodatci.pregled}
                                handleFunc={promjenaUlaza} obavezno={false} />
                        </div>
                    </div>
                    <button type='submit'>Dodaj</button>
                </form>
            </div>
        </div>
    )
}

export default UnosForma