import React, { Component } from 'react'
import './Meme.css';


export default class MemeGenerator extends Component {
  constructor() {
    super()
    this.state = {
      topText : '',
      bottomText : '',
      randomImg : 'http://i.imgflip.com/1bij.jpg',
      allMemeImg : []
    }
    this.handleChange = this.handleChange.bind(this) // We bind component's context to the handleChange function's context
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  componentDidMount(){
    fetch(("https://api.imgflip.com/get_memes"))
    .then(response => response.json())
    .then(response => {
      const {memes} = response.data
      this.setState({allMemeImg : memes})
      console.log(memes)
    }) 
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    console.log(this.state.topText)
    console.log(this.state.bottomText)
  }

  handleSubmit(event) {
    event.preventDefault();
    const randomNumber = Math.floor(Math.random() * this.state.allMemeImg.length);
    this.setState({
      randomImg : this.state.allMemeImg[randomNumber].url
    })
  }

  render() {
    return (
      <div>
        <form className="meme-form">
        <input
          type="text"
          name="topText"
          placeholder="Top Text"
          value={this.state.topText}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="bottomText"
          placeholder="Bottom Text"
          value={this.state.bottomText}
          onChange={this.handleChange}
        />
          <button onClick={this.handleSubmit}>Gen</button>
        </form>
        <div className='meme'>
          <img src={this.state.randomImg} alt='' />
          <h2 className='top'>{this.state.topText}</h2>
          <h2 className='bottom'>{this.state.bottomText}</h2>
        </div>
      </div>
    )
  }
}
