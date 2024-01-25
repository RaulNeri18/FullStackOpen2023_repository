import { useMutation } from "@apollo/client"
import { useState } from "react"
import { ALL_AUTHORS, UPDATE_AUTHOR } from "../queries"
import Select from 'react-select'

const UpdateAuthor = ({ allAuthors }) => {
  const [selectedNameOption, setSelectedNameOption] = useState(null)
  const [born, setBorn] = useState('')

  const [ updateAuthor ] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ],
    onError: (error) => {
      const messages = error.graphQLErrors.map(e => e.message).join('\n')
      console.log(messages)
    }
  })

  const submit = (event) => {
    event.preventDefault()
    if (selectedNameOption) {
      updateAuthor({ variables: { name: selectedNameOption.value, born: parseInt(born) } });
    }
    setSelectedNameOption(null)
    setBorn('')
  }


  const options = allAuthors.map(author => ({ value: author.name, label: author.name }))

  return (
    <div>
      <h2>Set Birthyear</h2>
      
      <form onSubmit={submit}>
        <div>
          <Select defaultValue={null} value={selectedNameOption} onChange={setSelectedNameOption} options={options} />
        </div>
        <div>
          born: <input value={born} onChange={(event) => setBorn(event.target.value) }/>
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default UpdateAuthor