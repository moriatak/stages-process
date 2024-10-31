import { useState, useEffect} from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } 
    from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPen, faFilePdf, faQuestionCircle} from '@fortawesome/free-solid-svg-icons'
import Tooltip from '@mui/material/Tooltip';
import './TableStages.css';
import logo from '../assets/tak-logo.png';


export default function TableStages({setStageToUpdate, setOpenEditModal, haveChange}) {
    const [stages, setStages] = useState([]);

    useEffect(() => {
        fetchDatatStagesProcess();
    }, [haveChange])

    const fetchDatatStagesProcess = async () => {
        const apiKey = "7sKFf8@Af:+v4Ym|Ef*L^$8";
        const apiUrl = "https://tak.co.il/td/api/admin/server.php";
        const formData = new FormData();
        formData.append("get_stages_of_process", "true");
        formData.append("apiKey", apiKey);
        const searchParams = new URLSearchParams(window.location.search);
        const p_id = searchParams.get('p_id');
        
        formData.append("p_id", p_id);

        try {
            const response = await fetch(apiUrl, {
                method: "POST", body: formData,
            });
            if (response.ok) {
                const jsonResponse = await response.json();
                if (jsonResponse.success) {
                    // if in process, set data stages
                    setStages(jsonResponse.stages);
                    console.log("response", jsonResponse)
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
    <TableContainer component={Paper} dir="rtl" className='table-container'>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow className='MuiTableHead-title'>
            <TableCell align="right">סוג</TableCell>
            <TableCell align="right" >שם</TableCell>
            <TableCell align="right">מידע נוסף</TableCell>
            <TableCell align="right">פרטים נוספים</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stages.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {/* <TableCell component="th" scope="row">{row.TdRecKot}</TableCell> */}
              <TableCell align="right" style={{ textAlign: "center", padding: "4px" }}>{row.TdSugRec == 0 ? 
                <Tooltip title="דף נחיתה">
                  <img src={logo} style={{width: "70px"}}/>
                  {/* <FontAwesomeIcon icon={faQuestionCircle}/>  */}
                </Tooltip>
                : <Tooltip title="מסמך לחתימה">
                    <FontAwesomeIcon icon={faFilePdf} />
                  </Tooltip>
              }</TableCell>
              <TableCell align="right">{row.TdRecKot}</TableCell>
              <TableCell align="right">{row.TdRecDes}</TableCell>
              <TableCell align="right" className='clickable' onClick={() => {setStageToUpdate(row); setOpenEditModal(true);}}>
              <Tooltip title="עריכה">
                <FontAwesomeIcon icon={faPen} style={{ margin: '0 47%' }} />
              </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
