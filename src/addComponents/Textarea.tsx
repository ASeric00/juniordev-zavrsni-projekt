import stil from './styles/Polja.module.css'

function TextareaPolje({ natpis, min, max, name, value, handleFunc }) {

    return (
        <div className={stil.poljeDiv}>
            <label >
                {natpis}<br />
                <textarea
                    className={stil.textarea}
                    name={name}
                    minLength={min}
                    maxLength={max}
                    value={value}
                    onChange={handleFunc}
                />
            </label>
            <br />
            <small>(min. {min} , max. {max} znakova)</small>
        </div>
    )
}

export default TextareaPolje