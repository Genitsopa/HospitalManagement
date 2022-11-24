import './App.css';
import {Spitali} from './Spitali';
import {Title} from './Title';
import {Allergy} from './Allergy';
import {City} from './City';
import {Age} from './Age';
import {BrowserRouter, Route, Routes,NavLink} from 'react-router-dom';
import { Category } from './Category';
import { Insurance } from './Insurance';
import {Test} from './Test';
import { Department } from './Department';
import { Schedule } from './Schedule';
import {Doktori} from './Doktori';
import {Infermier} from './Infermier';
import {Bloodgroup} from './Bloodgroup';
import {AppointmentTypes} from './AppointmentTypes';
import {Experience} from './Experience'

function App() {
  return (
    <BrowserRouter>
    <div className="App container">
        
      <nav className="navbar navbar-expand-sm bg-light navbar-dark">
        <ul className="navbar-nav">
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/Spitali">
              Spitali
            </NavLink>
            <NavLink className="btn btn-light btn-outline-primary" to="/Department">
              Department
            </NavLink>
            <NavLink className="btn btn-light btn-outline-primary" to="/Doktori">
              Doktori
            </NavLink>
            <NavLink className="btn btn-light btn-outline-primary" to="/Infermier">
              Infermier
            </NavLink>
            <NavLink className="btn btn-light btn-outline-primary" to="/Title">
              Title
            </NavLink>
            <NavLink className="btn btn-light btn-outline-primary" to="/Allergy">
              Allergy
            </NavLink>
            <NavLink className="btn btn-light btn-outline-primary" to="/City">
              City
            </NavLink>
            <NavLink className="btn btn-light btn-outline-primary" to="/Age">
              Age
            </NavLink>
            <NavLink className="btn btn-light btn-outline-primary" to="/Category">
              Category
            </NavLink>
            <NavLink className="btn btn-light btn-outline-primary" to="/Insurance">
              Insurance
            </NavLink>
            <NavLink className="btn btn-light btn-outline-primary" to="/Test">
              LabTests
            </NavLink>
            <NavLink className="btn btn-light btn-outline-primary" to="/Schedule">
              Schedule
            </NavLink>
            <NavLink className="btn btn-light btn-outline-primary" to="/Experience">
              Experience
            </NavLink>
            <NavLink className="btn btn-light btn-outline-primary" to="/Bloodgroup">
              Bloodgroup
            </NavLink>
            <NavLink className="btn btn-light btn-outline-primary" to="/AppointmentTypes">
            Appoint
            </NavLink>
          </li>
        </ul>
      </nav>

      <Routes>

        <Route exact path='/Spitali' element={<Spitali/>}/>
        <Route exact path='/Title' element={<Title/>}/>
        <Route exact path='/Allergy' element={<Allergy/>}/>
        <Route exact path='/City' element={<City/>}/>
        <Route exact path='/Age' element={<Age/>}/>
        <Route exact path='/Category' element={<Category/>}/>
        <Route exact path='/Insurance' element={<Insurance/>}/>
        <Route exact path='/test' element={<Test/>}/>
        <Route exact path='/Department' element={<Department/>}/>
        <Route exact path='/Schedule' element={<Schedule/>}/>
        <Route exact path='/Doktori' element={<Doktori/>}/>
        <Route exact path='/Infermier' element={<Infermier/>}/>
        <Route exact path='/Experience' element={<Experience/>}/>
        <Route exact path='/Bloodgroup' element={<Bloodgroup/>}/>
        <Route exact path='/AppointmentTypes' element={<AppointmentTypes/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
