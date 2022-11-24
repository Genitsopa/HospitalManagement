import React, { Component } from "react";
import { variables } from "./Variables.js";

export class Insurance extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Insurance: [],
      modalTitle: "",
      InsuranceId: 0,
      CompanyName: "",
      PatientName: "",
      PatientSurname: "",
      Birthdate: "",
      CurrentWork: "",
      Expenses: 0,
    };
  }

  refreshList() {
    fetch(variables.API_URL + "insurance")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ Insurance: data });
      });
  }

  componentDidMount() {
    this.refreshList();
  }

  onChangeCompanyName = (e) => {
    this.setState({ CompanyName: e.target.value });
  };

  onChangePatientName = (e) => {
    this.setState({ PatientName: e.target.value });
  };

  onChangePatientSurname = (e) => {
    this.setState({ PatientSurname: e.target.value });
  };

  onChangeBirthdate = (e) => {
    this.setState({ Birthdate: e.target.value });
  };

  onChangeCurrentWork = (e) => {
    this.setState({ CurrentWork: e.target.value });
  };

  onChangeExpenses = (e) => {
    this.setState({ Expenses: e.target.value });
  };

  addClick() {
    this.setState({
      modalTitle: "Add Insurance",
      InsuranceId: 0,
      CompanyName: "",
      PatientName: "",
      PatientSurname: "",
      Birthdate: "",
      CurrentWork: "",
      Expenses: "",
    });
  }

  editClick(inc) {
    this.setState({
      modalTitle: "Edit Insurance",
      InsuranceId: inc.InsuranceId,
      CompanyName: inc.CompanyName,
      PatientName: inc.PatientName,
      PatientSurname: inc.PatientSurname,
      Birthdate: inc.Birthdate,
      CurrentWork: inc.CurrentWork,
      Expenses: inc.Expenses,
    });
  }

  createClick() {
    fetch(variables.API_URL + "insurance", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        CompanyName: this.state.CompanyName,
        PatientName: this.state.PatientName,
        PatientSurname: this.state.PatientSurname,
        Birthdate: this.state.Birthdate,
        CurrentWork: this.state.CurrentWork,
        Expenses: this.state.Expenses,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert(result);
          this.refreshList();
        },
        (error) => {
          alert("Failed");
        }
      );
  }

  updateClick() {
    fetch(variables.API_URL + "insurance", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        InsuranceId: this.state.InsuranceId,
        CompanyName: this.state.CompanyName,
        PatientName: this.state.PatientName,
        PatientSurname: this.state.PatientSurname,
        Birthdate: this.state.Birthdate,
        CurrentWork: this.state.CurrentWork,
        Expenses: this.state.Expenses,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert(result);
          this.refreshList();
        },
        (error) => {
          alert("Failed");
        }
      );
  }

  deleteClick(id) {
    if (window.confirm("Are you sure?")) {
      fetch(variables.API_URL + "insurance/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            alert(result);
            this.refreshList();
          },
          (error) => {
            alert("Failed");
          }
        );
    }
  }

  render() {
    const {
      Insurance,
      modalTitle,
      InsuranceId,
      CompanyName,
      PatientName,
      PatientSurname,
      Birthdate,
      CurrentWork,
      Expenses
    } = this.state;

    return (
      <div>
        <button
          type="button"
          className="btn btn-primary m-2 float-end"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={() => this.addClick()}
        >
          Add Insurance
        </button>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>InsuranceId</th>
              <th>CompanyName</th>
              <th>PatientName</th>
              <th>PatientSurname</th>
              <th>Birthdate</th>
              <th>CurrentWork</th>
              <th>Expenses</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {Insurance.map((inc) => (
              <tr key={inc.InsuranceId}>
                <td>{inc.InsuranceId}</td>
                <td>{inc.CompanyName}</td>
                <td>{inc.PatientName}</td>
                <td>{inc.PatientSurname}</td>
                <td>{inc.Birthdate}</td>
                <td>{inc.CurrentWork}</td>
                <td>{inc.Expenses}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.editClick(inc)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pencil-square"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path
                        fillRule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                      />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    onClick={() => this.deleteClick(inc.InsuranceId)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modalTitle}</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismis="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body">
                <div className="input-group mb-3">
                  <span className="input-group-text">CompanyName</span>
                  <input
                    type="text"
                    className="form-control"
                    value={CompanyName}
                    onChange={this.onChangeCompanyName}
                  />
                </div>
              </div>

              <div className="modal-body">
                <div className="input-group mb-3">
                  <span className="input-group-text">PatientName</span>
                  <input
                    type="text"
                    className="form-control"
                    value={PatientName}
                    onChange={this.onChangePatientName}
                  />
                </div>
              </div>

              <div className="modal-body">
                <div className="input-group mb-3">
                  <span className="input-group-text">PatientSurname</span>
                  <input
                    type="text"
                    className="form-control"
                    value={PatientSurname}
                    onChange={this.onChangePatientSurname}
                  />
                </div>
              </div>

              <div className="modal-body">
                <div className="input-group mb-3">
                  <span className="input-group-text">Birthdate</span>
                  <input
                    type="text"
                    className="form-control"
                    value={Birthdate}
                    onChange={this.onChangeBirthdate}
                  />
                </div>
              </div>

              <div className="modal-body">
                <div className="input-group mb-3">
                  <span className="input-group-text">CurrentWork</span>
                  <input
                    type="text"
                    className="form-control"
                    value={CurrentWork}
                    onChange={this.onChangeCurrentWork}
                  />
                </div>
              </div>

              <div className="modal-body">
                <div className="input-group mb-3">
                  <span className="input-group-text">Expenses</span>
                  <input
                    type="text"
                    className="form-control"
                    value={Expenses}
                    onChange={this.onChangeExpenses}
                  />
                </div>
              </div>

              {InsuranceId == 0 ? (
                <button
                  type="button"
                  className="btn btn-success m-3 float-left"
                  onClick={() => this.createClick()}
                >
                  Create
                </button>
              ) : null}

              {InsuranceId != 0 ? (
                <button
                  type="button"
                  className="btn btn-success m-3 float-left"
                  onClick={() => this.updateClick()}
                >
                  Update
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
