import React, { Suspense } from 'react';
import './App.css'
import { Routes, Route } from 'react-router-dom';
import routers from './routers';

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {
          routers.map((item, index) => {
            return <Route key={index} path={item.path} element={<item.component />} />
          })
        }
      </Routes>
    </Suspense>
  )
}

export default App
