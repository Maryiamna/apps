import { useState } from "react";
import Login from './src/Autentica/index';
import Home from './src/Home/index';


  export default function App(){
    const [user, setUser] = useState();
    return !user ? <Login setUser={setUser}/>:<Home />;
  
  }