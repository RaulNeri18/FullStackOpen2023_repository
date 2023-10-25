
const Header = (props) => (
  <h2>{props.name}</h2>
)
 
const Part = (props) => (
  <p>
    {props.part} {props.exercise}
  </p>
)

const Content = (props) => (
  <div>
    {props.parts.map(element => 
        <Part key={element.id} part={element.name} exercise={element.exercises}></Part>
    )}
  </div>
)

const Total = (props) => (
  <p><strong>Total of {props.parts.reduce((total, element) => total + element.exercises, 0)} exercises</strong></p>
)


const Course = ({course}) =>{
  return (
    <div>
      <Header name={course.name}></Header>
      <Content parts={course.parts}></Content>
      <Total parts={course.parts}></Total>
    </div>
  )
}

export default Course