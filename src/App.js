/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-globals */
import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
//import { Button, Container, Card, Row } from 'react-bootstrap'

class App extends Component {
   
  state = {

    // Initially, no file is selected
    selectedFile: null
  };
   
  // On file select (from the pop up)
  onFileChange = event => {
   
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
   
  };
   
  // On file upload (click the upload button)
  onFileUpload = () => {
   
    // Create an object of formData
    const formData = new FormData();
   
    // Update the formData object
    formData.append(
      "files",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
   
    // Details of the uploaded file
    console.log(this.state.selectedFile);
   
    // Request made to the backend api
    // Send formData object
    axios.post('https://convertidorlista.azurewebsites.net/api/httpexample', formData,{ responseType: 'blob' }).then((response) => {
      // create file link in browser's memory
      const href = window.URL.createObjectURL(new Blob([response.data]));
  
      // create "a" HTML element with href to file & click
      const link = document.createElement('a');
      link.href = href;
      link.setAttribute('download', 'lista.xlsx'); //or any other extension
      document.body.appendChild(link);
      link.click();
  
      // clean up "a" element & remove ObjectURL
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    });

  };
   
  // File content to be displayed after
  // file upload is complete
  fileData = () => {
   
    if (this.state.selectedFile) {
        
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {this.state.selectedFile.name}</p>

          <p>File Type: {this.state.selectedFile.type}</p>

          <p>
            Last Modified:{" "}
            {this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>

        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Seleccione un archivo y precione Convertir</h4>
        </div>
      );
    }
  };
   
  render() {
   
    return (
      
      <div className="container bg-secondary">
          <h1>
            Convertidor de listas
          </h1>
          <h3>
            Escoja la lista a modificar
          </h3>
          <div className="row">
            <div className="col-auto">
              <input className="form-control" type="file" id="formFile" onChange={this.onFileChange} ></input>
            </div>
            <div className="col-auto">
              <button className="btn btn-warning" type="button" onClick={this.onFileUpload}>Convertir</button>
            </div>
          </div>
        {this.fileData()}
      </div>
    );
  }
}

export default App;