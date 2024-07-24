import { useState, useEffect } from 'react'
import './App.css'
import TableStages from './components/TableStages'
import EditStage from './components/EditStage'
// import Draggable from './try_draggable/Draggable'
import { useData } from './context/DataContext';

function MainPage() {
  const { companyId ,updateCompanyIdFomCookis } = useData();
  const [stageToUpdate, setStageToUpdate] = useState({});
  const [openEditModal, setOpenEditModal] = useState(false);
  const [haveChange, setHaveChange] = useState(false);

  useEffect(() => {
    // כשהאתר מוכן, הוא שולח להורה שלו (ל php)
    // שהוא מוכן ואז ההורה ישלח קוקיז לזיהוי
    window.parent.postMessage({ pageLoaded: true }, "https://portal.tak.co.il");

    // Event listener for messages from the parent window
    // הפונקציה שקבלת את הקוקיז
    const messageHandler = (event) => {
      if (event.origin === 'https://portal.tak.co.il') { 
      if (event.data.cookieName) {
          // שמירת הקוקיז
          updateCompanyIdFomCookis(event.data.cookieName);
        }
      }
    };

    window.addEventListener('message', messageHandler);
    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('message', messageHandler);
    };
  }, []);

  const closeModal = ()=>{
    setOpenEditModal(false);
  }

  return (
    <>
    {companyId ? <>
      <div className='title-home'>עריכת שלבי התהליך</div>
      <TableStages setStageToUpdate={setStageToUpdate} setOpenEditModal={setOpenEditModal} haveChange={haveChange}/>
      {openEditModal && stageToUpdate && Object.keys(stageToUpdate).length !== 0 && 
          <EditStage stageToUpdate={stageToUpdate} closeModal={closeModal} setHaveChange={setHaveChange}/>}
      {/* <Draggable /> */}
      </> : <>404 not found</>}
    </>
  )
}

export default MainPage