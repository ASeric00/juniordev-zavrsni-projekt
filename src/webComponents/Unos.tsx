import { useContext, useState } from "react"

import PravaContext from '../addComponents/kontekst'
import UnosForma from "../addComponents/UnosForma"
import Footer from "./Footer"
import ImageDiv from "../addComponents/ImageDiv"

function Unos({ dodaj }) {
    const prava = useContext(PravaContext)
    const [stavkaZaEdit, postaviStavkuZaEdit] = useState(null)
    const [prozorOpen, postaviProzorOpen] = useState(false)

    function handleButton() {
        postaviProzorOpen(true)
    }

    return (
        <>
            <ImageDiv slika={'unos'} natpis={'Unos novih životinja'} />
            <div className={prava}>
                {prava == 'korisnik' ? (
                    <p style={btnStil}>Nemate pravo pristupa ovoj stranici!</p>)
                    : (
                        <div>
                            <button onClick={handleButton}
                                style={btnStil}>Nova životinja</button>
                            {prozorOpen && <UnosForma
                                dodaj={dodaj}
                                editStavka={stavkaZaEdit}
                                zatvoriUnos={() => postaviProzorOpen(false)}
                            />}
                        </div>
                    )}
            </div>
            <Footer />
        </>
    )
}

const btnStil = {
    marginBottom: '50%'
}


export default Unos