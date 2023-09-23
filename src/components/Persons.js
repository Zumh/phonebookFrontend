// component for rendering the list of person's name 
const Person = ({ person , deleteHandler }) => {
    return (
      <div>
        {person.name} {person.number}{" "}
        <button onClick={deleteHandler}>delete</button>
      </div>
    )
  }
  
const Persons = ({ phoneBook, deleteHandler }) => {
  return(
    <div>
      {/* send collection of name objects and display them. we use person's name as key property*/}
      {phoneBook.map(person =>
        <Person 
          key={person.id} 
          person={person} 
          deleteHandler={()=>deleteHandler(person.id)}
        
        />
      )}
    </div>
  );
}

export default Persons;