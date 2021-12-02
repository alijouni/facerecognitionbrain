import React from 'react';
import './ImageLinkForm.css'



const ImageLinkForm = ({onFileChange,onInputChange, onButtonSubmit,maxUploadSize }) => {
  
    return (
        <div>
            <p className='f3'>
                {'This Magic Brain will detect faces in your pictures. Give it a try'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange}/>
                    <button
                        className='w-15 grow f4 link ph3 pv2 dib white bg-black'
                        onClick={onButtonSubmit}
                    >Detect</button>
                    <label 
                        htmlFor="file-upload" 
                        className="custom-file-upload w-15 grow f4 link ph3 pv2 dib white bg-black">
                            Upload </label>
                    <input id="file-upload"  type="file" onChange={onFileChange}/>

                    </div>
            </div>
            <div>
            {maxUploadSize===true
                    ? <div className="flex items-center justify-center pa1 bg-lightest-blue navy w-50 center">
                    <svg className="w1" data-icon="info" viewBox="0 0 32 32" >
                      <title>info icon</title>
                      <path d="M16 0 A16 16 0 0 1 16 32 A16 16 0 0 1 16 0 M19 15 L13 15 L13 26 L19 26 z M16 6 A3 3 0 0 0 16 12 A3 3 0 0 0 16 6"></path>
                    </svg>
                    <span className="lh-title ml3">Max upload size reached (1MB) </span>
                  </div>
                :<div className="flex items-center justify-center pa1 bg-lightest-blue navy w-50 center">
                <svg className="w1" data-icon="info" viewBox="0 0 32 32" >
                  <title>info icon</title>
                  <path d="M16 0 A16 16 0 0 1 16 32 A16 16 0 0 1 16 0 M19 15 L13 15 L13 26 L19 26 z M16 6 A3 3 0 0 0 16 12 A3 3 0 0 0 16 6"></path>
                </svg>
                <span className="lh-title ml3">Upload 1MB file</span>
              </div>
                }
            </div>


        </div>
    )
}

export default ImageLinkForm;
