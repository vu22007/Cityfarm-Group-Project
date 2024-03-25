import Tabs, {tabsClasses} from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import "./FarmTabs.css";
import { React, useState } from 'react';
import { ThemeProvider, useTheme } from "@emotion/react";
import { createTheme } from "@mui/material";

const FarmTabs = (props) => {
    const farms = props.farms;

    var tabTheme = createTheme(useTheme());
    var mainTheme = useTheme();

    if (props.selectedFarm) {
        tabTheme.palette.primary.main = mainTheme.palette[farms[props.selectedFarm]].main;
    } else {
        if (props.selectedFarm != null) {
            tabTheme.palette.primary.main = mainTheme.palette.green.main;
        }
    }

    function readableFarm(farm) {
        switch(farm) {
            case "WH": return 'Windmill Hill';
            case "HC": return 'Hartcliffe';
            case "SW": return 'St Werburghs';
            default: return 'Loading...';
        }   
    }

    return (
        <div className="tab-container">
            <ThemeProvider theme={tabTheme}>
                <Tabs
                    variant='scrollable'
                    scrollButtons='auto'
                    value={props.selectedFarm}
                    onChange={(e, farm)=>{props.setSelectedFarm(farm)}}
                    sx={{
                        [`& .${tabsClasses.scrollButtons}`]: {
                          '&.Mui-disabled': { opacity: 0.3 },
                        },
                    }}
                >
                    <Tab value={null} label="All"/>
                    {Object.values(farms).map((farm) => <Tab key={farm} value={farm} label={readableFarm(farm)}/>)}
                    {/*<Tab value={farms.WH} label="Windmill Hill"/>
                    <Tab value={farms.HC} label="Hartcliffe"/>
                    <Tab value={farms.SW} label="St Werburghs"/>*/}
                </Tabs>
            </ThemeProvider>
        </div>
    );
}

export default FarmTabs;
