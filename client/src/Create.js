import React from "react";
import './App.css';
import { Link } from "react-router-dom";
import Axios from 'axios';

export class Create extends React.Component {
  constructor() {
    super();
    this.state = {
      image: null,
      next: false,
      idInput: null,
      nameBarang: '',
      deskripsi: '',
      harga: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handlePost = this.handlePost.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.changeUp = this.changeUp.bind(this);
  }

  changeUp(e) {
    this.setState({
      [e.target.name] : e.target.value  
    });
  }

  handleChange(e) {
    const file = e.target.files[0];
    this.setState({
      image: file  
    });
  }

  handlePost(e) {
    e.preventDefault();
    console.log(this.state.image);
    let data = new FormData();
    data.append('gambar', this.state.image);
    Axios.post('http://localhost:8000/', data)
    .then(res => {
      console.log(res);
      this.setState({
        next: true,
        idInput: res.data.id
      });
    }).catch(err => {
      console.error(err.response.status);
    });
  }

  handleUpdate() {
    let data = new FormData();
    data.append('gambar', this.state.image);
    data.append('namaBarang', this.state.nameBarang);
    data.append('hargaBarang', this.state.harga);
    data.append('deskripsi', this.state.deskripsi);
    Axios.put('http://localhost:8000/'+this.state.idInput, data)
    .then(res => {
      console.log(res);
      window.location.reload();
    }).catch(err => {
      console.error(err.response.status);
    });
  }
  render() {
    return (
      <div className='container App'>
        <h1 className='title'>Create data</h1>
        <Link to='/' className='button is-dark is-outlined'>Back</Link>
        <div className='column is-half is-offset-one-quarter'>
          <div className='box'>
            <form onSubmit={this.handlePost}>
              <div className="field">
                <label className="label">Select Image</label>
                <div className="control">
                  <input 
                    className="input" 
                    type="file" 
                    onChange={this.handleChange}
                    disabled={this.state.next} 
                  />
                </div>
              </div>
              <div className="field is-grouped is-grouped-centered">
                <p className="control">
                  <button 
                    className="button is-success"
                    type="submit"
                    disabled={this.state.next}
                  >
                    Upload
                  </button>
                </p>
              </div>
            </form>
            <fieldset disabled={!this.state.next}>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input 
                    className="input" 
                    type="text" 
                    placeholder="Name"
                    name='nameBarang'
                    onChange={this.changeUp}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Description</label>
                <div className="control">
                  <textarea 
                    className="textarea" 
                    placeholder="Description"
                    name='deskripsi'
                    onChange={this.changeUp}
                  >
                  </textarea>
                </div>
              </div>
              <div className="field">
                <label className="label">Price</label>
                <div className="control">
                  <input 
                    className="input" 
                    type="number" 
                    placeholder="Price"
                    name='harga'
                    onChange={this.changeUp}
                  />
                </div>
              </div>
              <div className="field is-grouped is-grouped-centered">
                <p className="control">
                  <button className="button is-success" onClick={this.handleUpdate}>
                    Save
                  </button>
                </p>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    );
  }
}
