import { useState } from 'react'
import './App.css'
import TableStages from './components/TableStages'
// import Draggable from './try_draggable/Draggable'

function App() {

  return (
    <>
    <div className='title-home'>עריכת שלבי התהליך</div>
    <TableStages />
    {/* <Draggable /> */}
    </>
  )
}

export default App
