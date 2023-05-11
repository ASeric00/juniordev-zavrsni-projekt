import stil from './styles/Navbar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGroup } from '@fortawesome/free-solid-svg-icons'

import logo from '../assets/dark_logo.png'

function NavBar({ promjena }) {

    return (
        <div className={stil.mainDiv}>
            <div>
                <img src={logo} alt="Logo Topli dom" />
            </div>

            <ul className={stil.listDiv}>
                <li>
                    <a href="/">Naslovna</a>
                </li>
                <li>
                    <a href="/popis">Popis životinja</a>
                </li>
                <li>
                    <a href="/donacije">Donacije</a>
                </li>
                <li>
                    <a href="/obavijesti">Obavijesti</a>
                </li>
                <li>
                    <a href="/unos">Unos</a>
                </li>
                <li>
                    <button onClick={promjena}>Korisnik/Admin{' '}<FontAwesomeIcon icon={faUserGroup} /></button>
                </li>
            </ul>
        </div>
    )
}

export default NavBar