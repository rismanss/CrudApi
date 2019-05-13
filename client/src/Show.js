import React from "react";
import Axios from 'axios';
import './App.css';
import { Link } from "react-router-dom";

export class Show extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    const api = "http://localhost:8000/";
    Axios.get(`${api}`)
    .then(response => {
      this.setState({
        data: response.data
      });
    })
    .catch(e => {
      console.log(e);
    });
  }

  handleDelete(id) {
    const delData = "http://localhost:8000/"+id;
    Axios.delete(`${delData}`);
    window.location.reload();
  }

  render() {
    const urlImage = 'http://localhost:8000/upload/'; 
    return (
      <div className='Container App'>
        <h1 className='title'>test from Jubelio</h1>
          <Link to='/create' className='button is-primary is-outlined'>Create</Link>
          {this.state.data.map((item, index) => (
            <div key={index} className='column is-half is-offset-one-quarter'>
              <div className='box'>
                <div className='columns media'>
                  <div className='column is-3' >
                    <p>Name : </p>
                    <p>Description : </p>
                    <p>Price : </p>
                    <p>Image : </p>
                  </div>
                  <div className='column is-9' >
                    <p> {item.namaBarang}</p>
                    <p> {item.deskripsi}</p>
                    <p> {item.hargaBarang}</p>
                    <p><img alt='name' src={urlImage+item.gambar} className='img' /></p>
                  </div>
                </div>
                <div className="field is-grouped is-grouped-centered">
                  <p className="control">
                    <Link 
                      to={'/'+item.id} 
                      className="button is-primary"
                    >
                      update
                    </Link>
                  </p>
                  <p className="control">
                    <button
                      className="button is-danger" 
                      onClick={this.handleDelete.bind(this, item.id)}
                    >
                      delete
                    </button>
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  }
}