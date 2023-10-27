const Person = (props) => {
    return (
        <div>
            {props.person.name} {props.person.number} <button onClick={() => props.handleDelete(props.person.id, props.person.name)}>delete</button>
        </div>
    )
}

const Persons = (props) => {
    return (
        <>
            {props.personsFiltered.map(person => <Person key={person.id} person={person} handleDelete={props.handleDelete}/>)}
        </>
    )
}

export default Persons