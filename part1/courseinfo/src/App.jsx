const Header = (props) => {
  console.log(props)
  return (
      <h1>{props.name}</h1>
  )
} 

const Part = (props) => {
  return (
      <p>
        {props.part} {props.exercise}
      </p>
  )
}

const Content = (props) => {
  return (
    <div>
      {props.parts.map((element, index) => 
          <Part key={index} part={element.name} exercise={element.exercises}></Part>
      )}
    </div>
  )
}

const Total = (props) => {
  return (
      <p>Number of exercises {props.parts.reduce((total, element) => total + element.exercises, 0)}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div> 
      <Header name={course.name}></Header>
      <Content parts={course.parts}></Content>
      <Total parts={course.parts}></Total>
    </div>
  )
}

export default App