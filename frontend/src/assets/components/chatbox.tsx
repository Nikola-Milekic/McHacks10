import { useEffect, useMemo, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import Grid from "@mui/material/Grid";
import Textarea from "@mui/joy/Textarea";
import { useContext } from "react";
import { MyGlobalContext } from "../../App";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Button from "@mui/material/Button";
import { Box, Typography } from "@mui/material";
import { textAlign } from "@mui/system";

interface messageType {
  user: string,
  bot: string,
}

function Chatbox() {
 const {buddyName, setBuddyName} = useContext(MyGlobalContext)
  const [query, setQuery] = useState("");
  const [isLoad, setIsLoad] = useState(false);
  const [data,setData] = useState([] as messageType[])

  const handleInput = (event: any) => {
    console.log(event.target.value)
    if(event.target.id === "query"){
        if(event.target.value.length <= 300){
          setQuery(event.target.value);
        }
    }
  };
  const getMessages: () => any = async () =>{
    const URL = `http://localhost:3001/chat/${buddyName}`;
    const response = await axios.get(URL)
    return response;
  };

  const { data: getMessageData, refetch: reGetMessages, isSuccess: getSuccess, isLoading: getLoading } = useQuery(
    ["getMessages"],
    getMessages,
    {
      onSuccess: (data) => {
        console.log("get success")
        console.log(data)
        setData(data.data)
      },
      enabled: true      
    }
    );

    
  const sendMessage: () => any = async () =>{
    const URL = `http://localhost:3001/chat/${buddyName}`;
    const response = await axios.post(URL,{
      prompt: query
    })
    return response;
  };

  const { data: messageData, refetch: resendMessage, isSuccess: messageSuccess, isLoading: messagesLoading } = useQuery(
    ["sendMessage"],
    sendMessage,
    { 
      onSuccess:(data) => {
        console.log("post success")
        console.log(data)
        setIsLoad(false)
        setData(data.data)
      },
      enabled: false 
    }
    );
  const handleSubmit = () => {
    if(query.length > 0){
      setIsLoad(true)
      resendMessage();
      setQuery("");
    }
  };

  useEffect(() => {
    console.log("hihi")
    reGetMessages();

  }, [buddyName]);

  useEffect(() => {
    console.log(buddyName);
    console.log(getMessageData);
  }, [getMessageData]);


  return (
    <>
    <div className="flex items-center mt-6 mb-0 space-y-4 rounded-lg p-8 shadow-xl mx-8">
      <Grid container spacing={1} sx={{borderRadius:'22px',alignItems:'center'}}>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
        {data.map((message:any) =>(
              <div>
                <Box sx={{display:"flex",alignItems: 'center', marginBottom:"10px"}}>
                  <Typography sx={{paddingRight:"7px"}}>User:</Typography>
                <Box sx={{ border: 1, borderRadius: '16px', borderColor: 'green', borderWidth:"3px", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center"}}>
                  <Typography sx={{paddingY:"5px", paddingX:"8px"}}>{message.user}</Typography>
                </Box>
                </Box>
                <Box sx={{display:"flex",alignItems: 'center', marginBottom:"10px"}}>
                  <Typography sx={{paddingRight:"16px"}}>Bot:</Typography>
                <Box sx={{ border: 1, borderRadius: '16px', borderColor: 'gray', borderWidth:"3px", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center"}}>
                  <Typography sx={{paddingY:"5px", paddingX:"8px"}}>{message.bot}</Typography>
                </Box>
                </Box>
              </div>
            ))}
        </Grid>
      </Grid>
      {!isLoad ? (<>
      <Textarea slotProps={{
        textarea:{
            id: 'query',
        }
        }} sx={{width:'100%'}} onChange={event => handleInput(event)} minRows={3} placeholder="Could be Anything :)" value={query}>
      </Textarea>
      <Button variant="contained" onClick={handleSubmit}>Submit</Button></>): (<div>
    <p>Loading...</p>
  </div>)}
    </div>
  </>);     
 } 
export default Chatbox;
