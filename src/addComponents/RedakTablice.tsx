import { useContext } from 'react'
import axios from 'axios'
import stil from './styles/RedakTablice.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'


import PravaContext from './kontekst'

function RedakTablice({ donacije, osvjezi, kateg }) {
    const prava = useContext(PravaContext)


    async function brisiPodatak() {
        console.log('Brišem podatak pod brojem ' + donacije.id)
        await axios
            .delete('http://localhost:3001/donacije/' + donacije.id)
        const res = await axios.get('http://localhost:3001/donacije?q=&kategorija=' + kateg)
        osvjezi(res.data)
    }

    async function saljiZahtjev(zahtjev) {
        // event.preventDefault()
        await axios.patch('http://localhost:3001/donacije/' + donacije.id, {
            kategorija: zahtjev,
        })
            .then(rez => console.log(rez))
        const res = await axios.get('http://localhost:3001/donacije?q=&kategorija=' + kateg)
        osvjezi(res.data)
    }

    return (
        <tr className={stil.row}>
            <td>{donacije.tip}</td>
            <td>{donacije.vrijednost}€</td>
            <td>{donacije.opis}</td>

            {(kateg == 'trazi') && (prava == 'korisnik'
                ? (<td><button onClick={() => saljiZahtjev('donirano')}>Doniraj{' '}<FontAwesomeIcon icon={faHeart} /></button></td>)
                : (<td><button onClick={() => saljiZahtjev('donirano')}>Donirano</button> <button onClick={brisiPodatak}>Ukloni</button></td>))}

            {(kateg == 'nudi') && (prava == 'korisnik'
                ? ('')
                : (<td><button onClick={() => saljiZahtjev('donirano')}>Prihvati{' '}<FontAwesomeIcon icon={faHeart} /></button></td>))}

            {(kateg == 'donirano') && (prava == 'korisnik'
                ? ('')
                : (<td><button onClick={() => saljiZahtjev('trazi')}>Ponovi</button> <button onClick={brisiPodatak}>Ukloni</button></td>))}
        </tr>
    )
}

export default RedakTablice