import { useContext } from "react"
import axios from 'axios'
import stil from './styles/UnosForma.module.css'


import InputPolje from "./InputPolje"
import TextareaPolje from "./Textarea"
import OptionPolje from "./OptionPolje"
import PravaContext from './kontekst'


function DonacijeForma({ dodaj, tipovi, donacInfo, postaviDonacInfo, zatvoriUnos }) {
    const prava = useContext(PravaContext)

    function promjenaUlaza(e) {
        const { name, value } = e.target
        postaviDonacInfo({ ...donacInfo, [name]: value })
    }

    async function saljiPodatke(e) {
        // e.preventDefault()
        console.log(donacInfo)

        const zaSlanje = obradiPodatke(donacInfo)

        await axios
            .post('http://localhost:3001/donacije', zaSlanje)
            .then(res => dodaj(stanje => [...stanje, res.data]))
        zatvoriUnos()
    }

    function obradiPodatke(objekt) {
        if (prava == 'korisnik')
            objekt.kategorija = "nudi"
        else
            objekt.kategorija = "trazi"

        return {
            "tip": objekt.tip,
            "vrijednost": objekt.vrijednost,
            "opis": objekt.opis,
            "kategorija": objekt.kategorija
        }
    }

    return (
        <div className={stil.unosContainer}
            onClick={(e) => {
                if (e.target.className === stil.unosContainer)
                    zatvoriUnos()
            }}
        >
            <div className={stil.formaDonacije}>
                <form onSubmit={saljiPodatke}>
                    <OptionPolje natpis={'Tip'} name={'tip'} value={donacInfo.tip}
                        handleFunc={promjenaUlaza} holder={'Odaberite tip'} nizObjekata={tipovi} obavezno={true} />
                    <InputPolje natpis={'Vrijednost'} type={'number'} name={'vrijednost'} value={donacInfo.vrijednost}
                        handleFunc={promjenaUlaza} obavezno={true} />
                    <TextareaPolje natpis={'Opis'} name={'opis'} value={donacInfo.opis}
                        handleFunc={promjenaUlaza} min={10} max={200} />
                    <button type="submit">Dodaj donaciju</button>
                </form>
            </div>

        </div>
    )
}

export default DonacijeForma