import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import datis from "./datis.png";

//create the Navbar Component
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }
  //handle logout to destroy the cookie
  handleLogout = () => {
    localStorage.clear();
  };
  render() {
    //if Cookie is set render Logout Button
    let navLogin = null;
    if (localStorage.getItem("token")) {
      navLogin = (
        <ul className="nav navbar-nav navbar-right">
          <li>
            <Link to="/" onClick={this.handleLogout}>
              <span className="glyphicon glyphicon-user"></span>Logout
            </Link>
          </li>
        </ul>
      );
    } else {
      //Else display login button
      console.log("Not Able to read cookie");
      navLogin = (
        <ul className="nav navbar-nav navbar-right">
          <li>
            <Link to="/login">
              <span className="glyphicon glyphicon-log-in"></span> Login
            </Link>
          </li>
        </ul>
      );
    }
    let redirectVar = null;
    if (localStorage.getItem("token")) {
      redirectVar = <Redirect to="/home" />;
    }
    return (
      <div>
        {redirectVar}

       <nav className="navbar navbar-inverse"> 
       
          <div className="container-fluid">
            <div className="navbar-header">
              <div className="navbar-brand" href="#">
                <img
                  src={datis}
                  width="30"
                  height="30"
                 
                  alt="datis image"
                />{" "}
              </div>

              {/* <img className="" src={datis} alt="datis image" width="50px" /> */}
              <a className="navbar-brand">HR Web Application</a>
            </div>
            <ul className="nav navbar-nav">
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/add">Add Employee Details</Link>
              </li>
            </ul>

            {navLogin}
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
