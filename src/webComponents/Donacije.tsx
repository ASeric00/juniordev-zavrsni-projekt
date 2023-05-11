import { useState, useEffect } from 'react'
import axios from 'axios'
import stil from './styles/Donacije.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandHoldingHeart } from '@fortawesome/free-solid-svg-icons'


import Tablica from '../addComponents/Tablica'
import Footer from './Footer'
import ImageDiv from '../addComponents/ImageDiv'
import DonacijeForma from '../addComponents/DonacijeForma'


function Donacije() {
    const [donacije, postaviDonacije] = useState([])
    const [prozorOpen, postaviProzorOpen] = useState(false)
    const [tipDonacije, postaviTip] = useState([])

    const [donacijeInfo, postaviDonacijeInfo] = useState({
        tip: '',
        vrijednost: '',
        opis: '',
        kategorija: ''
    })

    useEffect(() => {
        axios
            .get('http://localhost:3001/donacije')
            .then(res => postaviDonacije(res.data))
        axios
            .get('http://localhost:3001/tip')
            .then(res => postaviTip(res.data))
    }, [])



    return (
        <>
            <ImageDiv slika={'donacije'} natpis={'Donacije'} />
            <div className={stil.donacijeDiv}>
                <button onClick={() => postaviProzorOpen(true)} className={stil.btnRezer}>Nova donacija{' '}
                    <span><FontAwesomeIcon icon={faHandHoldingHeart} /></span></button>
                {prozorOpen && <DonacijeForma
                    dodaj={postaviDonacije}
                    tipovi={tipDonacije}
                    donacInfo={donacijeInfo}
                    postaviDonacInfo={postaviDonacijeInfo}
                    zatvoriUnos={() => postaviProzorOpen(false)}
                />}
                <h2>Tražimo</h2>
                <Tablica
                    kategorija={'trazi'}
                    osvjezi={postaviDonacije}
                />

                <h2>Nudi se</h2>
                <Tablica
                    kategorija={'nudi'}
                    osvjezi={postaviDonacije}
                />

                <h2>Donirano</h2>
                <Tablica
                    kategorija={'donirano'}
                    osvjezi={postaviDonacije}
                />

            </div>
            <Footer />
        </>
    )
}

export default Donacije