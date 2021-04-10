import React, { Component } from "react";
import { Redirect } from "react-router";
import axios from "axios";
import "../styles/create.css";

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Esal: "",
      Efname: "",
      Elname: "",
      Eid: "",
      E401k: "",
      Ehsa: "",
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
      E401k: this.state.E401k,
      Ehsa: this.state.Ehsa,
    };
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    console.log(data);
    axios
      .post("http://localhost:3001/empDetails/add", data)
      .then((response) => {
        console.log("response", response);
        if (response.status === 200) {
          alert("Employee Added successfully!");
          this.setState({
            success: true,
          });
        }
      })
      .catch((error) => {
        console.log("error in axios:", error);
        this.setState({
          message: error.response.data,
        });
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
        <div style={{ color: "#ff0000" }}>{this.state.message}</div>
        <br />
        <div className="container signup">
          <div class="signup-form">
            <form onSubmit={this.onSubmit}>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="Eid">Employee ID :</label>
                    <input
                      type="text"
                      className="form-control"
                      name="Eid"
                      onChange={this.onChange}
                      placeholder="Employee ID"
                      required
                      title="Employee ID should be a number"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="Efname">First Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="Efname"
                      onChange={this.onChange}
                      pattern="^[A-Za-z0-9 ]+$"
                      placeholder="Employee First Name"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="Elname">Last Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="Elname"
                      onChange={this.onChange}
                      pattern="^[A-Za-z0-9 ]+$"
                      placeholder="Employee First Name"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="Esal">Salary :</label>
                    <input
                      type="Number"
                      className="form-control"
                      name="Esal"
                      onChange={this.onChange}
                      placeholder="Salary"
                      pattern="^[0-9]+$"
                      title="Salary should be a number"
                      required
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="E401k">401k Contribution :</label>
                    <input
                      type="Number"
                      className="form-control"
                      name="E401k"
                      onChange={this.onChange}
                      placeholder="401k Contribution"
                      pattern="^[0-9]+$"
                      title="Enter a Number"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="Ehsa">HSA Contribution :</label>
                    <input
                      type="Number"
                      className="form-control"
                      name="Ehsa"
                      onChange={this.onChange}
                      placeholder="HSA Contribution"
                      pattern="^[0-9]+$"
                      title="Enter a number"
                      required
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="signup-block">
                    <button type="submit" className="btn btn-primary">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;
