import { ContentProps } from "../types"
import Part from "./Part"


const Content = (props: ContentProps) => {

  return (
    <>
      {props.courseParts.map(part => (
        <Part key={part.name} coursePart={part}></Part>
      ))}
    </>
  )
}

export default Content