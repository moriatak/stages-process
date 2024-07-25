import { useEffect, useState, useMemo } from 'react'
// import './ChooseCompaing.css'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useData } from '../context/DataContext';

function ChooseCompaing({valueExist, handleChangeLinkCompaing}) {
    const [loading, setLoading] = useState(true);
    const [listCompanig, setListCompanig] = useState([]);
    const [compaingChoosen, setCompaingChoosen] = useState({Name: 'בחר מהרשימה'});
    const linkToCompingChoosen = useMemo(() => (compaingChoosen && compaingChoosen.Token) ? `https://tak.co.il/new/?t=${compaingChoosen.Token}` : '', [compaingChoosen]);
    const { companyId } = useData();
    
    useEffect(()=>{
        getDataCompaing();
    },[]);

    const getDataCompaing = async() => {
        const apiKey = "7sKFf8@Af:+v4Ym|Ef*L^$8";
        const apiUrl = "https://tak.co.il/app/takzivit/portal/pages/admin_page/processes/server.php";
        const formDataToserver = new FormData();
        formDataToserver.append("getListAllCompaing", "true");
        formDataToserver.append("idCompany", companyId); // todo from cookis
        formDataToserver.append("apiKey", apiKey);
        
        try {
            const response = await fetch(apiUrl, {
                method: "POST", body: formDataToserver,
            });
            if (response.ok) {
                const jsonResponse = await response.json();
                if (jsonResponse.success == true) {
                    if(jsonResponse.compaing){
                        setListCompanig(jsonResponse.compaing);
                        if(valueExist){
                          const compingExist = jsonResponse.compaing.find(c => c.Token.trim() === valueExist);
                          compingExist && setCompaingChoosen(compingExist);
                        }
                        setLoading(false);
                    }
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

    const handleClickLink = (link) => {
        window.open(link, '_blank'); // Open the link in a new tab
  };
  return (
    <>
      {loading ? <div>טוען את המידע...</div> : 
      <div>
        <label htmlFor="type" className="form-label">קישור לקמפיין:</label> 
        <Autocomplete
            className='Mui-Autocomplete'
            value={compaingChoosen}
            onChange={(event, newValue) => {
              setCompaingChoosen(newValue);
              if(newValue && newValue.Token){
                handleChangeLinkCompaing(newValue.Token);
              }
            }}
            // inputValue={inputValue}
            // onInputChange={(event, newInputValue) => {
            // }}
            id="controllable-states-demo"
            options={listCompanig}
            getOptionLabel={(option) => option.Name}
            renderOption={(props, option) => (
              <li {...props} key={option.Token}>
                {option.Name}
              </li>
            )}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="רשימת קמפיינים" />}
          />
      {(linkToCompingChoosen && linkToCompingChoosen != '') && <div style={{ 'textAlign': 'end', width: '97%' }}>קישור לדף הנבחר: <span className='clickable-link' onClick={()=> handleClickLink(linkToCompingChoosen)}>{linkToCompingChoosen}</span>  </div>}
        <div>רוצה ליצור קמפיין חדש? <span className='clickable-link' onClick={()=>handleClickLink('https://portal.tak.co.il/admin.php?act=Compaing')}>לחץ כאן</span></div>
      </div>
      }
    </>
  )
}


export default ChooseCompaing;
