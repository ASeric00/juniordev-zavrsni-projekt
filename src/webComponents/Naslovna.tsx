import stil from './styles/Naslovna.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faFacebook, faTiktok } from '@fortawesome/free-brands-svg-icons'

import InputPolje from "../addComponents/InputPolje"
import TextareaPolje from "../addComponents/Textarea"
import Footer from './Footer'

import naslovna from '../assets/naslovna.png'
import mapa from '../assets/mapa.png'

function Naslovna() {
    return (
        <div>
            <div className={stil.naslovnaDiv}>
                <img src={naslovna} alt="Naslovna slika" />
                <div className={stil.naslovDiv}>
                    <h1>Specijalizirano utočište za napuštene kućne ljubimce</h1>
                    <button>Obratite nam se</button>
                </div>
            </div>
            <div className={stil.izrekaDiv}>
                <h2><i>~ Sve dok osoba ne zavoli životinju, dio njezine duše ostaje neprobuđen! ~</i></h2>
                <p>Anatole France, francuski pjesnik</p>
            </div>

            <div className={stil.infoDiv}>
                <h2>Informacije o skloništu</h2>
                <p>utočište za napuštene životinje grada Splita<br />Topli dom</p>
                <p><b>Ulica Nikole Šopa 2, 21000 Split</b></p>
                <p><b>Tel:</b> 021/123-456</p>
                <p><b>Mob:</b> 095/123-4567 (dežurni broj)</p>
                <div>
                    <p><br /><b>Uđite u vau-vau svijet, upoznajte nas!</b></p>
                    <div className={stil.iconDiv}>
                        <a href='https://www.instagram.com/' target='_blank' ><FontAwesomeIcon icon={faInstagram} /></a>
                        <a href='https://www.facebook.com/' target='_blank'><FontAwesomeIcon icon={faFacebook} /></a>
                        <a href='https://www.tiktok.com/' target='_blank'><FontAwesomeIcon icon={faTiktok} /></a>
                    </div>
                </div>
            </div>
            <div className={stil.mapaDiv}>
                <img src={mapa} alt='Mapa grada' />
            </div>
            <div className={stil.upitiDiv}>
                <h2>Imate pitanja?</h2>
                <p>Slobodno se javite, brzo odgovaramo na sve upite!</p>
                <form>
                    <InputPolje natpis={'Ime i prezime'} type={'text'} name={'ime'} />
                    <InputPolje natpis={'Email'} type={'email'} name={'email'} />
                    <TextareaPolje natpis={'Poruka'} min={10} max={300} name={'poruka'} />
                    <button type="submit">Pošalji <span><FontAwesomeIcon icon={faPaperPlane} /></span></button>
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default Naslovna