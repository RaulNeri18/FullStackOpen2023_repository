import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import {
  BrowserRouter as Router,
} from 'react-router-dom'
import './index.css'
import store from './store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
)
