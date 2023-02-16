import React from 'react'
import ReactDOM from 'react-dom/client'
// redux toolkit
import {Provider} from 'react-redux';
import store from './store';
import { fetchUsers } from './store/features/usersSlice'

import { worker } from './api/server'

import App from './App'
// import './index.css'

const main = async () => {
  store.dispatch(fetchUsers())
  // 启动 mock API server
  await worker.start({ onUnhandledRequest: 'bypass' })
  store.dispatch(fetchUsers())

  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
  )
}
main()


