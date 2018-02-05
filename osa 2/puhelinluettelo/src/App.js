import React from 'react';
import personService from './services/persons'
import Notification from './components/Notification'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      notification: null
    }
  }

  componentWillMount() {
    personService
      .getAll()
      .then(response => {
        this.setState({ persons: response })
      })
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

      personService
        .create(nameObject)
        .then(newPerson => {
          this.setState({ 
            persons: this.state.persons.concat(newPerson),
            notification: 'Lisättiin ' + nameObject.name
          })
        })

      setTimeout(() => {
        this.setState({notification: null})
      }, 5000) 
    }
    else if (window.confirm(this.state.newName + " on jo luettelossa. Korvataanko vanha numero uudella?")) {
      const nameObject = {
        name: this.state.newName,
        number: this.state.newNumber
      }

      const toEdit = this.state.persons.find(person => {
        return person.name === nameObject.name
      })
  
      personService
        .update(toEdit.id, nameObject)
        .then(newPerson => {
          const persons = this.state.persons.filter(person => {
            return person.id !== toEdit.id
          })
          this.setState({ 
            persons: persons.concat(newPerson),
            notification: 'Muutettiin henkilön ' + toEdit.name + ' numero'
          })
        })
        .catch(error => {
          personService
            .create(nameObject)
            .then(newPerson => {
              const persons = this.state.persons.filter(person => {
                return person.id !== toEdit.id
              })
              this.setState({ 
                persons: persons.concat(newPerson),
                notification: 'Henkilön ' + toEdit.name + ' tiedot oli jo poistettu. Lisättiin ' + toEdit.name
              })
            })
        })

      setTimeout(() => {
        this.setState({notification: null})
      }, 5000) 
    }

    this.setState({
      newName: '',
      newNumber: ''
    })
  }

  removeName = (id) => {
    return () => {
      const toRemove = this.state.persons.find(person => person.id === id)
      personService
        .remove(id)
        .then(changedPersons => {
          const persons = this.state.persons.filter(p => p.id !== id)
          this.setState({ 
            persons: persons,
            notification: 'Poistettiin ' + toRemove.name
          })
        })

      setTimeout(() => {
        this.setState({notification: null})
      }, 5000)
    }  
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <Notification message={this.state.notification} />
        <Input text={'rajaa näytettäviä'} value={this.state.filter} onChange={this.handleFilterChange} />

        <form onSubmit={this.addName} >
          <h3>Lisää uusi / muuta olemassaolevaa numeroa</h3>
          <Input text={'nimi:'} value={this.state.newName} onChange={this.handleNameChange} />
          <Input text={'numero:'} value={this.state.newNumber} onChange={this.handleNumberChange} />
          <button type={"submit"}>lisää</button>
        </form>

        <h3>Numerot</h3>
          <table>
            <tbody>
              {this.state.persons.filter(person => 
                person.name.toUpperCase().includes(this.state.filter.toUpperCase())).map(person => 
                  <Person key={person.name} person={person} removeName={this.removeName(person.id)} />
              )}
            </tbody>
          </table>
      </div>
    )
  }
}

const Person = (props) => {
  return (
    <tr>
      <td>{props.person.name}</td>
      <td>{props.person.number}</td>
      <td><button onClick={props.removeName}>poista</button></td>
    </tr>
  )
}

const Input = (props) => {
  return (
    <div>
      {props.text} <input value={props.value} onChange={props.onChange} />
    </div>
  )
}

export default App