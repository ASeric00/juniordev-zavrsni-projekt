import { useContext, useState } from 'react'
import axios from 'axios'
import stil from './styles/UnosForma.module.css'

import PravaContext from './kontekst'
import TextareaPolje from './Textarea'
import InputPolje from './InputPolje'

function InfoForma({ dodaj, zatvoriUnos }) {
    const prava = useContext(PravaContext)
    const [noveInfo, postaviNoveInfo] = useState({
        naslov: '',
        tekst: '',
        datum: '',
        vazno: false,
    })

    function promjenaUlaza(e) {
        const { name, value } = e.target
        postaviNoveInfo({ ...noveInfo, [name]: value })
    }

    function promjenaUlazaChecked(e) {
        const activeData = e.target.checked
        const name = e.target.name
        postaviNoveInfo({ ...noveInfo, [name]: activeData })
    }

    async function saljiPodatke(e) {
        // e.preventDefault()
        console.log(noveInfo)

        const zaSlanje = obradiPodatke(noveInfo)

        await axios
            .post('http://localhost:3001/obavijesti', zaSlanje)
            .then(res => dodaj(stanje => [...stanje, res.data]))
        zatvoriUnos()
    }

    function obradiPodatke(objekt) {
        const currentDate = new Date().toJSON().slice(0, 10);
        return {
            "naslov": objekt.naslov,
            "tekst": objekt.tekst,
            "datum": currentDate,
            "vazno": objekt.vazno
        }
    }


    return (
        <div className={stil.unosContainer}
            onClick={(e) => {
                if (e.target.className === stil.unosContainer)
                    zatvoriUnos()
            }}
        >
            <div className={stil.formaObavijesti}>
                <form onSubmit={saljiPodatke}>
                    <InputPolje natpis={'Naslov'} type={'text'} name={'naslov'} max={20} value={noveInfo.naslov}
                        handleFunc={promjenaUlaza} obavezno={true} />
                    <TextareaPolje natpis={'Tekst'} name={'tekst'} value={noveInfo.tekst}
                        handleFunc={promjenaUlaza} min={10} max={200} />
                    {prava === 'admin' &&
                        <InputPolje natpis={'Važno!'} type={'checkbox'} name={'vazno'} value={noveInfo.vazno}
                            handleFunc={promjenaUlazaChecked} obavezno={false} />}
                    <button type='submit'>Dodaj novu obavijest</button>
                </form>
            </div>
        </div>
    )

}


export default InfoForma