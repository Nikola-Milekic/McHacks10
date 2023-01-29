import { createContext, useContext, useState } from "react";

import {
    BrowserRouter,
    Route,
    Routes,
} from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import './App.css';
import Landing from "./pages/Landing";
import Questions from "./pages/Questions";
import BuddyChat from "./pages/BuddyChat";
import React from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 5,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}/>
        <Route path="Questions" element={<Questions />} />
        <Route path="BuddyChat" element={<BuddyChat />} />   
       </Routes>
    </BrowserRouter>
  </QueryClientProvider>
  );
}

export default App;
