import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import {Link} from "react-router-dom";
import './AnimalPopover.css'
import axios from "../api/axiosConfig";
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';

const aExamples = [
    {
        name: "Loading...",
    }
]

const AnimalPopover = (props) => {
    const colour = useTheme().palette.mode === 'light' ? 'black' : 'white';

    const [anchorEl, setAnchorEl] = useState(null);
    const [chosenAnimal, setChosenAnimal] = useState(aExamples[0]);
    const [animalMother, setMother] = useState("Unregistered")
    const [animalFather, setFather] = useState("Unregistered")

    const handlePopoverOpen = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    useEffect(() => {
        (async () => {
        try {
            const response = await axios.get(`/animals/by_id/${props.animalID}`);
            setChosenAnimal(response.data);
        } catch (error) {
            window.alert(error);
        }})()
    }, [props.animalID]);

    useEffect(()=>{
        if(chosenAnimal.mother){
            (async ()=>{
            try{
                const mother = await axios.get(`/animals/by_id/${chosenAnimal.mother}`);
                setMother(mother.data.name);
            }catch(error){
                window.alert(`mother issue \n ${error}`)
            }})()}
        if (chosenAnimal.father){
            (async ()=>{
            try{
                const father = await axios.get(`/animals/by_id/${chosenAnimal.father}`);
                setFather(father.data.name);
            }catch(error){
                window.alert(`father issue \n ${error}`)
            }})()
        }

    },[chosenAnimal])

    return (
        <div>
            <Typography
                aria-owns={open ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
                style={{display: 'inline-block', margin: '2.5px 0'}}
            >
                <Link style={{color: colour}} to={`/single-animal/${chosenAnimal._id}`}>{chosenAnimal.name}</Link>
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
                <Typography sx={{ p: 1, whiteSpace: 'pre-line' }}>
                    {`Type: ${chosenAnimal.type}`}<br/>
                    {`Father: ${animalFather}`}<br/>
                    {`Mother: ${animalMother}`}<br/>
                    {chosenAnimal.male ? 'Sex: Male' : 'Sex: Female'}
                </Typography>
            </Popover>
        </div>
    );
}

export default AnimalPopover;