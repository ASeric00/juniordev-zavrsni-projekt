function RadioPolje({ natpis, name, nizObjekata, handleFunc }) {

    return (
        <div>
            <label>
                {natpis}
                {nizObjekata.map(obj => (
                    <label key={obj}><br />
                        <input
                            type='radio'
                            name={name}
                            value={obj}
                            onChange={handleFunc}
                        />{' '}{obj}
                    </label>
                ))}
            </label>
        </div>
    )
}

export default RadioPolje