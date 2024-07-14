

import { useState } from 'react'
import './EditStage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

function EditStage({stageToUpdate, closeModal}) {
    const [formData, setFormData] = useState(stageToUpdate);
    const [isDelete, setIsDelete] = useState(false);
    
    const nameRegex = /^[a-zA-Z\s\u0590-\u05FF]+$/; // Only letters, spaces, and Hebrew characters allowed
    const [nameError, setNameError] = useState('');
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      if(nameError) setNameError(false);
      setFormData({ ...formData, [name]: value });
    };
    const handleInpuTypeChange = (e) => {
        const { name, value } = e.target;
        if(value < 0) return;
        setFormData({ ...formData, [name]: value });
      };
    const handleCheckboxChange = (e) => {
      const { name, checked } = e.target;
      setFormData({ ...formData, [name]: checked });
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
      updateDetailsField(formData); 
    //   closeModal();
    }
  return (
    <div className="container-modal">
      <div className="content-modal" style={{margin: "20vh auto"}}>
        <p>אנא מלאו פרטים על שדה זה</p>
        <form>
          <div className="form-group">
            <label htmlFor="name" className="form-label">שם:</label>
            <input
              type="text"
              id="name"
              name="name"
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
              name="name"
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
              name="type"
              value={formData.TdSugRec}
              onChange={handleInpuTypeChange}
              className="form-select"
            >
              <option value="-1">בחר סוג</option>
              <option value="1">מסמך לחתימה דיגיטלית</option>
              <option value="0">דף נחיתה</option>
            </select>
          </div>

          <div className="form-group">
            {formData.TdSugRec >=0 && (formData.TdSugRec == 1 ? 
            <div>
                <label htmlFor="type" className="form-label">בחירת מסמך לחתימה:</label> 
                <div>רשימת הקמפיינים של החברה</div>
            </div> :
            <div>
                <label htmlFor="type" className="form-label">בחירת דף נחיתה:</label>
                <div>רשימת תהתבניות של החברה</div>
            </div>
            )}
          </div>
        
        </form>
        <div className='buttons-modal'>
          <div className="close-button" onClick={closeModal} >סגור</div>
          <div className='action-button'>
            <FontAwesomeIcon icon={faTrash} size="lg" onClick={() => { setIsDelete(true) }} />
            <div className="submit-button" onClick={savedFiled} >שמור</div>
          </div>
        </div>
      </div>
      {/* {isDelete && <Modal
        closeModal={closeModalIsDelet}
        actionModal={deleteField}
        paramsToAction={formData.id}
        title={'מחיקה'}
        text={'האם אתה בטוח שברצונך למחוק שדה זה?'}
        textActionButton={'מחק'} />} */}

    </div>

  );
}

export default EditStage
