import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      empDetails: [],
      message: "",
    };
  }
  //get the books data from backend
  componentDidMount() {
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    axios.get("http://localhost:3001/empDetails/home").then((response) => {
      console.log("response:", response.data);
      //update the state with the response data
      this.setState({
        empDetails: response.data,
      });
    });
  }
  onDelete = (Eid) => {
    console.log(Eid);
    const data = { empID: Eid };
    console.log("Data", data);
    axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:3001/empDetails/delete", data)
      .then((response) => {
        console.log("Response after Axios call", response);
        if (response.status === 200) {
          if (alert("Employee Deleted Successfully!")) {
          } else {
            window.location.reload();
          }
        }
      })
      .catch((error) => {
        this.setState({
          message: error.response.data,
        });
      });
  };

  render() {
    // iterate over employees to create a table row
    let details = this.state.empDetails.map((emp) => {
      return (
        <tr>
          <td>
            {emp.Efname}&nbsp;{emp.Elname}
          </td>
          <td>{emp.Esal}$</td>
          <td>{Math.round(emp.deduction401k, 2)}$</td>
          <td>{Math.round(emp.healthInsurance, 2)}$</td>
          <td>{Math.round(emp.TotalTax, 2)}$</td>
          <td>{emp.PaidAmt}$</td>
          <td>
            <span>
              <button
                className="btn btn-danger"
                onClick={() => this.onDelete(emp.Eid)}
              >
                Delete
              </button>
            </span>
          </td>
        </tr>
      );
    });

    //if not logged in go to login page
    let redirectVar = null;
    if (!localStorage.getItem("token")) {
      redirectVar = <Redirect to="/login" />;
    }

    return (
      <div>
        {redirectVar}
        <div className="container">
          <div style={{ color: "#ff0000" }}>{this.state.message}</div>
          <h2>List of All Employees</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Employee Salary</th>
                <th>Contibution to 401K</th>
                <th>Health Insurance</th>
                <th>Tax Deductions</th>
                <th>Amount Paid</th>
              </tr>
            </thead>
            <tbody>
              {/*Display the Table row based on data recieved*/}
              {details}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
//export Home Component
export default Home;
