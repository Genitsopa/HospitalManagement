import React,{Component} from 'react';
import {variables} from './Variables.js';

export class Infermier extends Component{

    constructor(props){
        super(props);

        this.state={
            Infermier:[],
            modalTitle:"",
            InfermierName:"",
            Surname:"",
            Gender:"",
            Age:"",
            DoktorName:"",
            InfermierId:0
        }
    }

    refreshlist(){
        fetch(variables.API_URL+'Infermier')
        .then(response=>response.json())
        .then(data=>{
            this.setState({Infermier:data});
        });

    }

    componentDidMount(){
        this.refreshlist();
    }

    onChangeInfermierName =(e)=>{
        this.setState({InfermierName:e.target.value});
    }
    onChangeSurname =(e)=>{
        this.setState({Surname:e.target.value});
    }
    onChangeGender =(e)=>{
        this.setState({Gender:e.target.value});
    }

    onChangeAge =(e)=>{
        this.setState({Age:e.target.value});
    }

    onChangeDoktorName =(e)=>{
        this.setState({DoktorName:e.target.value});
    }

    addClick(){
        this.setState({
            modalTitle:"Add Infermier",
            InfermierId:0,
            InfermierName:"",
            Surname:"",
            Gender:"",
            Age:"",
            DoktorName:""
        });
    } 

    editClick(inf){
        this.setState({
            modalTitle:"Edit Infermier",
            InfermierId:inf.InfermierId,
            InfermierName:inf.InfermierName,
            Surname:inf.Surname,
            Gender:inf.Gender,
            Age:inf.Age,
            DoktorName:inf.DoktorName,
        });
    }

    createClick(){
        fetch(variables.API_URL+'Infermier',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                InfermierName:this.state.InfermierName,
                Surname:this.state.Surname,
                Gender:this.state.Gender,
                Age:this.state.Age,
                DoktorName:this.state.DoktorName,
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }

    updateClick(){
        fetch(variables.API_URL+'Infermier',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                InfermierId:this.state.InfermierId,
                InfermierName:this.state.InfermierName,
                Surname:this.state.Surname,
                Gender:this.state.Gender,
                Age:this.state.Age,
                DoktorName:this.state.DoktorName,
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    } 

    deleteClick(id){
        if(window.confirm('Are you sure?')){
        fetch(variables.API_URL+'Infermier/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                InfermierId:this.state.InfermierId,
                InfermierName:this.state.InfermierName,
                Surname:this.state.Surname,
                Gender:this.state.Gender,
                Age:this.state.Age,
                DoktorName:this.state.DoktorName,
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }
    } 

    render(){
        const{
            Infermier,
            modalTitle,
            InfermierId,
            InfermierName,
            Surname,
            Gender,
            Age,
            DoktorName
        }=this.state;

        return(
            <div>
                <button type="button"
                className="btn btn-primary m-2 float-end"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={()=>this.addClick()}>
                    Add Infermier 
                </button>
    
    
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                            InfermierId
                            </th>
                            <th>
                            InfermierName
                            </th>
                            <th>
                            Surname
                            </th>
                            <th>
                            Gender
                            </th>
                            <th>
                            Age
                            </th>
                            <th>
                            DoktorName
                            </th>
                            <th>
                            Options
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Infermier.map(inf=>
                            <tr key={inf.InfermierId}>
                                <td>{inf.InfermierId}</td>
                                <td>{inf.InfermierName}</td>
                                <td>{inf.Surname}</td>
                                <td>{inf.Gender}</td>
                                <td>{inf.Age}</td>
                                <td>{inf.DoktorName}</td>
                                <td>
                            <button type="button"
                    className="btn btn-light mr-1"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={()=>this.editClick(inf)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                </svg>
                            </button>
    
                            <button type="button"
                    className="btn btn-light mr-1"
                    onClick={()=>this.deleteClick(inf.InfermierId)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                        </svg>
                    </button>
                    </td>   
                            </tr>
                            
                            )}
                    </tbody>
                </table>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">{modalTitle}</h5>
                <button type="button" className="btn-close" data-bs-dismis="modal" aria-label="Close"
                ></button>
            </div>
    
            <div className="modal-body">
                <div className="input-group mb-3">
                <span className="input-group-text">InfermierName</span>
                <input type="text" className="form-control"
                value={InfermierName}
                onChange={this.onChangeInfermierName}/>
                </div>
            </div>
    
            <div className="modal-body">
                <div className="input-group mb-3">
                <span className="input-group-text">Surname</span>
                <input type="text" className="form-control"
                value={Surname}
                onChange={this.onChangeSurname}/>
                </div>
            </div>

            <div className="modal-body">
                <div className="input-group mb-3">
                <span className="input-group-text">Gender</span>
                <input type="text" className="form-control"
                value={Gender}
                onChange={this.onChangeGender}/>
                </div>
            </div>
            <div className="modal-body">
                <div className="input-group mb-3">
                <span className="input-group-text">Age</span>
                <input type="text" className="form-control"
                value={Age}
                onChange={this.onChangeAge}/>
                </div>
            </div>
            <div className="modal-body">
                <div className="input-group mb-3">
                <span className="input-group-text">DoktorName</span>
                <input type="text" className="form-control"
                value={DoktorName}
                onChange={this.onChangeDoktorName}/>
                </div>
            </div>
    
            {InfermierId==0?
            <button type="button"
            className="btn btn-primary float-start"
            onClick={()=>this.createClick()}
            >Create</button>
            :null}
    
            {InfermierId!=0?
            <button type="button"
            className="btn btn-primary float-start"
            onClick={()=>this.updateClick()}
            >Update</button>
            :null}
    
            
    
        </div>
        </div>
        </div>
                        
            </div>
            )
        }
    }