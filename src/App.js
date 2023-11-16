import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';
import Mainpage from './Components/Mainpage/Mainpage';
import Admin from './Pages/Home/Update/Admin';
// import SignIn from './Components/Signin/Signin';
// import Register from './Components/Register/Register';
import Home from  './Pages/Home/Update/Home';
import Upload from './Components/Upload/Upload';


function App() {
  return (
    <div className="App">
     <BrowserRouter> 
        <Routes>
          <Route path='/' element={<Mainpage />} />
          <Route path='/Home' element={<Home />}/>
          <Route path='/Admin' element={<Admin />}/>
          <Route path='/Upload' element={<Upload/>}></Route>
        </Routes>
      </BrowserRouter> 
    </div>
  );
}

export default App;

