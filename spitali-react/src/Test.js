import React, { Component } from "react";
import { variables } from "./Variables.js";

export class Test extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Test: [],
      modalTitle: "",
      TestId: 0,
      TestName: "",
      Price: "",
      PosNeg: "",
    };
  }

  refreshList() {
    fetch(variables.API_URL + "test")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ Test: data });
      });
  }

  componentDidMount() {
    this.refreshList();
  }

  onChangeTestName = (e) => {
    this.setState({ TestName: e.target.value });
  };

  onChangePrice = (e) => {
    this.setState({ Price: e.target.value });
  };

  onChangePosNeg = (e) => {
    this.setState({ PosNeg: e.target.value });
  };

  addClick() {
    this.setState({
      modalTitle: "Add Laboratory Test",
      TestId: 0,
      TestName: "",
      Price: "",
      PosNeg: "",
    });
  }

  editClick(tst) {
    this.setState({
      modalTitle: "Edit Laboratory Test",
      TestId: tst.TestId,
      TestName: tst.TestName,
      Price: tst.Price,
      PosNeg: tst.PosNeg,
    });
  }

  createClick() {
    fetch(variables.API_URL + "test", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        TestName: this.state.TestName,
        Price: this.state.Price,
        PosNeg: this.state.PosNeg,
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
    fetch(variables.API_URL + "test", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        TestId: this.state.TestId,
        TestName: this.state.TestName,
        Price: this.state.Price,
        PosNeg: this.state.PosNeg,
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
      fetch(variables.API_URL + "test/" + id, {
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
      Test,
      modalTitle,
      TestId,
      TestName,
      Price,
      PosNeg,
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
          Add LaboratoryTest
        </button>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>TestId</th>
              <th>TestName</th>
              <th>Price</th>
              <th>PosNeg</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {Test.map((tst) => (
              <tr key={tst.TestId}>
                <td>{tst.TestId}</td>
                <td>{tst.TestName}</td>
                <td>{tst.Price}</td>
                <td>{tst.PosNeg}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.editClick(tst)}
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
                    onClick={() => this.deleteClick(tst.TestId)}
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
                  <span className="input-group-text">TestName</span>
                  <input
                    type="text"
                    className="form-control"
                    value={TestName}
                    onChange={this.onChangeTestName}
                  />
                </div>
              </div>

              <div className="modal-body">
                <div className="input-group mb-3">
                  <span className="input-group-text">Price</span>
                  <input
                    type="text"
                    className="form-control"
                    value={Price}
                    onChange={this.onChangePrice}
                  />
                </div>
              </div>

              <div className="modal-body">
                <div className="input-group mb-3">
                  <span className="input-group-text">PosNeg</span>
                  <input
                    type="text"
                    className="form-control"
                    value={PosNeg}
                    onChange={this.onChangePosNeg}
                  />
                </div>
              </div>

              {TestId == 0 ? (
                <button
                  type="button"
                  className="btn btn-success m-3 float-left"
                  onClick={() => this.createClick()}
                >
                  Create
                </button>
              ) : null}

              {TestId != 0 ? (
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
