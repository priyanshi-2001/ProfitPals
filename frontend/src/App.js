import React from 'react'


import Login from './Components/Login';
import Signup from './Components/Signup';

import ChannelPartnerLogin from './Components/ChannelPartnerLogin';
import ChannelPartnerPortal from './Components/ChannelPartnerPortal';
import ChannelPartnerSignup from './Components/ChannelPartnerSignup';


import { BrowserRouter, Route,Routes, Link } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
     <Route path="/" element={<Login/>}></Route>
     <Route path="/login" element={<Login/>}></Route>
     <Route path="/signup" element={<Signup/>}> </Route>
     <Route path="/channelPartnerLogin" element={<ChannelPartnerLogin/>}> </Route>
     <Route path="/channelPartnerPortal" element={<ChannelPartnerPortal/>}> </Route>
     <Route path="/channelPartnerSignup" element={<ChannelPartnerSignup/>}> </Route>
    </Routes>
    </BrowserRouter>
  )
}



export default App


