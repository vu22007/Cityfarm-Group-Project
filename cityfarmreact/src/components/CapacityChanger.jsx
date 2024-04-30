import React, { useState, useEffect } from "react";
import axios from '../api/axiosConfig'
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import {Button, Backdrop, Alert} from "@mui/material";
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import {Link} from "react-router-dom";
import { Help } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

import { getConfig } from '../api/getToken';

const CapacityChanger = (props) => {
    const [linkedCapacities, setLinkedCapacities] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [schemaList, setSchemaList] = useState([]); /* The State for the list of schemas. The initial state is [] */
    const [showErr, setShowErr] = useState(false);

    const token = getConfig();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handlePopoverOpen = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };
    function displayAll() {
        (async () => {
            try {
                const response = await axios.get(`/schemas`, token);
                setSchemaList(response.data.reverse());
                setLinkedCapacities(props.enclosure.capacities);
            } catch (error) {
                if (error.response.status === 401) {
                    window.location.href = "/login";
                    return;
                } else {
                    window.alert(error);
                }
            }
        })()
    } 
    
    useEffect (() => {
        (async () => {
            if (searchTerm === '') {
                displayAll();
                return;
            }
            try {
                const response = await axios.get(`/schemas/by_name/${searchTerm}`, token);
                setSchemaList(response.data.reverse());
            } catch (error) {
                if (error.response.status === 401) {
                    window.location.href = "/login";
                    return;
                } else {
                    window.alert(error);
                }
            }
        })()
    },[searchTerm])

    const rows = schemaList.map((schema) => ({
        id: schema._name,
        number: linkedCapacities[schema._name] == null ? 0 : linkedCapacities[schema._name],
    }));

    const cols = [
        { field: 'id', headerName: 'Type', headerClassName: 'grid-header', headerAlign: 'left', flex: 1} ,
        { field: 'number', editable: true, headerName: 'Capacity', headerClassName: 'grid-header', headerAlign: 'left', flex: 1 },
    ];

    return (
        <div>
            <TextField
                size='small'
                placeholder='Search'
                style={{margin: '0 20px 20px 0'}}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
                        <div style={{top: '15px', right:'20px', position: "absolute"}}>
            <Link to="/help">
            <Typography
                aria-owns={open ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
                style={{display: 'inline-block', margin: '2.5px 0'}}
            >
                <Help/>
            </Typography>
            <Popover
                id="mouse-over-popover"
                sx={{pointerEvents: 'none'}}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <Typography sx={{ p: 1, whiteSpace: 'pre-line' }} maxHeight={400} maxWidth={500}>
                    To set the maximum amount of animals of an animal type in this enclosure, type the number into the capacity section on the same row as that type. <br/> Multiple animal types can be added to a single enclosure.
                </Typography>
            </Popover>
        </Link>
        </div>
            <Paper elevation={3} style={{ marginBottom: '20px'}}>
                <DataGrid
                    autoHeight
                    style={{width: '552px'}}
                    columns={cols}
                    rows={rows}
                    disableRowSelectionOnClick
                    processRowUpdate = {(newVal, oldVal) => {
                        const newInt = parseInt(newVal.number)
                        if (!Number.isInteger(newInt) || newInt < 0 ) { setShowErr(true); console.log("RAAHAHAAHAH");return oldVal; }
                        if (newVal.number === oldVal.number) { return newVal; }
                        props.enclosure.capacities[newVal.id] = newInt
                        return newVal;
                    }}
                />
            </Paper>
            <Button variant='outlined' style={{float: "right"}} onClick={() => {props.close()}}>Close</Button>
            
            <Backdrop style={{zIndex: '4', background: '#000000AA'}} open={showErr} onClick={() => setShowErr(false)}>
                <Alert severity='warning'>
                    Make sure values are integers
                </Alert>
            </Backdrop>

        </div>

        
    )

}

export default CapacityChanger
