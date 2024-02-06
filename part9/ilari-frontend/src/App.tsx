import { useEffect, useState } from "react"
import { DiaryEntry } from "./types"
import { createDiary, getAllDiaries } from "./services/diaryService"

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])
  const [message, setMessage] = useState('');
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('great');
  const [weather, setWeather] = useState('sunny');
  const [comment, setComment] = useState('');

  useEffect(() => {
    getAllDiaries().then(data => setDiaries(data))
  }, [])

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const content = { date, weather, visibility, comment }
    createDiary(content)
      .then(data => {
        if (data) setDiaries(diaries.concat(data));
      })
      .catch(error => {
        setMessage(String(error));
        setTimeout(() => {
          setMessage('');
        }, 5000);
      });

    setDate('')
    setComment('')
  };

  //console.log('visibility', visibility);
  return (
    <div>
      <div>
        <h3>Add new entry</h3>

        {message && <p style={{ color: 'red' }}>{message}</p>}

        <form onSubmit={diaryCreation}>
          <div>date<input type="date" value={date} onChange={(event) => setDate(event.target.value)} /></div>
          <div>
            visibility
            great<input type="radio" name="visibility" defaultChecked value="great" onChange={(event) => setVisibility(event.target.value)} />
            good<input type="radio" name="visibility" value="good" onChange={(event) => setVisibility(event.target.value)} />
            ok<input type="radio" name="visibility" value="ok" onChange={(event) => setVisibility(event.target.value)} />
            poor<input type="radio" name="visibility" value="poor" onChange={(event) => setVisibility(event.target.value)} />
          </div>
          <div>
            weather
            sunny<input type="radio" name="weather" defaultChecked value="sunny" onChange={(event) => setWeather(event.target.value)} />
            rainy<input type="radio" name="weather" value="rainy" onChange={(event) => setWeather(event.target.value)} />
            cloudy<input type="radio" name="weather" value="cloudy" onChange={(event) => setWeather(event.target.value)} />
            stormy<input type="radio" name="weather" value="stormy" onChange={(event) => setWeather(event.target.value)} />
            windy<input type="radio" name="weather" value="windy" onChange={(event) => setWeather(event.target.value)} />
          </div>
          <div>comment<input value={comment} onChange={(event) => setComment(event.target.value)} /></div>
          <button type="submit">add</button>
        </form>
      </div>

      <h3>Diary entries</h3>
      {diaries.map(diary => (
        <div key={diary.id}>
          <p><b>{diary.date}</b></p>
          <div>visibility: {diary.visibility}</div>
          <div>weather: {diary.weather}</div>
        </div>
      ))}      
    </div>
  )
}

export default App
