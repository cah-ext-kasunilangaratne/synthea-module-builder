import React, { Component } from 'react';
import _ from 'lodash'
import './Download.css';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ModuleService from '../../services/ModuleService';

class  SaveModule extends Component {

  constructor(props){
    super(props);
    this.onSave = this.onSave.bind(this)

    this.state = {
      save: false
    }
  }

  saveModule(){
    this.props.module.updatedTimeStamp = new Date(Date.now()).toISOString();
    this.props.module.user = sessionStorage.getItem('user');
    
    let id = this.props.module._id;
    ModuleService.createModule(this.props.module)
    .then(
      toast.success('Saved New Model Successfully')
    )
    .then(
      this.props.onHide
    )
    .catch(function(error){
      toast.error("Error")
    })
  }

  onSave(){
    
    this.props.module.updatedTimeStamp = new Date(Date.now()).toISOString();
    this.props.module.user = sessionStorage.getItem('user');
    let id = this.props.module._id;


    ModuleService.getModuleVersionsList(this.props.module.name)
    .then(res => {
      //set active modules to inactive
      res.forEach(function(current_value, index, data){
        if (data[index].active) {
          ModuleService.getModule(data[index]._id)
          .then( model_data => {
            model_data.active = false
            ModuleService.updateModule(model_data._id, model_data)
            .then(function(success){
              toast.success("Previous Model set to Inactive")
            })
            .catch(function(error) {
              toast.error(error);
            })
          })
        }
      })
    })
    .then(
      this.setState({...this.state, save: true})
    )

  }

  componentWillReceiveProps(){
    this.setState({...this.state, save: false})
  }

  componentDidUpdate(){
    if (this.state.save){
      this.saveModule()
    }
  }

  prepareJSON(){
    let module = _.cloneDeep(this.props.module);

    // We currently save name in the state for convenience
    // In lieu of a better solution, we will just remove it here
    Object.keys(module.states).map(k => module.states[k]).forEach( s => {
      if(s['name'] !== undefined){
        delete s.name;
      }
    });

    return JSON.stringify(module, null, 2)

  }

  render() {

    let classDetails = "hide", style = {display: 'none'};

    if(this.props.visible){
      classDetails = "show";
      style = {display: 'block'}
    }

    return (
      <div className='Download'>
        <div className={`modal ${classDetails}`} style={style}>
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Save Model</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.props.onHide}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body Download-body">
              <textarea ref="codeInput" value={this.prepareJSON()} />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick= {this.onSave }>Save</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.props.onHide}>Close</button>
              </div>
            </div>
          </div>
        </div>
        <div className={`modal-backdrop ${classDetails}`} style={style}/>
      </div>
    )
  }
}

export default SaveModule;
