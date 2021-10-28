import ReactDOM from 'react-dom'
import VConsole from 'vconsole'
import App from './App'

import './main.less'
import 'babel-polyfill'

import 'virtual:windi.css'
;(import.meta as any).env.DEV && new VConsole()

ReactDOM.render(<App />, document.getElementById('root'))
