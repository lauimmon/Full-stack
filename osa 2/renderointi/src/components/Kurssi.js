import React from 'react'

const Otsikko = (props) => {
    return (
        <div>
            <h1>{props.otsikko}</h1>
        </div>
    )
}

const Sisalto = (props) => {
    return(
        <div>
            {props.osat.map(osa=><Osa key={osa.id} osa={osa.nimi} tehtavia={osa.tehtavia} />)}
        </div>
    )
}

const Osa = (props) => {
    return (
        <div>
            <p>{props.osa} {props.tehtavia}</p>
        </div>
    )
}

const Tehtavat = (props) => {
    const tehtavat = props.osat.map(osa => osa.tehtavia)
    return(
        <div>
            <p>yhteensä {tehtavat.reduce((yhteensa, tehtavamaara) => yhteensa + tehtavamaara)} tehtävää</p>
        </div>
    )
}

const Kurssi = (props) => {
    return(
        <div>
            <div>
                <Otsikko otsikko={props.kurssi.nimi} />
                <Sisalto osat={props.kurssi.osat} />
                <Tehtavat osat={props.kurssi.osat} />
            </div>
        </div>
    )
}

export default Kurssi