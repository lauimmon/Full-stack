import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
    return (
        <div>
            <h1>{props.otsikko}</h1>
        </div>
    )
}

const Sisalto = (props) => {
    const [osa1, osa2, osa3] = props.osat
    return(
        <div>
            <Osa osa={osa1.nimi} tehtavia={osa1.tehtavia} />
            <Osa osa={osa2.nimi} tehtavia={osa2.tehtavia} />
            <Osa osa={osa3.nimi} tehtavia={osa3.tehtavia} />
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

const Kurssi = (props) => {
    return(
        <div>
            <div>
                <Otsikko otsikko={props.kurssi.nimi} />
                <Sisalto osat={props.kurssi.osat} />
            </div>
        </div>
    )
}

const App = () => {
    const kurssi = {
      nimi: 'Half Stack -sovelluskehitys',
      osat: [
        {
          nimi: 'Reactin perusteet',
          tehtavia: 10,
          id: 1
        },
        {
          nimi: 'Tiedonvälitys propseilla',
          tehtavia: 7,
          id: 2
        },
        {
          nimi: 'Komponenttien tila',
          tehtavia: 14,
          id: 3
        }
      ]
    }
  
    return (
      <div>
        <Kurssi kurssi={kurssi} />
      </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)
