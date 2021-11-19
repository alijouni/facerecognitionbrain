import {useEffect} from 'react';
import Clarifai from 'clarifai';

const HandleApi = ({base64Data,parentCallback})=> {
    
    
        useEffect(() => {
        
            const app = new Clarifai.App({
                apiKey: '3b491503921247e8b965300f384d2118',
            });
            //console.log(base64Data)
            
            app.models.predict( Clarifai.FACE_DETECT_MODEL, base64Data)
                //.then(result =>  result.json() )
                .then(response => {
                    console.log(response);
                    parentCallback(response);
                    ;
                })
                .catch(error => console.log('error API', error));
        
        
        
        }, [base64Data,parentCallback]);
    

    return(true)
    


       
    
}

export default HandleApi