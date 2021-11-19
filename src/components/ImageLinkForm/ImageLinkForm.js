import React from 'react';
import './ImageLinkForm.css'



const ImageLinkForm = ({onFileChange,onInputChange, onButtonSubmit }) => {
  
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
                    <label 
                        htmlFor="file-upload" 
                        className="custom-file-upload w-30 grow f4 link ph3 pv2 dib white bg-light-purple">
                            Upload </label>
                    <input id="file-upload"  type="file" onChange={onFileChange}/>
                    </div>
            </div>


        </div>
    )
}

export default ImageLinkForm;
