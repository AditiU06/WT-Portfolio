import { useState } from 'react'
import './App.css'
import Hello from './components/Hello'
import Array from './components/array'
import ConditionalComponents from './components/ConditionalComponents'
import Counter from './components/Counter'
import Form from './components/Form'

function App() {
  return (
    <div className="App">
      <Hello name="Indira" message="Hiii" phoneno="123456789" />
      <Hello name="Neha" message="Hellooo" phoneno="987654321" />
       <Array /> 
      <ConditionalComponents />
      <Counter />
      <Form />
    </div>
  )
}

export default App
