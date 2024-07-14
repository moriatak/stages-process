import { useState } from 'react'
import './App.css'
import TableStages from './components/TableStages'
import EditStage from './components/EditStage'
// import Draggable from './try_draggable/Draggable'

function App() {

  const [stageToUpdate, setStageToUpdate] = useState({});
  const [openEditModal, setOpenEditModal] = useState(false);

  const closeModal = ()=>{
    setOpenEditModal(false);
  }

  return (
    <>
    <div className='title-home'>עריכת שלבי התהליך</div>
    <TableStages setStageToUpdate={setStageToUpdate} setOpenEditModal={setOpenEditModal}/>
    {openEditModal && stageToUpdate && Object.keys(stageToUpdate).length !== 0 && 
        <EditStage stageToUpdate={stageToUpdate} closeModal={closeModal}/>}
    {/* <Draggable /> */}
    </>
  )
}

export default App
