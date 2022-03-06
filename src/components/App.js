import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Dashboard from './userspace/Dashboard'
import Login from './Login'
import Homepage from './homepage/Homepage'
import Signup from './Signup'
import Admin from "./adminspace/Admin"
import Profile from "./userspace/Profile"
import Wallet from "./userspace/Wallet"
import Assets from "./userspace/Assets"
import Forgotpassword from "./Forgotpassword"
import Information from "./Information"
import { AuthContext } from "../contexts/AuthContext"
import './App.css'


function App() {
    const [value, setValue] = useState("username");
    
    return (
                <Router>
                    <AuthContext.Provider value={{value, setValue}}>
                        <Switch>
                            <Route exact path="/" component={Homepage}/>
                            <Route path="/signup" component={Signup}/>
                            <Route path="/login" component={Login}/>
                            <Route path="/information" component={Information}/>
                            <Route path="/forgotpassword" component={Forgotpassword}/>
                            <Route path="/homepage" component={Homepage}/>
                            <Route path="/dashboard" component={Dashboard}/>
                            <Route path="/profile" component={Profile}/>
                            <Route path="/admin" component={Admin}/>
                            <Route path="/wallet" component={Wallet}/>
                            <Route path="/assets" component={Assets}/>
                        </Switch>
                    </AuthContext.Provider>
                </Router>
 
    )
}
export default App