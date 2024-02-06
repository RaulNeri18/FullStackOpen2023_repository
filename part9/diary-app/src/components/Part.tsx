import { CoursePart, PartProps } from "../types"

  
const Part = (props: PartProps) => {

  const assertNever = (value: never): never => {
    console.log(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
    
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const showControls = (part: CoursePart) => {
    switch (part.kind) {
      case "basic":
        return (
          <>
            <div>{part.description}</div>
          </>
          );
      case "group":
        return (
          <>
            <div>project exercises: {part.groupProjectCount}</div>
          </>
          );
      case "background":
        return (
          <>
            <div>{part.description}</div>
            <div>submit to {part.backgroundMaterial}</div>
          </>
          );
      case "special":
        return (
          <>
            <div>{part.description}</div>
            <div>required skills: {part.requirements.join(', ')}</div>
          </>
          );
      default:
        return assertNever(part);
    }
  }

  return (
    <div>
      <b>{props.coursePart.name} {props.coursePart.exerciseCount}</b>
      {showControls(props.coursePart)}
      <br/>
    </div>
  )
}

export default Part