import stil from './styles/Footer.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faFacebook, faTiktok } from '@fortawesome/free-brands-svg-icons'
import logo from '../assets/light_logo.png'

function Footer() {

    return (
        <div className={stil.footerDiv}>
            <div className={stil.iconDiv}>
                <a href='https://www.instagram.com/' target='_blank' ><FontAwesomeIcon icon={faInstagram} /></a>
                <a href='https://www.facebook.com/' target='_blank'><FontAwesomeIcon icon={faFacebook} /></a>
                <a href='https://www.tiktok.com/' target='_blank'><FontAwesomeIcon icon={faTiktok} /></a>
            </div>
            <p>
                &copy;<small> 2023 TOPLI DOM. Sva prava pridržana.</small>
            </p>
            <img src={logo} alt="Topli dom logo" />
        </div>
    )
}

export default Footer