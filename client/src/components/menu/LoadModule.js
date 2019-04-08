import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import './LoadModule.css';
import ModuleService from '../../services/ModuleService';
import { toast } from "react-toastify";

class LoadModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      json: '',
      stateList: [],
      activechange: false,
      inactivechange: false,
      name: '',
      id: '',
      refreshed: false
    }
  }

  loadModule = (json, isParsed = false) => {
    try {
      let module = isParsed ? json : JSON.parse(json);

      if(module.name === undefined) {
        throw new Error('Module must have a name.');
      }

      if(module.states === undefined || Object.keys(module.states).length === 0) {
        throw new Error('Module must have at least one state.');
      }

      // this will throw an error if the module is incomprehensible
      //let dot = generateDOT(module);

      this.props.newModule(module);

    } catch (ex) {
      alert('Error creating module: ' + ex.message);
    }

  }

  onDrop = (files) => {

    files.forEach(file => {
      const reader = new FileReader();

      reader.onload = () => {
        this.loadModule(reader.result);
      };

      reader.readAsText(file);

    });

  }

  updateJson = (event) => {
    this.setState({...this.state, json: event.target.value})
  }

  changeColor(ID) {
    document.getElementById(ID).style.backgroundColor = "#ddd";
    if (this.state.activeModules){
      this.state.activeModules.forEach((i) => {
        if (i.props.id !== ID) {
          document.getElementById(i.props.id).style.backgroundColor = "#eee";
        }
      })
    } 
  }

  fetchModuleList(){
    
    ModuleService.getModules()
    .then(data => {
          data.forEach(function(current_value, index, data){
            if (!data[index].active) { 
              delete data[index] 
            }
          });
          this.setState({
            activeModules:
                data.map((branch, i) => (
                    <li key={i} id={branch.name} >
                    <button className='btn btn-link' onClick={() => {
                      // this.setState({...this.state, id: branch._id})
                      this.changeColor(branch.name);
                      this.fetchModuleVersionsList(branch.name);}}>
                      {branch.name}
                    </button>
                  </li>
                ))
          });
    })
    .then(
      this.setState({...this.state, refreshed: true})
    )  
    .catch(error => console.log('error: ', error)); 
  }

  versionDetails(version){
    if (version.user){
      return version.updatedTimeStamp + " - " + version.user
    }else{
      return version.updatedTimeStamp
    }
  }

  remove(data, temp) {
    const index = data.indexOf(temp);
    data.splice(index, 1);
  }

  sortData(data){
    //sort data so that active module is at the top and thereafter datewise descending
    let temp;
    for(let x in data) {           
      if(data[x].active ) {
        temp = data[x];
        this.remove(data, temp);
      }
    }
    data.sort((a,b) => {
      let dateA = new Date(a.updatedTimeStamp), dateB = new Date(b.updatedTimeStamp);
      return dateA - dateB
    });
    data.push(temp);
    data.reverse();
    return data
  }

  fetchModuleVersionsList(name){
    this.state.name = name;

    ModuleService.getModuleVersionsList(name)
         .then(data => {
            data = this.sortData(data);

            this.setState({
              moduleVersions:
                  data.map((branch, i) => (
                    <li key={i} id={branch._id}>
                      <span className='LoadModule-li-elements'>
                        <button className='btn btn-link btn-left' onClick={() => {
                          this.changeColor(branch._id);
                          this.fetchModule(branch._id)
                          ;}}>
                          {this.versionDetails(branch)}
                        </button>
                        {this.isActive(branch)}
                        </span>
                    </li>
                  ))
            })
        })
        .then(res=>{
          this.setState({...this.state, activechange: false})
          this.setState({...this.state, inactivechange: false})
        })  
        .catch(error => console.log('error: ', error));
  }

  fetchModule(id) {
    ModuleService.getModule(id)
      .then(data => this.loadModule(data, true))
      .then(this.setState({
        Modules: null
      }))
      .catch(error => console.log('error: ', error));
  }

  setActive(branch) {
    let id = branch._id;
    ModuleService.getModule(id)
        .then(data => { 
            data.active = true;
            // data.updatedTimeStamp = new Date(Date.now()).toISOString();

            ModuleService.updateModule(id, data)
              .then(function(response) {
                toast.success(branch.updatedTimeStamp + ' is active now.');
              })
              .catch(function(error) {
                toast.error(error);
              })
        })
        .then(res => {this.setState({...this.state, activechange: true})})
        .catch(function(error){
            console.log(error)
        })
  }

  setInactive(branch){
    let id = branch._id;

    ModuleService.getModuleVersionsList(branch.name)
        .then(data => {
            data.forEach((current_value, index, data) => {
              if (data[index].active) {
                ModuleService.getModule(data[index]._id)
                // .then(get_response => get_response.json())
                .then(module_data => {
                  module_data.active = false;
  
                  ModuleService.updateModule(module_data._id, module_data)
                    .catch(function(error) {
                      console.log(error);
                    });
                })              
              }
          })  
        })
        .then(d1 => {
          this.setActive(branch)
        })
        .then(res => {this.setState({...this.state, inactivechange: true})})
        .catch(function(error){
          console.log(error)
        }) 
  }

  isActive(branch){
    var button_act;
    if(branch.active){
      button_act = <button className='btn btn-link btn-right'>Active</button>
    }else{
      button_act = <button className='btn btn-link btn-right' onClick={() => {
        // this.setActive(branch)
        this.setInactive(branch)
      }}>Set as Active</button>
    }
    return button_act
  }

  componentWillReceiveProps(){
    this.setState({...this.state, refreshed: false})
    this.setState({ ...this.setState, moduleVersions: null})
  }

  componentDidUpdate() {
    if (this.state.activechange && this.state.inactivechange){
      this.fetchModuleVersionsList(this.state.name)
    }
    if (!this.state.refreshed){
      this.fetchModuleList()
    }
  }

  renderDetails = () => {
    let moduleVersionList = null;
    if (this.state.moduleVersions){
      moduleVersionList = (
        <div className='col-4'>  
          <ul className='LoadModule-sublist'>
            {this.state.moduleVersions}
          </ul>
        </div>
      )
    }
    return (
      <div className='row'>  
        <ul className='LoadModule-list'>
          {this.state.activeModules}
        </ul>
        {moduleVersionList}
      </div>  
    )
  }

  render() {

    let classDetails = " hide", style = {display: 'none'}

    if(this.props.visible){
      classDetails = " show";
      style = {display: 'block'}
    }

    // let closeButton = <span />
    // closeButton = <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.props.onHide}>X</button>

    return (
      <div>
        <div className={'modal ' +  classDetails} style={style}>
          <div className="modal-content" style={{width:"900px", marginLeft: '15%', marginRight: '15%', marginTop: 50}}>
              <div className="modal-header">
                <h3 className="modal-title">Proxi Model Builder</h3>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.props.onHide} style={{display: 'close'}}>
                  <span aria-hidden="false">&times;</span>
                </button>
                {/* {closeButton} */}
              </div>
              <div className="modal-body LoadModule-body">
                <Dropzone activeClassName='LoadModule-dropzoneActive' className='LoadModule-dropzone' onDrop={this.onDrop.bind(this)}>
                   Drop files here or click to open saved models.
                </Dropzone>
                <div className='container'>
                  <div className='row'>
                    <div className='col-9 nopadding'>
                        {this.renderDetails()}
                      {/* </div> */}
                    </div>
                  </div>
                </div>
              </div>
          </div>
          </div>
        <div className={`modal-backdrop ${classDetails}`} style={style}/>
      </div>
    )
  }

}

export default LoadModule;
