import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import {Link,  useLocation} from "react-router-dom";
import './AnimalPopover.css'
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import {calData, liveData, encData, typeData, singleData} from '../pages/Help'
import { getConfig } from '../api/getToken';
import question from "../assets/question mark.png";
import singleAnimal from "../pages/SingleAnimal";

const QuestionPopover = () => {

    const colour = useTheme().palette.mode === 'light' ? 'black' : 'white';
    const location = useLocation();
    const [anchorEl, setAnchorEl] = useState(null);

    const handlePopoverOpen = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const getContentForCurrentPath = () => {
        if (location.pathname.startsWith('/single-animal/')){
            return singleData}

        switch (location.pathname) {
            case '/calendar':
                return calData;
            case '/animals':
                return liveData;
            case '/enclosures':
                return encData
            case '/schemas':
                return typeData
            case '/':
                return "This is the homepage, use the bar above to navigate."
            case '/help':
                return "This is the help page, use the bar above to navigate."
            default:
                return "This is an error, go back to a previous page or click the homepage.";
        }
    };


    return (
        <div>
            <Typography
                aria-owns={open ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
                style={{display: 'inline-block', margin: '2.5px 0'}}
            >
                <Link to="/help"><img src={question} width={24} height={24}/></Link>
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
                    {getContentForCurrentPath()}
                </Typography>
            </Popover>
        </div>
    );
}

export default QuestionPopover
