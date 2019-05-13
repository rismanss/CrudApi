import React from "react";
import './App.css';
import { Link } from "react-router-dom";
import Axios from 'axios';

export class Update extends React.Component {
  constructor() {
    super();
    this.state = {
      namaBarang: '',
      desc: '',
      img: null,
      price: null
    }

    this.changeUpdate = this.changeUpdate.bind(this);
    this.submitUpdate = this.submitUpdate.bind(this);
    this.changeImg = this.changeImg.bind(this);
  }

  componentDidMount() {
    Axios.get('http://localhost:8000/'+this.props.match.params.id)
    .then(res => {
      console.log(res);
      this.setState({
        namaBarang: res.data.namaBarang,
        desc: res.data.deskripsi,
        // img: res.data.gambar,
        price: res.data.hargaBarang || 0
      })
    }).catch(e => {
      console.log(e);
    });
  }

  submitUpdate(e) {
    e.preventDefault();
    let data = new FormData();
    if(this.state.img != null) {
      data.append('gambar', this.state.img);
    }
    data.append('namaBarang', this.state.namaBarang);
    data.append('hargaBarang', this.state.price);
    data.append('deskripsi', this.state.desc);
    Axios.put('http://localhost:8000/'+this.props.match.params.id, data)
    .then(res => {
      console.log(res);
      window.location.reload();
      this.props.history.push('/');
    }).catch(err => {
      console.error(err.response.status);
    });
  }

  changeImg(e) {
    const file = e.target.files[0];
    this.setState({
      img : file
    });
  }

  changeUpdate(e) {
    this.setState({
      [e.target.name] : e.target.value
    });
  }
  render() {
    console.log(this.state.img+' ..img');
    return (
      <div className='container App'>
        <h1 className='title'>Update data</h1>
        <Link to='/' className='button is-dark is-outlined'>Back</Link>
        <div className='column is-half is-offset-one-quarter'>
          <div className='box'>
            <form onSubmit={this.submitUpdate}>
              <div className="field">
                <label className="label">Select Image</label>
                <div className="control">
                  <input 
                    className="input" 
                    type="file"
                    onChange={this.changeImg}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input 
                    className="input" 
                    type="text" 
                    placeholder="Name" 
                    value={this.state.namaBarang || ''}
                    name='namaBarang'
                    onChange={this.changeUpdate}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Description</label>
                <div className="control">
                  <textarea 
                    className="textarea" 
                    placeholder="Description" 
                    value={this.state.desc || ''}
                    name='desc'
                    onChange={this.changeUpdate}
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
                    value={this.state.price || ''}
                    name='price'
                    onChange={this.changeUpdate}
                  />
                </div>
              </div>
              <div className="field is-grouped is-grouped-centered">
                <p className="control">
                  <button 
                    className="button is-success"
                  >
                    Update
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
