import React, { Component } from "react";
import { variables } from "./Variables.js";

export class Schedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Schedule: [],
      modalTitle: "",
      CategoryId: 0,
      CategoryName: "",
      DoctorName: "",
      DoctorSurname: "",
    };
  }

  refreshList() {
    fetch(variables.API_URL + "schedule")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ Schedule: data });
      });
  }

  componentDidMount() {
    this.refreshList();
  }

  onChangeParadite = (e) => {
    this.setState({ Paradite: e.target.value });
  };

  onChangePasdite = (e) => {
    this.setState({ Pasdite: e.target.value });
  };

  onChangeNderrimiNates = (e) => {
    this.setState({ NderrimiNates: e.target.value });
  };

  onChangePushimiDrekes = (e) => {
    this.setState({ PushimiDrekes: e.target.value });
  };

  addClick() {
    this.setState({
      modalTitle: "Add Schedule",
      ScheduleId: 0,
      Paradite: "",
      Pasdite: "",
      NderrimiNates: "",
      PushimiDrekes: ""
    });
  }

  editClick(sch) {
    this.setState({
      modalTitle: "Edit Schedule",
      ScheduleId: sch.ScheduleId,
      Paradite: sch.Paradite,
      Pasdite: sch.Pasdite,
      NderrimiNates: sch.NderrimiNates,
      PushimiDrekes: sch.PushimiDrekes
    });
  }

  createClick() {
    fetch(variables.API_URL + "schedule", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Paradite: this.state.Paradite,
        Pasdite: this.state.Pasdite,
        NderrimiNates: this.state.NderrimiNates,
        PushimiDrekes: this.state.PushimiDrekes
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
    fetch(variables.API_URL + "schedule", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ScheduleId: this.state.ScheduleId,
        Paradite: this.state.Paradite,
        Pasdite: this.state.Pasdite,
        NderrimiNates: this.state.NderrimiNates,
        PushimiDrekes: this.state.PushimiDrekes
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
      fetch(variables.API_URL + "schedule/" + id, {
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
      Schedule,
      modalTitle,
      ScheduleId,
      Paradite,
      Pasdite,
      NderrimiNates,
      PushimiDrekes
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
          Add Schedule
        </button>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>ScheduleId</th>
              <th>Paradite</th>
              <th>Pasdite</th>
              <th>NderrimiNates</th>
              <th>PushimiDrekes</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {Schedule.map((sch) => (
              <tr key={sch.ScheduleId}>
                <td>{sch.ScheduleId}</td>
                <td>{sch.Paradite}</td>
                <td>{sch.Pasdite}</td>
                <td>{sch.NderrimiNates}</td>
                <td>{sch.PushimiDrekes}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.editClick(sch)}
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
                    onClick={() => this.deleteClick(sch.ScheduleId)}
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
                  <span className="input-group-text">Paradite</span>
                  <input
                    type="text"
                    className="form-control"
                    value={Paradite}
                    onChange={this.onChangeParadite}
                  />
                </div>
              </div>

              <div className="modal-body">
                <div className="input-group mb-3">
                  <span className="input-group-text">Pasdite</span>
                  <input
                    type="text"
                    className="form-control"
                    value={Pasdite}
                    onChange={this.onChangePasdite}
                  />
                </div>
              </div>

              <div className="modal-body">
                <div className="input-group mb-3">
                  <span className="input-group-text">NderrimiNates</span>
                  <input
                    type="text"
                    className="form-control"
                    value={NderrimiNates}
                    onChange={this.onChangeNderrimiNates}
                  />
                </div>
              </div>

              <div className="modal-body">
                <div className="input-group mb-3">
                  <span className="input-group-text">PushimiDrekes</span>
                  <input
                    type="text"
                    className="form-control"
                    value={PushimiDrekes}
                    onChange={this.onChangePushimiDrekes}
                  />
                </div>
              </div>

              {ScheduleId == 0 ? (
                <button
                  type="button"
                  className="btn btn-success m-3 float-left"
                  onClick={() => this.createClick()}
                >
                  Create
                </button>
              ) : null}

              {ScheduleId != 0 ? (
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