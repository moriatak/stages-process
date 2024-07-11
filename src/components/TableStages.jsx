import { useState, useEffect} from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } 
    from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPen} from '@fortawesome/free-solid-svg-icons'
import './TableStages.css';

export default function TableStages() {
    const [stages, setStages] = useState([]);

    useEffect(() => {
        fetchDatatStagesProcess();
    }, [])

    const fetchDatatStagesProcess = async () => {
        const apiKey = "7sKFf8@Af:+v4Ym|Ef*L^$8";
        const apiUrl = "https://tak.co.il/td/api/server.php";
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
    <TableContainer component={Paper} dir="rtl">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow className='MuiTableHead-title'>
            <TableCell align="right" >שם</TableCell>
            <TableCell align="right">מידע נוסף</TableCell>
            <TableCell align="right">פרטים נוספים</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stages.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {/* <TableCell component="th" scope="row">{row.TdRecKot}</TableCell> */}
              <TableCell align="right">{row.TdRecKot}</TableCell>
              <TableCell align="right">{row.TdRecDes}</TableCell>
              <TableCell align="right">
                <FontAwesomeIcon icon={faPen} style={{ margin: '0 47%' }} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
