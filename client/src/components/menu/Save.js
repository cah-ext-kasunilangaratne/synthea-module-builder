import React, { Component } from 'react';
import FileSaver from 'file-saver';
import _ from 'lodash'
import axios from 'axios'

import './Download.css';
import { request } from 'https';

class Save extends Component {

  constructor(props){
    super(props)
    this.onSave = this.onSave.bind(this)
  }

  onSave(){
    // console.log(JSON.stringify(this.props.module))

    console.log("ATTempt FETCH")
    fetch('http://localhost:5000/module/', {
        
        mode: "no-cors",
        method: "POST",
        body: JSON.stringify(this.props.module),
        headers: {
            
            "Accept": "application/json",
            "Content-Type": "application/json",
   
        }
        
    })
    // .then((request) => request.text())
    // .then((responseText) => {
    //   alert(responseText);
    // })
    // .catch((error) => {
    //     console.error(error);
    // });
    
    console.log("WRITTEN TO MONGODB")
  }

  prepareJSON(){
    let module = _.cloneDeep(this.props.module);

    // We currently save name in the state for convenience
    // In lieu of a better solution, we will just remove it here
    Object.keys(module.states).map(k => module.states[k]).forEach( s => {
      if(s['name'] !== undefined){
        delete s.name;
      }
    })

    return JSON.stringify(module, null, 2)

  }

  render() {

    let classDetails = "hide", style = {display: 'none'}

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
                <h5 className="modal-title">Save Module</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.props.onHide}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body Download-body">
              <textarea ref="codeInput" disabled value={this.prepareJSON()} />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.onSave}>Save to mongo</button>
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

export default Save;
