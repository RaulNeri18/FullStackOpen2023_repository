import { useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = (props) => {
  const [visibility, setVisibility] = useState(false)

  const showControl = { display: visibility ? '' : 'none' }
  const hideControl = { display: visibility ? 'none' : '' }

  const changeVisibility = () => setVisibility(!visibility)

  return (
    <div>
      <div style={hideControl}>
        <button onClick={changeVisibility}>{props.buttonName}</button>
      </div>
      <div style={showControl}>
        {props.children}
        <button onClick={changeVisibility}>cancel</button>
      </div>
    </div>
  )
}

Togglable.propTypes = {
  buttonName: PropTypes.string.isRequired
}

export default Togglable