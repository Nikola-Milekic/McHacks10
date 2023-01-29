import { useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import Grid from "@mui/material/Grid";
import Textarea from "@mui/joy/Textarea";

function Chatbox() {
  const [query, setQuery] = useState("");

  const handleInput = (event: any) => {
    console.log(event.target.value)
    if(event.target.id === "query"){
        if(event.target.value.length <= 300){
          setQuery(event.target.value);
        }
    }
  };

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
    </div>
    </>
  );     
}
export default Chatbox;
