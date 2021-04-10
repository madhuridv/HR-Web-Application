import React, { Component } from "react";
import { Redirect } from "react-router";
import axios from "axios";

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Esal: "",
      Efname: "",
      Elname: "",
      Eid: "",
      message: "",
      status: "",
      success: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    let data = {
      Eid: this.state.Eid,
      Efname: this.state.Efname,
      Elname: this.state.Elname,
      Esal: this.state.Esal,
    };
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    console.log(data);
    axios
      .post("http://127.0.0.1:3001/empDetails/add", data)
      .then((response) => {
        console.log("response", response.status);
        if (response.status === 200) {
          alert("Employee Added successfully!");
          this.setState({
            success: true,
          });
        } else if (response.status === 400) {
          alert("Employee ID Exists!");
        } else if (response.status === 401) {
          alert("Database Error!");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Unable to add Employee");
      });
  }

  render() {
    //if not logged in go to login page
    let redirectVar = null;
    if (!localStorage.getItem("token")) {
      redirectVar = <Redirect to="/login" />;
    }
    if (this.state.success) {
      redirectVar = <Redirect to="/home" />;
    }
    return (
      <div>
        {redirectVar}
        <br />
        <div className="container">
          <form onSubmit={this.onSubmit}>
            <div style={{ width: "30%" }} className="form-group">
              <input
                type="text"
                className="form-control"
                name="Eid"
               
                onChange={this.onChange}
                placeholder="Employee ID"
                //pattern="^[0-9]+$"
                title="Employee ID should be a number"
              />
            </div>
            <br />
            <div style={{ width: "30%" }} className="form-group">
              <input
                type="text"
                className="form-control"
                name="Efname"
                onChange={this.onChange}
                pattern="^[A-Za-z0-9 ]+$"
                placeholder="Employee First Name"
              />
              &nbsp;
              <input
                type="text"
                className="form-control"
                name="Elname"
                onChange={this.onChange}
                pattern="^[A-Za-z0-9 ]+$"
                placeholder="Employee Last Name"
              />
            </div>
            <br />
            <div style={{ width: "30%" }} className="form-group">
              <input
                type="Number"
                className="form-control"
                name="Esal"
                onChange={this.onChange}
                placeholder="Salary"
                pattern="^[0-9]+$"
                title="Salary should be a number"
              />
            </div>
            <br />

            <br />
            <div style={{ color: "#ff0000" }}>{this.state.message}</div>
            <div style={{ width: "30%" }}>
              <button className="btn btn-success" type="submit">
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Create;
