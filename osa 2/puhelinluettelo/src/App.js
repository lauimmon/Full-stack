import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' }
      ],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
  }

  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value })
  }

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value })
  }

  addName = (event) => {
    event.preventDefault()
    if (!this.state.persons.map(person => person.name).includes(this.state.newName)) {
      const nameObject = {
        name: this.state.newName,
        number: this.state.newNumber
      }
    
      const persons = this.state.persons.concat(nameObject)
    
      this.setState({
        persons: persons
      })
    }
    else {
      alert('Nimi on jo luettelossa')
    }

    this.setState({
      newName: '',
      newNumber: ''
    })
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <Input text={'rajaa näytettäviä'} value={this.state.filter} onChange={this.handleFilterChange} />

        <form onSubmit={this.addName} >
          <h3>Lisää uusi</h3>
          <Input text={'nimi:'} value={this.state.newName} onChange={this.handleNameChange} />
          <Input text={'numero:'} value={this.state.newNumber} onChange={this.handleNumberChange} />
          <Button text={'lisää'} type={"submit"} />
        </form>

        <ListNumbers persons={this.state.persons} filter={this.state.filter} />
      </div>
    )
  }
}

const ListNumbers = (props) => {
  return (
    <div>
      <h3>Numerot</h3>
      <table>
        <tbody>
          {props.persons.filter(person => 
            person.name.toUpperCase().includes(props.filter.toUpperCase())).map(person => 
              <tr key={person.name}>
                <td>{person.name}</td>
                <td>{person.number}</td>
              </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

const Input = (props) => {
  return (
    <div>
      {props.text} <input value={props.value} onChange={props.onChange} />
    </div>
  )
}

const Button = (props) => {
  return (
    <div>
      <button type={props.type}>{props.text}</button>
    </div>
  )
}

export default App