
const Person = ({person}) => (
    <div>
        {person.name} {person.number}
    </div>
)

const Persons = (props) => {
    return (
        <>
            {props.personsFiltered.map(person => <Person key={person.id} person={person}/>)}
        </>
    )
}

export default Persons