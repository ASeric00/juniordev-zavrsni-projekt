import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import stil from './styles/Obavijesti.module.css'

import InfoDiv from "../addComponents/InfoDiv"
import PravaContext from '../addComponents/kontekst'
import InfoForma from '../addComponents/InfoForma'
import Footer from './Footer'
import ImageDiv from '../addComponents/ImageDiv'

function Obavijesti() {
    const prava = useContext(PravaContext)
    const [obavijesti, postaviObavijesti] = useState([])
    const [prozorOpen, postaviProzorOpen] = useState(false)

    useEffect(() => {
        axios
            .get('http://localhost:3001/obavijesti')
            .then(res => postaviObavijesti(res.data.reverse()))
            .catch(err => console.log(err.message))
    }, [])

    async function brisiPodatak(index) {
        console.log('Brišem podatak pod brojem ' + index)
        await axios
            .delete('http://localhost:3001/obavijesti/' + index)
        const res = await axios.get('http://localhost:3001/obavijesti')
        postaviObavijesti(res.data.reverse())
    }

    return (
        <div>
            <ImageDiv slika={'obavijesti'} natpis={'Obavijesti'} />
            <button onClick={() => postaviProzorOpen(true)} className={stil.btnNovaObav}>Nova obavijest</button>
            {prozorOpen && <InfoForma
                dodaj={postaviObavijesti}
                zatvoriUnos={() => postaviProzorOpen(false)} />}
            {obavijesti.map(info => (
                <InfoDiv key={info.id}>
                    <div className={info.vazno ? stil.vaznoDiv : stil.obavijestDiv}>
                        <div>
                            {prava == 'admin' &&
                                <button onClick={() => brisiPodatak(info.id)}
                                    className={(prava == 'admin' && info.vazno) && stil.ukloniVaznoBtn}>Ukloni</button>}
                        </div>
                        <small>{info.datum}</small>
                        {info.vazno && <b className={stil.vaznoOznaka}>VAŽNO!</b>}
                        <h2>{info.naslov}</h2>
                        <p>{info.tekst}</p>
                    </div>
                </InfoDiv>
            ))
            }
            <Footer />
        </div >
    )
}

export default Obavijesti