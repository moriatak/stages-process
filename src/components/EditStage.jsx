

import { useEffect, useMemo, useState } from 'react'
import './EditStage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import ChooseCompaing from './ChooseCompaing';
import Modal from './Modal';
import Loading from './Loading';

function EditStage({stageToUpdate, closeModal, setHaveChange}) {
    const [formData, setFormData] = useState(stageToUpdate);
    const [isDelete, setIsDelete] = useState(false);
    const isAddNew = useMemo(() => !formData.hasOwnProperty('TdSetR_ID'), [formData])
    const [loading, setLoading] = useState(false);
    const [textLoading, setTextLoading] = useState('');
    
    const updateLoding = (isShow, textShow = 'טוען..') =>{
      setLoading(isShow);
      setTextLoading(isShow ? textShow : '');
    }
    
    useEffect(()=>{
        setHaveChange(false);
    },[])
    const nameRegex = /^[a-zA-Z\s\u0590-\u05FF]+$/; // Only letters, spaces, and Hebrew characters allowed
    const [nameError, setNameError] = useState('');
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      if(nameError) setNameError(false);
      if(name == "TdSugRec" && value < 0) return;
      setFormData({ ...formData, [name]: value });
    };

    const handleChangeLinkCompaing = (token) => {
      setFormData({ ...formData, ['TdRecLink']: "https://tak.co.il/new/?t=" + token.trim() });
    };
  
    const closeModalIsDelet = (isCloseAllModal = false) => {
      setIsDelete(false);
    //   isCloseAllModal && closeModal();
    }
    const savedFiled = ()=>{
      if (!nameRegex.test(formData.TdRecKot)) {
        setNameError(true);
        return;
      }
      updatestage(formData); 
    //   closeModal();
    }

    const updatestage = async() => {
      updateLoding(true, 'שומר את המידע..');
      const apiKey = "7sKFf8@Af:+v4Ym|Ef*L^$8";
      const apiUrl = "https://tak.co.il/td/api/admin/server.php";
      const formDataToserver = new FormData();
      if(isAddNew){
        formDataToserver.append("addNewStage", "true");
      } else {
        formDataToserver.append("updateStage", "true");
      }
      formDataToserver.append("apiKey", apiKey);
      formDataToserver.append("stage", JSON.stringify(formData));
      const searchParams = new URLSearchParams(window.location.search);
      const p_id = searchParams.get('p_id');
      console.log("stage: ", formData);
      formDataToserver.append("p_id", p_id);

      try {
          const response = await fetch(apiUrl, {
              method: "POST", body: formDataToserver,
          });
          if (response.ok) {
              const jsonResponse = await response.json();
              if (jsonResponse.success == true) {
                  // if in process, set data stages
                  setHaveChange(true);
                  //  אם זה שדה חדש מסוג מסמך לחתימה, מעביר למסך הוספת המסמך
                  // TdSugRec == "1" סוג שלב - מסמך לחתימה
                  if(formData.TdSugRec == "1" && jsonResponse.stageIdNew){
                    window.parent.postMessage({ movePDFEdit: true, stageId:jsonResponse.stageIdNew }, "https://portal.tak.co.il");
                  } else {
                    closeModal();
                    updateLoding(false);
                  }
              } else {
                  // setErrorTokenPersonal(true);
                  updateLoding(false);
              }
          } else {                
              // setErrorTokenPersonal(true);
              updateLoding(false);
          }
      } catch (error) {
          console.log("error", error);
          // setErrorTokenPersonal(true);
          updateLoding(false);
      }
    }

    const deleteStage = async(stageId) => {
      updateLoding(true, 'מוחק את השלב..');
      const apiKey = "7sKFf8@Af:+v4Ym|Ef*L^$8";
      const apiUrl = "https://tak.co.il/td/api/admin/server.php";
      const formDataToserver = new FormData();
      formDataToserver.append("deleteStage", "true");
      formDataToserver.append("apiKey", apiKey);
      formDataToserver.append("stage_id", stageId);
      const searchParams = new URLSearchParams(window.location.search);
      const p_id = searchParams.get('p_id');
      formDataToserver.append("p_id", p_id);

      try {
          const response = await fetch(apiUrl, {
              method: "POST", body: formDataToserver,
          });
          if (response.ok) {
              const jsonResponse = await response.json();
              if (jsonResponse.success == true) {
                  // if in process, set data stages
                  setHaveChange(true);
                  closeModal();
              } else {
                  // setErrorTokenPersonal(true);
              }
          } else {                
              // setErrorTokenPersonal(true);
          }
          updateLoding(false);
      } catch (error) {
          console.log("error", error);
          // setErrorTokenPersonal(true);
          updateLoding(false);
      }
  }

    return (
    <div className="container-modal">
      <div className="content-modal">
        <div>{isAddNew ? `הוספת` : `עריכת`} שלב:</div>
        <form>
          <div className="form-group">
            <label htmlFor="name" className="form-label">שם:</label>
            <input
              type="text"
              id="name"
              name="TdRecKot"
              value={formData.TdRecKot}
              onChange={handleInputChange}
              className="form-input"
            />
            {nameError && <div style={{color: 'red'}}>שם לא תקין, שם יכול להכיל אותיות בלבד</div>}
          </div>
          <div className="form-group">
            <label htmlFor="name" className="form-label">מידע נוסף:</label>
            <input
              type="text"
              id="name"
              name="TdRecDes"
              value={formData.TdRecDes}
              onChange={handleInputChange}
              className="form-input"
            />
            {nameError && <div style={{color: 'red'}}>שם לא תקין, שם יכול להכיל אותיות בלבד</div>}
          </div>
          <div className="form-group">
            <label htmlFor="type" className="form-label">סוג השלב:</label>
            <select
              id="type"
              name="TdSugRec"
              value={formData.TdSugRec}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="-1">בחר סוג</option>
              <option value="1">מסמך לחתימה דיגיטלית</option>
              <option value="0">דף נחיתה</option>
            </select>
          </div>

          <div className="form-group">
            {formData.TdSugRec >=0 && 
            (formData.TdSugRec == 0 ? 
              <div>
                  <ChooseCompaing valueExist={formData.TdRecLink && formData.TdRecLink.split("?t=")[1]} handleChangeLinkCompaing={handleChangeLinkCompaing}/>
              </div> :
              <div>
                  {!!formData.TdRecKod.trim() ? 
                      <div>צורף מסמך לחתימה 
                        <span className='clickable-link' 
                        onClick={()=> {window.parent.postMessage({ movePDFEdit: true, mpId:formData.TdRecKod }, "https://portal.tak.co.il");}}
                        >לעריכת ה PDF לחץ כאן </span>
                      </div> :
                      <div>
                          {/* <label htmlFor="type" className="form-label">בחירת דף נחיתה:</label> */}
                          {/* <div>רשימת התבניות של החברה</div> */}
                      </div>
                  } 
              </div>
            )}
          </div>
        
        </form>
        <div className='buttons-modal'>
          <div className="close-button" onClick={closeModal} >סגור</div>
          <div className='action-button'>
            <FontAwesomeIcon icon={faTrash} size="lg" onClick={() => { setIsDelete(true) }} className={`${isAddNew && "hideen-button"}`} />
            <div className="submit-button" onClick={savedFiled} >שמור</div>
          </div>
        </div>
      </div>
      {isDelete && <Modal
        closeModal={closeModalIsDelet}
        actionModal={deleteStage}
        paramsToAction={formData.TdSetR_ID}
        title={'מחיקה'}
        text={'האם אתה בטוח שברצונך למחוק שלב זה?'}
        textActionButton={'מחק'} />}
      {loading && <Loading text={textLoading}/>}
    </div>

  );
}

export default EditStage
