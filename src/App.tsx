import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
// redux toolkit
import {Provider} from 'react-redux';
import store from './store';


import CounterPage from './pages/CounterPage'
import PostsListPage from './pages/PostsListPage'
import AddPostForm from './pages/AddPostForm'
import SinglePostPage from './pages/SinglePostPage'
import EditPostForm from './pages/EditPostForm';
import Navbar from './pages/Navbar';

import './App.css'

function App() {

  const renderProvider = () => {
    return (
      <>
        
          {/* 计数demo */}
          {/* <CounterPage /> */}

          {/* 展示文章列表 */}
          <PostsListPage />
          <AddPostForm />
      </>
    )
  }

  return (
    
    <div className="App">
      <BrowserRouter>
        <Provider store={store}>
          <h1>Redux Toolkit Demo</h1>

          <Navbar />

          <Routes>
            <Route index element={renderProvider()} />
            <Route path="/posts/:postId" element={<SinglePostPage />} />
            <Route path="/editPost/:postId" element={<EditPostForm />} />
          </Routes>
        </Provider>
        
      </BrowserRouter>
      
    </div>
  )
}

export default App
