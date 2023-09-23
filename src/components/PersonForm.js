const PersonForm = ({addNewInfo, newPerson, handleNewPerson}) =>{
    return (
    <form onSubmit={addNewInfo}>
    <div>
        name:{" "} <input name="name" value={newPerson.name} onChange={handleNewPerson}/>
    </div>
    <div>
        number:{" "} <input name="number" value={newPerson.number} onChange={handleNewPerson}/>
    </div>
    <div>
        <button type="submit">add</button>
    </div>
    </form>
    )
}

export default PersonForm;