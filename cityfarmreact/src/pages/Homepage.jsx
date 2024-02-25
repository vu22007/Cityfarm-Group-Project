import Eevent from "../assets/example event.png"
import React, {useEffect, useState} from "react";
import axios from "../api/axiosConfig";
import "./Homepage.css"
import { getConfig } from '../api/getToken';
import {Button} from "@mui/material";
import AnimalPopover from "../components/AnimalPopover";
const WH = "WH", HC = "HC", SW = "SW";
const Homepage = () => {

  const [events,setEvents] = useState([])
  const token = getConfig();

  const eventsConversion=(events)=>{
    let changed=[]
    for (let i=0;i<events.length;i++){
        changed.push(
            {
                title : events[i].event.title,
                allDay: events[i].event.allDay,
                start: new  Date(events[i].start),
                end: new  Date(events[i].end),
                farms: events[i].event.farms,
                animals: events[i].event.animals,
                description: events[i].event.description,
                enclosures: events[i].event.enclosures
            }
        )
    }
    console.log(changed)
    return changed
}
  useEffect(() => {
        (async () => {
            try {
                const start = new Date()
                const end =  new Date()
                end.setMonth(end.getMonth()+2)
                console.log(start.getMonth(),end.getMonth())
                const response = await axios.get(`/events`, {params: {from: start.toISOString(), to: end.toISOString()}, ...token});
                setEvents(eventsConversion(response.data.slice(0, 5)));
            } catch (error) {
                window.alert(error);
            }
        })();
    }, []);

  return(<>
      <h1>City Farm Livestock Manager</h1>
      Welcome to the livestock manager application for the livestock managers of
    city farms across the Bristol area! For redirection to the main sites of the farms click here:
    <ul>
      <li> <a href="https://www.windmillhillcityfarm.org.uk/" target="_blank">Windmill Hill</a></li>
      <li> <a href="https://www.swcityfarm.co.uk/" target="_blank">St Werburghs</a></li>
      <li> <a href="https://hartcliffecityfarm.org.uk/" target="_blank">Hartcliffe</a></li>
    </ul>
    On the left is the side menu, this contains various ways to manage livestock across the three farms. Below are instructions and help to navigate your way around the application, click the headers to reveal their content.


      <h2>Upcoming Events:</h2>
    <div className="events-container">
    {events.map((e)=>(
        <div className="event-box" key={e.title}>
             <h2>{e.title}</h2>
             {
                 e.allDay ?
                     <div>
                         <p>{e.start.toLocaleDateString()} {e.end == null ? <></> : e.end.toLocaleDateString() === e.start.toLocaleDateString() ? <></> : " - " + e.end.toLocaleDateString()}</p>
                     </div>
                     :
                     <div>
                         <p>{e.start.toLocaleString([], {year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute:'2-digit'})} - {e.start.toLocaleDateString() === e.end.toLocaleDateString() ? e.end.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}): e.end.toLocaleString([], {year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute:'2-digit'})}</p>
                     </div>

             }
             {e.farms.length !== 0 ? <h3>Farms</h3> : <></>}
             {e.farms.includes(WH) ? <p>Windmill Hill</p> : <></>}
             {e.farms.includes(HC) ? <p>Hartcliffe</p> : <></>}
             {e.farms.includes(SW) ? <p>St Werberghs</p> : <></>}
             {e.animals.length !== 0 ? <h3>Animals</h3> : <></>}
             {e.animals.map((animalID) => (
                 <AnimalPopover key={animalID._id} animalID={animalID._id}/>
             ))}
             {e.enclosures.length !== 0 &&
                 <div>
                     <h3>Enclosures</h3>
                     {e.enclosures.map((enclosureName, index) => (
                         <p key={index}>{enclosureName}</p>
                     ))}
                 </div>}
             {e.description !== "" ?
                 <div>
                     <h3>Description</h3>
                     {e.description}
                 </div> : <></>}
         </div>
     ))}
    </div>





</>)
}
export default Homepage