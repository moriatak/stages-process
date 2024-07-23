

import { useEffect, useState } from 'react'
import './EditStage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
// import ChooseCompaing from './ChooseCompaing';


function EditStage({stageToUpdate, closeModal, setHaveChange}) {
    const [formData, setFormData] = useState(stageToUpdate);
    const [isDelete, setIsDelete] = useState(false);
    
    useEffect(()=>{
        setHaveChange(false);
    },[])
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
      updatestage(formData); 
    //   closeModal();
    }

    // const handleClickLink = () => {
    //     if (formData.TdRecLink) {
    //         window.open(formData.TdRecLink, '_blank'); // Open the link in a new tab
    //     }
    // };

    const updatestage = async() => {
        const apiKey = "7sKFf8@Af:+v4Ym|Ef*L^$8";
        const apiUrl = "https://tak.co.il/td/api/admin/server.php";
        const formDataToserver = new FormData();
        formDataToserver.append("updateStage", "true");
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
                    closeModal();
                } else {
                    // setErrorTokenPersonal(true);
                }
            } else {                
                // setErrorTokenPersonal(true);
            }
        } catch (error) {
            console.log("error", error);
            // setErrorTokenPersonal(true);
        }
    }

  return (
    <div className="container-modal">
      <div className="content-modal">
        <p>אנא מלאו פרטים על שדה זה</p>
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
            {formData.TdSugRec >=0 && (formData.TdSugRec == 0 ? 
            <div>
                {!formData.TdRecLink ? 
                <div>קישור לדף הנבחר: <span className='clickable-link' onClick={handleClickLink}>{formData.TdRecLink}</span></div> :
                <div>
                    <label htmlFor="type" className="form-label">בחירת מסמך לחתימה:</label> 
                   {/* <ChooseCompaing /> */}
                <div>רשימת הקמפיינים של החברה</div>
                </div>}
            </div> :
            <div>
                {!!formData.TdSetR_ID ? 
                <div>צורף מסמך לחתימה</div> :
                <div>
                    <label htmlFor="type" className="form-label">בחירת דף נחיתה:</label>
                <div>רשימת התבניות של החברה</div>
                </div>}

                
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
