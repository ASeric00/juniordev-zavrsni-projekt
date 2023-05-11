import stil from './styles/Polja.module.css'

function OptionPolje({ natpis, name, value, handleFunc, holder, nizObjekata, obavezno }) {

    return (
        <div className={stil.poljeDiv}>
            <label>
                {natpis}<br />
                <select
                    className={stil.polje}
                    name={name}
                    value={value}
                    onChange={handleFunc}
                    required={obavezno}
                >
                    <option value="">--{holder}--</option>
                    {nizObjekata.map(objekt => (
                        <option key={objekt} value={objekt}>{objekt}</option>
                    ))}
                </select>
            </label>
        </div>
    )
}

export default OptionPolje