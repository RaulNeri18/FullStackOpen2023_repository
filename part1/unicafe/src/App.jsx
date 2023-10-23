import { useState } from "react"

const Button = (props) => <button onClick={props.clickFunction}>{props.name}</button>

const StatisticsLine = (props) => (
  <tr>
    {props.text === 'positive' ? (
      <>
        <td>{props.text}</td>
        <td>{props.value} %</td>
      </>
    ) : (
      <>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </>
    )}
  </tr>
)

const Statistics = (props) => (
  <table>
    <StatisticsLine text='good' value={props.good}></StatisticsLine>
    <StatisticsLine text='neutral' value={props.neutral}></StatisticsLine>
    <StatisticsLine text='bad' value={props.bad}></StatisticsLine>
    <StatisticsLine text='all' value={props.all}></StatisticsLine>
    <StatisticsLine text='average' value={props.average}></StatisticsLine>
    <StatisticsLine text='positive' value={props.positive}></StatisticsLine>
  </table>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad
  const average = (good + bad * (-1)) / all || 0
  const positive = (good / all) * 100 || 0

  return (
    <div>
      <h1>give feedback</h1>
      <Button name='good' clickFunction={() => setGood(good + 1)}></Button>
      <Button name='neutral' clickFunction={() => setNeutral(neutral + 1)}></Button>
      <Button name='bad' clickFunction={() => setBad(bad + 1)}></Button>

      <h1>statistics</h1>
      {(all > 0) ? (
        <div>
          <Statistics good={good} neutral={neutral} bad={bad} 
                      all={all} average={average} positive={positive}></Statistics>
        </div>
      ): <div>No feedback given</div> }
    </div>
  )
}

export default App
