import { useState } from 'react'
import { Button } from 'react-bootstrap'

const Togglable = (props) => {
  const [visibility, setVisibility] = useState(false)

  const showControl = { display: visibility ? '' : 'none' }
  const hideControl = { display: visibility ? 'none' : '' }

  const changeVisibility = () => setVisibility(!visibility)

  return (
    <div>
      <div style={hideControl}>
        <Button onClick={changeVisibility} variant="primary">{props.buttonName}</Button>
      </div>
      <div style={showControl}>
        {props.children}
        <Button onClick={changeVisibility} variant="danger">cancel</Button>
      </div>
    </div>
  )
}


export default Togglable
