import React,{Component} from 'react';
import {variables} from './Variables.js';

export class Experience extends Component{

    constructor(props){
        super(props);

        this.state={
            Experience:[],
            modalTitle:"",
            NameOfDoctor:"",
            SurnameOfDoctor:"",
            Exxperience:"",
            ExperienceId:0
        }
    }

    refreshlist(){
        fetch(variables.API_URL+'Experience')
        .then(response=>response.json())
        .then(data=>{
            this.setState({Experience:data});
        });

    }

    componentDidMount(){
        this.refreshlist();
    }

    onChangeNameOfDoctor =(e)=>{
        this.setState({NameOfDoctor:e.target.value});
    }
    onChangeSurnameOfDoctor =(e)=>{
        this.setState({SurnameOfDoctor:e.target.value});
    }
    onChangeExxperience =(e)=>{
        this.setState({Exxperience:e.target.value});
    }

    addClick(){
        this.setState({
            modalTitle:"Add Experience",
            ExperienceId:0,
            NameOfDoctor:"",
            SurnameOfDoctor:"",
            Exxperience:""
        });
    } 

    editClick(ex){
        this.setState({
            modalTitle:"Edit Experience",
            ExperienceId:ex.ExperienceId,
            NameOfDoctor:ex.NameOfDoctor,
            SurnameOfDoctor:ex.SurnameOfDoctor,
            Exxperience:ex.Exxperience,
        });
    }

    createClick(){
        fetch(variables.API_URL+'Experience',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                NameOfDoctor:this.state.NameOfDoctor,
                SurnameOfDoctor:this.state.SurnameOfDoctor,
                Exxperience:this.state.Exxperience,
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
        fetch(variables.API_URL+'Experience',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                ExperienceId:this.state.ExperienceId,
                NameOfDoctor:this.state.NameOfDoctor,
                SurnameOfDoctor:this.state.SurnameOfDoctor,
                Exxperience:this.state.Exxperience,
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
        fetch(variables.API_URL+'Experience/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                ExperienceId:this.state.ExperienceId,
                NameOfDoctor:this.state.NameOfDoctor,
                SurnameOfDoctor:this.state.SurnameOfDoctor,
                Exxperience:this.state.Exxperience,
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
            Experience,
            modalTitle,
            ExperienceId,
            NameOfDoctor,
            SurnameOfDoctor,
            Exxperience
        }=this.state;

        return(
            <div>
                <button type="button"
                className="btn btn-primary m-2 float-end"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={()=>this.addClick()}>
                    Add Experience 
                </button>
    
    
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                            ExperienceId
                            </th>
                            <th>
                            Name Of Doctor                           
                            </th>
                            <th>
                            Surname Of Doctor
                            </th>
                            <th>
                            Experience
                            </th>
                            <th>
                            Options
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Experience.map(ex=>
                            <tr key={ex.ExperienceId}>
                                <td>{ex.ExperienceId}</td>
                                <td>{ex.NameOfDoctor}</td>
                                <td>{ex.SurnameOfDoctor}</td>
                                <td>{ex.Exxperience}</td>
                                <td>
                            <button type="button"
                    className="btn btn-light mr-1"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={()=>this.editClick(ex)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                </svg>
                            </button>
    
                            <button type="button"
                    className="btn btn-light mr-1"
                    onClick={()=>this.deleteClick(ex.ExperienceId)}>
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
                <span className="input-group-text">NameOfDoctor</span>
                <input type="text" className="form-control"
                value={NameOfDoctor}
                onChange={this.onChangeNameOfDoctor}/>
                </div>
            </div>
    
            <div className="modal-body">
                <div className="input-group mb-3">
                <span className="input-group-text">SurnameOfDoctor</span>
                <input type="text" className="form-control"
                value={SurnameOfDoctor}
                onChange={this.onChangeSurnameOfDoctor}/>
                </div>
            </div>

            <div className="modal-body">
                <div className="input-group mb-3">
                <span className="input-group-text">Exxperience</span>
                <input type="text" className="form-control"
                value={Exxperience}
                onChange={this.onChangeExxperience}/>
                </div>
            </div>
            
    
            {ExperienceId==0?
            <button type="button"
            className="btn btn-primary float-start"
            onClick={()=>this.createClick()}
            >Create</button>
            :null}
    
            {ExperienceId!=0?
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