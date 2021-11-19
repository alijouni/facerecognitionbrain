import React,{Component} from 'react'
import './App.css';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import EncodeImage from './components/ImageLinkForm/EncodeImage';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';
import HandleApi from './components/ImageLinkForm/HandleApi';
import {useEffect} from 'react';



const particlesOptions= {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area:800
      }
    }
  }
}

const initialState={
  
    input: '',
    imageURL: '',
  selectedFile: null,
  previewFile:null,
  base64Data: null,
  preview64Data:null,
  clarifaiRes: '',

    box: {},
    route: 'signin',
    isSignedIn: false,
    user: {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''
    }
  }
class App extends Component {
  constructor() {
    
    super();
    this.state = {
      input: '',
      imageURL: '',
      selectedFile: null,
      previewFile:null,
      base64Data: null,
      preview64Data:null,
      clarifaiRes: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }

  }

  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0]
        .data.regions[0]
        .region_info
        .bounding_box
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }
  
  displayFaceBox = (box) => {
    this.setState({ box: box });
  }

  encodeImageAsUrl = (data) => {
    this.setState({ selectedFile: null, base64Data: data.replace(/^data:image\/[a-z]+;base64,/, ""),preview64Data:data });
  }
  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onFileChange = (event) => {
    this.setState({ selectedFile: event.target.files[0],previewFile:event.target.files[0] }); 
  }

  onButtonSubmit = () => {
    this.setState({ imageURL: this.state.input });
    fetch('https://safe-scrubland-81316.herokuapp.com/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input

      })
    })
    .then(response=> response.json())
    .then(response => {
      if (response) {
        fetch('https://safe-scrubland-81316.herokuapp.com/image', {
          method: 'put',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: this.state.user.id
  
          })
        })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, { entries: count }))
        })
        .catch(console.log);
      }
      this.displayFaceBox(this.calculateFaceLocation(response));
    })
    .catch(err => console.log(err));

  }

  callbackFunction = (childData) => {
    console.log(this.state.clarifaiRes);
    this.setState({ clarifaiRes: childData });
    this.displayFaceBox(this.calculateFaceLocation(this.state.clarifaiRes))
    
  }
  
  onButtonUpload = () => {
    this.displayFaceBox(this.calculateFaceLocation(this.state.clarifaiRes));
    
  }
  // onButtonUpload = () => {

  //   .then(response=> response.json())
  //   .then(response => {
  //     if (response) {
  //       fetch('https://safe-scrubland-81316.herokuapp.com/image', {
  //         method: 'put',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({
  //           id: this.state.user.id
  
  //         })
  //       })
  //         .then(response => response.json())
  //         .then(count => {
  //           this.setState(Object.assign(this.state.user, { entries: count }))
  //       })
  //       .catch(console.log);
  //     }
  //     this.displayFaceBox(this.calculateFaceLocation(response));
  //   })
  //   .catch(err => console.log(err));

  // }
  
  onRouteChange = (route) => {
    if (route === 'signout'){
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn:true})
    }
    this.setState({ route: route });
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }
  render() {
    const { isSignedIn, imageURL, route, box,base64Data,preview64Data } = this.state;
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        { this.state.route==='home' 
          
          ? <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
                onFileChange={this.onFileChange}
              />
              <EncodeImage
          selectedFile={this.state.selectedFile}
          base64Data={this.state.base64Data}
          encodeImageAsUrl={this.encodeImageAsUrl}/>    

            {this.state.base64Data !== null ?
              <div>
                <HandleApi
                  base64Data={this.state.base64Data}
                  displayFaceBox={this.displayFaceBox}
                  calculateFaceLocation={this.calculateFaceLocation}
                  parentCallback = {this.callbackFunction}
                />
                {/* {this.state.clarifaiRes !== null ? <div>
                  ({ this.onButtonUpload() })</div> : <div></div>}
                 */}
                </div>
              :(<div></div>)
    }
             
                <FaceRecognition box={box} imageURL={imageURL} preview64Data={preview64Data} />
          </div>
          : (
            route === 'signin'
              ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          )
          
        }
      </div>
    );
  }
}

export default App;
