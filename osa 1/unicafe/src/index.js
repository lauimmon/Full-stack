import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        hyva: 0,
        neutraali: 0,
        huono: 0
      }
    }

    clickButton = (param) => {
        return () => {
            this.setState({
                [param]: this.state[param] + 1
            })
        }
    }
  
    render() {

      const Button = (props) => {
        return (
            <button onClick={props.onClick}>{props.text}</button>
        )
      }

      return (
        <div>
          <div>
            <Title title="anna palautetta" />
            <Button onClick={this.clickButton('hyva')} text="hyvä" />
            <Button onClick={this.clickButton('neutraali')} text="neutraali" />
            <Button onClick={this.clickButton('huono')} text="huono" />
            <Title title="statistiikka" />
            <Statistics state={this.state} />
          </div>
        </div>
      )
    }
}

const Title = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
        </div>
    )
}

const Statistics = (props) => {
    if (noFeedback(props)) {
        return (
        <p>ei yhtään palautetta annettu</p> 
        )
    }
    return (
        <table>
            <tbody>
                <Statistic text="hyvä" value={props.state.hyva} />
                <Statistic text="neutraali" value={props.state.neutraali} />
                <Statistic text="huono" value={props.state.huono} />
                <Statistic text="keskiarvo" value={average(props)} />
                <Statistic text="positiivisia" value={positive(props)} />
            </tbody>
        </table>
    )
}

const Statistic = (props) => {
    return (
        <tr>
            <td>{props.text}</td> 
            <td>{props.value}</td>
        </tr>
    )
}

const average = (props) => {
    const hyva = props.state.hyva
    const neutraali = props.state.neutraali
    const huono = props.state.huono
    if (hyva + neutraali + huono === 0) {
        return 0
    }
    return (
        (hyva - huono) / (hyva + neutraali + huono)
    ) 
}

const positive = (props) => {
    const hyva = props.state.hyva
    const neutraali = props.state.neutraali
    const huono = props.state.huono
    if (hyva + neutraali + huono === 0) {
        return "0 %"
    }
    return (
        (hyva) * 100 / (hyva + neutraali + huono) + " %"
    ) 
}

const noFeedback = (props) => {
    const hyva = props.state.hyva
    const neutraali = props.state.neutraali
    const huono = props.state.huono
    return (hyva + neutraali + huono === 0)
}


ReactDOM.render(<App />, document.getElementById('root'));
