import stil from './styles/ImageDiv.module.css'

function ImageDiv({ slika, natpis }) {

    return (
        <div className={stil.imgDiv}>
            <img src={`../src/assets/${slika}.jpg`} alt="Početna slika" />
            <h2>{natpis}</h2>
        </div>
    )
}

export default ImageDiv