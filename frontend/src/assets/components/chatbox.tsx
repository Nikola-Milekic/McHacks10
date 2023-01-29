import { useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import Grid from "@mui/material/Grid";
import Textarea from "@mui/joy/Textarea";
import { useContext } from "react";
import { MyGlobalContext } from "../../App";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Button from "@mui/material/Button";

function Chatbox() {
 const {buddyName, setBuddyName} = useContext(MyGlobalContext)
  const [query, setQuery] = useState("");
  const handleInput = (event: any) => {
    console.log(event.target.value)
    if(event.target.id === "query"){
        if(event.target.value.length <= 300){
          setQuery(event.target.value);
        }
    }
  };
  const getMessages: () => any = async () =>{
    const URL = `http://localhost:3001/chat/fred`;
    const response = await axios.get(URL)
    return response;
  };

  const { data: getMessageData, refetch: reGetMessages, isSuccess: getSuccess, isLoading: getLoading } = useQuery(
    ["getMessages"],
    getMessages,
    { enabled: true }
    );

    
  const sendMessage: () => any = async () =>{
    const URL = `http://localhost:3001/chat/fred`;
    const response = await axios.post(URL,{
      prompt: query
    })
    return response;
  };

  const { data: messageData, refetch: resendMessage, isSuccess: messageSuccess, isLoading: messageLoading } = useQuery(
    ["sendMessage"],
    sendMessage,
    { enabled: false }
    );
  const handleSubmit = () => {
    console.log(query);
    
    if(query.length > 0){
      resendMessage();
      setQuery("");
    }
  };
  useEffect(() => {
    console.log(messageData);
  }, [messageData]);

  useEffect(() => {
    console.log(getMessageData);
  }, [getMessageData]);

  if (getLoading) {
    return <div>Loading...</div>;
  }
  else if (messageSuccess){
    <>
    <div className="flex items-center mt-6 mb-0 space-y-4 rounded-lg p-8 shadow-xl mx-8 max-w-2xl">
      <Grid container spacing={1} sx={{borderRadius:'22px',alignItems:'center'}}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        </Grid>
      </Grid>
      <Textarea slotProps={{
        textarea:{
            id: 'query',
        }
        }} sx={{width:'100%'}} onChange={event => handleInput(event)} minRows={3} placeholder="Could be Anything :)" value={query}>
      </Textarea>
      <Button variant="contained" onClick={handleSubmit}>Submit</Button>
    </div>
    </>
  }
  if (getSuccess) {
    return (
      <>
      <div className="flex items-center mt-6 mb-0 space-y-4 rounded-lg p-8 shadow-xl mx-8 max-w-2xl">
        <Grid container spacing={1} sx={{borderRadius:'22px',alignItems:'center'}}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          </Grid>
        </Grid>
        <Textarea slotProps={{
          textarea:{
              id: 'query',
          }
          }} sx={{width:'100%'}} onChange={event => handleInput(event)} minRows={3} placeholder="Could be Anything :)" value={query}>
        </Textarea>
        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
      </div>
      </>
    );     
  }

  return (
    <>
    <div className="flex items-center mt-6 mb-0 space-y-4 rounded-lg p-8 shadow-xl mx-8 max-w-2xl">
      <Grid container spacing={1} sx={{borderRadius:'22px',alignItems:'center'}}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        </Grid>
      </Grid>
      <Textarea slotProps={{
        textarea:{
            id: 'query',
        }
        }} sx={{width:'100%'}} onChange={event => handleInput(event)} minRows={3} placeholder="Could be Anything :)" value={query}>
      </Textarea>
      <Button variant="contained" onClick={handleSubmit}>Submit</Button>
    </div>
    </>
  );     
}
export default Chatbox;
