
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { MyGlobalContext } from "../../App";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";

interface buddyType {
    name: string,
  }
function BuddyList(){
    const[buddies,setBuddies] = useState([] as buddyType[])
    const {buddyName, setBuddyName} = useContext(MyGlobalContext)
    const getBuddies: () => any = async () =>{
        const URL = `http://localhost:3001/list-personas`;
        const response = await axios.get(URL)
        return response;
      };
      
      const { data: buddyData, refetch: reBuddies, isSuccess: getSuccess, isLoading: getLoading } = useQuery(
        ["getBuddies"],
        getBuddies,
        {
          onSuccess: (data) => {
            console.log("get success")
            console.log(data)
            setBuddies(data)
          },
          enabled: true      
        }
    );
    const handleChange = (event:any) => {
        console.log("change")
        setBuddyName(event.target.value);
    }
        
    return(
        (getSuccess) ? (<>
        <Box sx ={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <FormControl sx={{width:'60%'}}>
                    <InputLabel id="demo-simple-select-label">Choose a Buddy</InputLabel>
                    <Select
                        labelId="labelSelect"
                        id="SelectID"
                        value={buddyName}
                        label="Choose a Buddy"
                        placeholder="Choose a different buddy!"
                        onChange={(event => handleChange(event))}
                    >
                        {buddyData.data.map((buddy:any) =>(
                        <MenuItem key={buddy} value={buddy}>{buddy}</MenuItem>
                    ))}
                </Select>
                </FormControl>
        </Box>
            
        </> )
        : (<div>
    </div>));
}
export default BuddyList;

