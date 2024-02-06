import { TotalProps } from "../types"

  
const Total = (props: TotalProps) => {
  return (
    <div>
      Number of exercises {props.totalExercises}
    </div>
  )
}

export default Total