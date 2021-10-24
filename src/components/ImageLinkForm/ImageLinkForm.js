import React from 'react';
import './ImageLinkForm.css'



const ImageLinkForm = ({onInputChange, onButtonSubmit }) => {
    const inputFile = React.useRef(null);
    const onButtonClick = () => {
        // `current` points to the mounted file input element
       inputFile.current.click();
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

      };
    return (
        <div>
            <p className='f3'>
                {'This Magic Brain will detect faces in your pictures. Give it a try'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange}/>
                    <button
                        className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
                        onClick={onButtonSubmit}
                    >Detect</button>
                    <input className='f4 pa2 w-70 center' type='file' id='file' ref={inputFile} style={{display: 'none'}} onChage={onInputChange}/>
                    <button
                        className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
                        onClick={onButtonClick}
                    >Upload</button></div>
            </div>


        </div>
    )
}

export default ImageLinkForm;
