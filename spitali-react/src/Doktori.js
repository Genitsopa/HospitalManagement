import React,{Component} from 'react';
import {variables} from './Variables.js';

export class Doktori extends Component{

    constructor(props){
        super(props);

        this.state={
            Doktori:[],
            modalTitle:"",
            Emri:"",
            Mbiemri:"",
            Gjinia:"",
            Titulli:"",
            Mosha:"",
            DoktoriId:0
        }
    }

    refreshlist(){
        fetch(variables.API_URL+'Doktori')
        .then(response=>response.json())
        .then(data=>{
            this.setState({Doktori:data});
        });

    }

    componentDidMount(){
        this.refreshlist();
    }

    onChangeEmri =(e)=>{
        this.setState({Emri:e.target.value});
    }
    onChangeMbiemri =(e)=>{
        this.setState({Mbiemri:e.target.value});
    }
    onChangeGjinia =(e)=>{
        this.setState({Gjinia:e.target.value});
    }

    onChangeTitulli =(e)=>{
        this.setState({Titulli:e.target.value});
    }

    onChangeMosha =(e)=>{
        this.setState({Mosha:e.target.value});
    }

    addClick(){
        this.setState({
            modalTitle:"Add Doktori",
            DoktoriId:0,
            Emri:"",
            Mbiemri:"",
            Gjinia:"",
            Titulli:"",
            Mosha:""
        });
    } 

    editClick(dr){
        this.setState({
            modalTitle:"Edit Doktori",
            DoktoriId:dr.DoktoriId,
            Emri:dr.Emri,
            Mbiemri:dr.Mbiemri,
            Gjinia:dr.Gjinia,
            Titulli:dr.Titulli,
            Mosha:dr.Mosha,
        });
    }

    createClick(){
        fetch(variables.API_URL+'Doktori',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Emri:this.state.Emri,
                Mbiemri:this.state.Mbiemri,
                Gjinia:this.state.Gjinia,
                Titulli:this.state.Titulli,
                Mosha:this.state.Mosha,
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
        fetch(variables.API_URL+'Doktori',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                DoktoriId:this.state.DoktoriId,
                Emri:this.state.Emri,
                Mbiemri:this.state.Mbiemri,
                Gjinia:this.state.Gjinia,
                Titulli:this.state.Titulli,
                Mosha:this.state.Mosha
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
        fetch(variables.API_URL+'Doktori/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                DoktoriId:this.state.DoktoriId,
                Emri:this.state.Emri,
                Mbiemri:this.state.Mbiemri,
                Gjinia:this.state.Gjinia,
                Titulli:this.state.Titulli,
                Mosha:this.state.Mosha
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
            Doktori,
            modalTitle,
            DoktoriId,
            Emri,
            Mbiemri,
            Gjinia,
            Titulli,
            Mosha
        }=this.state;

        return(
            <div>
                <button type="button"
                className="btn btn-primary m-2 float-end"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={()=>this.addClick()}>
                    Add Doktor 
                </button>
    
    
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                DoktoriId
                            </th>
                            <th>
                                Name
                            </th>
                            <th>
                                Surname
                            </th>
                            <th>
                                Gender
                            </th>
                            <th>
                                Title
                            </th>
                            <th>
                                Age
                            </th>
                            <th>
                                Options
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Doktori.map(dr=>
                            <tr key={dr.DoktoriId}>
                                <td>{dr.DoktoriId}</td>
                                <td>{dr.Emri}</td>
                                <td>{dr.Mbiemri}</td>
                                <td>{dr.Gjinia}</td>
                                <td>{dr.Titulli}</td>
                                <td>{dr.Mosha}</td>
                                <td>
                            <button type="button"
                    className="btn btn-light mr-1"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={()=>this.editClick(dr)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                </svg>
                            </button>
    
                            <button type="button"
                    className="btn btn-light mr-1"
                    onClick={()=>this.deleteClick(dr.DoktoriId)}>
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
                <span className="input-group-text">Emri</span>
                <input type="text" className="form-control"
                value={Emri}
                onChange={this.onChangeEmri}/>
                </div>
            </div>
    
            <div className="modal-body">
                <div className="input-group mb-3">
                <span className="input-group-text">Mbiemri</span>
                <input type="text" className="form-control"
                value={Mbiemri}
                onChange={this.onChangeMbiemri}/>
                </div>
            </div>

            <div className="modal-body">
                <div className="input-group mb-3">
                <span className="input-group-text">Gjinia</span>
                <input type="text" className="form-control"
                value={Gjinia}
                onChange={this.onChangeGjinia}/>
                </div>
            </div>
            <div className="modal-body">
                <div className="input-group mb-3">
                <span className="input-group-text">Titulli</span>
                <input type="text" className="form-control"
                value={Titulli}
                onChange={this.onChangeTitulli}/>
                </div>
            </div>
            <div className="modal-body">
                <div className="input-group mb-3">
                <span className="input-group-text">Mosha</span>
                <input type="text" className="form-control"
                value={Mosha}
                onChange={this.onChangeMosha}/>
                </div>
            </div>
    
            {DoktoriId==0?
            <button type="button"
            className="btn btn-primary float-start"
            onClick={()=>this.createClick()}
            >Create</button>
            :null}
    
            {DoktoriId!=0?
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