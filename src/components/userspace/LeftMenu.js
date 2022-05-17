import React, { useContext } from "react"
import { useHistory, Link } from "react-router-dom"
import "./LeftMenu.css"
import { AuthContext } from "../../contexts/AuthContext";

export default function LeftMenu({type}) {

    const history=useHistory();

    const {value, setValue} = useContext(AuthContext);

    const logtype = window.localStorage.getItem('type');

    function handleLogout(e) {
        history.push("/");
    }

    return (
        <>
            <div class="wrapper">
                <nav className={type}>
                    <div class="sidebar-header">
                        <span className="logoDash"></span>
                        <h3>extraland</h3>
                    </div>
                    <ul class="list-unstyled components">
                        <p>COMPONENTS</p>
                        <li class="active">
                            <Link to="/dashboard"> <i class="fa fa-fw fa-home"></i> Market</Link>
                        </li>
                        <li>
                            <Link to="/profile"> <i class="fa fa-fw fa-user"></i> Profile</Link>
                        </li>
                        <li>
                            <Link to="/admin"> <i class="fa fa-fw fa-bolt"></i> Admin</Link>
                        </li>
                        <li>
                            <Link to="/wallet"> <i class="fa fa-fw fa-bank"></i> Wallet</Link>
                        </li>
                        <li>
                            <Link to="/assets"> <i class="fa fa-fw fa-diamond"></i> Your assets</Link>
                        </li>
                        <li>
                            <Link onClick={handleLogout}> <i class="fa fa-fw fa-anchor"></i> Logout</Link>
                        </li>
                        <p>EXTRAS</p>
                        <li>
                            <Link to="/information"> <i class="fa fa-fw fa-info-circle"></i> Information</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    )
}
