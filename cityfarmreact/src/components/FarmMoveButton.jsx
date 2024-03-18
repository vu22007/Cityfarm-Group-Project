import Button from "@mui/material/Button";
import React from "react";
import axios from "../api/axiosConfig";
import {getConfig} from "../api/getToken";

const FarmMoveButton = (props) => {
    const token = getConfig();

    function farmMove(ids,farm){
        for (let a of ids){
            let animal;
            (async () => {
                try {

                    const response = await axios.get(`/animals/by_id/${a}`,token);
                    animal=response.data
                    animal.farm=farm[0]
                    await axios.patch(`/animals/by_id/${a}`, animal, token)

                } catch (error) {

                    if (error.response.status === 401) {
                        window.location.href = "/login";
                        return;
                    } else {
                        window.alert(error);
                    }
                };
            })()



        }

    }
    return <Button onClick={() =>farmMove(props.ids,props.farm)}> Move to {Object.entries(props.farm)[0][1]} </Button>
}

export default FarmMoveButton