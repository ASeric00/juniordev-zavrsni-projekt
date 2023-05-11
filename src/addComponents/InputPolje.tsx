import stil from './styles/Polja.module.css'
function InputPolje({ natpis, type, name, max, value, handleFunc, obavezno }) {

    return (
        <div className={stil.poljeDiv}>
            <label>
                {natpis}<br />
                <input
                    className={stil.polje}
                    type={type}
                    min={0}
                    max={max}
                    name={name}
                    value={value}
                    onChange={handleFunc}
                    required={obavezno}
                />
            </label>
        </div>
    )
}

export default InputPolje