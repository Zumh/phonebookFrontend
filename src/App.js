import { useState, useEffect } from 'react'

import personService from './service/services'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

import './index.css'
const App = () => {

  // persons is collection of name object that added using input
  const [persons, setPersons] = useState([]) 

  // newName is for creating new person name string
  // change this in to object
  const [newPerson, setNewPerson] = useState({name: '', number: ''});
  
  const [searchName, setSearchName] = useState('');
  
  const [message, setMessage] = useState({
    text: '',
    flag: 'success' 
  });


  // fetching phone records from json server
  useEffect(() => {
    
    // data is return here and we get to set it to Persons array
    personService
    .getAll()
    .then(initialPerson => setPersons(initialPerson))
    .catch(error => {
      // something happend catch the error here
      console.log(error);
    });
  }, []);

  const peopleToShow = persons.filter((person) => person.name.toLowerCase().includes(searchName.toLowerCase()));

  //const peopleToShow = persons.filter((person) => searchName.length > 0 && person.name.toLowerCase().includes(searchName.toLowerCase()));

  const handleSearch = (event) => {
    setSearchName(event.target.value);
  };
 

  // Handle a new person name using new object and resetting a new string for name's state
  const addNewInfo = (event) => {
    
    // prevent immediate submmiting the form
    event.preventDefault();

    // Prevent adding same person
    const samePerson = persons.find(person => person.name === newPerson.name);
   
    // check if the same person
    if (samePerson) {
      // found same person and confirm if people like update phone number
      if (window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)){

        // if confirm then prepare a new person object with new phone number 
        const newPhoneNumber = {...samePerson, number: newPerson.number};

        // update phone number for same person in json server
        personService
        .update(samePerson.id, newPhoneNumber)
        .then(returnedPerson => {
         
            // setting message for adding new person
            const newMessage  = {...message, text: `Changed ${returnedPerson.name}'s phone number.`};
            setMessage(newMessage);

            setTimeout(() => {
              setMessage({text: '', flag: 'success'});
            }, 5000);

          // successfully we updated person new phone number with new object person
          // we just updating frontend data with setPersons state
          // update persons list by replacing only updated phone number person data
          setPersons(persons.map(person => person.id !== samePerson.id ? person : returnedPerson));

        })
        .catch(error => {


          const newMessage  = {text: `Information of ${samePerson.name} has been removed from server`, flag: 'error'};
          setMessage(newMessage);

          setTimeout(() => {
            setMessage({text: '', flag: "success"});
          }, 5000);

          setPersons(persons.filter(person => person.id !== samePerson.id));
        });
      }
    
    } 
    else 
    {
      // add a new id number for a new person here because all the info is collected and id is the lasting we need.
      // another shallow copy that can be use for creating new object with additional property
      const currentPerson = {...newPerson};
      
      // this psotService request send a person 
      personService
      .create(currentPerson)
      .then(returnedPerson => {

          // setting message for adding new person
          const newMessage  = {...message, text: `Added ${returnedPerson.name}`};
          setMessage(newMessage);

          setTimeout(() => {
            setMessage({text: '', flag: 'success'});
          }, 5000);
        // extend the prev persons array and concatenate a new person info.
        // .concat create a new array. It prevent mutation
        setPersons(persons.concat(returnedPerson));
        
        // resetting new person states
        setNewPerson({name: '', number: ''});
        })
	.catch(error => {
		console.log(error.response.data.error);
		
		setMessage({text: error.response.data.error, flag: 'error'});

		setTimeout(() => {
			setMessage({text: '', flag: "success"});
		}, 5000);


	});
    }
   
  }

  // keep the state of new name input from input event
  // we don't need to prevent default immediate form submission like form
  // Combining shallowcopy and dynamic base key value pair create a new object that includes all the properties of object
  const handleNewPerson = (event) => {
    const {name, value} = event.target;
   
    // the key is computed dynamically based on the value of name vriable
    // made a shallow caopy of a newPerson
    setNewPerson({...newPerson, [name]:value});
    
  }

  const deleteHandler = (id) => {
    // find a person and ask user to confirm 
    const personRecord = persons.find(person => person.id === id);

    // return if confirm mation is cancel
    if (window.confirm(`Delete ${personRecord.name}?`) === false){
      return; 
    }
    
    // send person and id for delete 
    personService
    .deleteRecord(id)
    .then(returnedPerson => { 
      // the returnedPerson contain empty array. that means success

      // we update our frontend here by filtering out deleted id from array
      // we set new data we just update
      setPersons(persons.filter(person => person.id !== id));
      
    })
    
    
  }

  


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message.text} flag={message.flag}/>
      <Filter handleSearch={handleSearch}/>
   
      <h2>Add a new</h2>
      <PersonForm
        addNewInfo={addNewInfo}
        newPerson={newPerson}
        handleNewPerson={handleNewPerson}
      />

      <h2>Numbers</h2>
     
      <Persons phoneBook={peopleToShow} deleteHandler={deleteHandler}/>
      
    </div>
  )
}

export default App
