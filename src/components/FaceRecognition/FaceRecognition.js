import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({ imageURL, box, preview64Data}) => {
    return (
        
        <div className='center ma'>
            <div className='absolute mt2'>
                {preview64Data === null
                    ?
                    <img id='inputimage' alt='' src={imageURL} width='500px' height='auto' />
                    :
                    <img id='inputimage' alt='' src={preview64Data} width='500px' height='auto' />
                
    }
                <div
                    className='bounding-box'
                    style={{
                        top: box.topRow,
                        right: box.rightCol,
                        bottom: box.bottomRow,
                        left: box.leftCol
                    }}></div>
            </div>
            
        </div>
        );
}

export default FaceRecognition;
