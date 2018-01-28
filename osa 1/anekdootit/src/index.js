import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: randomNumber(),
      votes: [0, 0, 0, 0, 0, 0]
    }
  }

  nextButton = () => {
    return () => {
        this.setState({
            selected: randomNumber()
        })
    }
  }

  voteButton = () => {
    const kopio = this.state.votes.slice(0)
    kopio[this.state.selected] += 1
    return () => {
        this.setState({
            votes: kopio
        })
    }
  }

  votes = (n) => {
    if (this.state.votes[n] === undefined) {
        return 0
    }
    return (
        this.state.votes[n]
    )
  }

  render() {
    return (
      <div>
        <Anecdote anecdote={this.state.selected} votes={this.votes(this.state.selected)} />
        <Button onClick={this.voteButton()} text={'vote'} />
        <Button onClick={this.nextButton()} text={'next anecdote'} />
        <Statistics votes={this.state.votes} />
      </div>
    )
  }
}

const Button = (props) => {
    return (
        <button onClick={props.onClick}>{props.text}</button>
    )
}

const Anecdote = (props) => {
    return (
        <div>
            <p>{anecdotes[props.anecdote]}</p>
            <p>has {props.votes} votes</p>
        </div>
    )
}

const Statistics = (props) => {
    const winnerIndex = props.votes.indexOf(Math.max(...props.votes))
    if (props.votes[winnerIndex] === 0) {
        return (
            <div>
                <h2>anecdote with most votes:</h2>
                <p>no votes given</p>
            </div>
        )
    }
    return (
        <div>
            <h2>anecdote with most votes:</h2>
            <p>{anecdotes[winnerIndex]}</p>
            <p>has {props.votes[winnerIndex]} votes</p>
        </div>
    )
}

const randomNumber = () => {
    return (
        Math.floor(Math.random()* anecdotes.length)
    )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
