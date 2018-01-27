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
  
    clickHyva = () => {
      this.setState({
        hyva: this.state.hyva + 1
      })
    }
  
    clickNeutraali = () => {
      this.setState({
        neutraali: this.state.neutraali + 1
      })
    }

    clickHuono = () => {
        this.setState({
          huono: this.state.huono + 1
        })
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
            <Button onClick={this.clickHyva} text="hyvä" />
            <Button onClick={this.clickNeutraali} text="neutraali" />
            <Button onClick={this.clickHuono} text="huono" />
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
    return (
        <div>
            <Statistic text="hyvä" value={props.state.hyva} />
            <Statistic text="neutraali" value={props.state.neutraali} />
            <Statistic text="huono" value={props.state.huono} />
            <Statistic text="keskiarvo" value={average(props)} />
            <Statistic text="positiivisia" value={positive(props)} />
        </div>
    )
}

const Statistic = (props) => {
    return (
        <div>
            <p>{props.text} {props.value} </p>
        </div>
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


ReactDOM.render(<App />, document.getElementById('root'));
