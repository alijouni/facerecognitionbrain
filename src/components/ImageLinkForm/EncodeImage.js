import { Component } from 'react';
class EncodeImage extends Component {
    constructor(props) {
        super();
    }
    
    // shouldComponentUpdate() {
    //     console.log('Greeting - shouldComponentUpdate lifecycle');
    
    //     return false;
    // }
    
    render() {
        if (this.props.selectedFile) {
            console.log('Attempt')
          function getBase64(file, onLoadCallback) {
            return new Promise(function(resolve, reject) {
                var reader = new FileReader();
                reader.onload = function() { resolve(reader.result); };
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        }
        
            console.log(this.props.selectedFile)
            var promise = getBase64(this.props.selectedFile);
            promise.then(data=>data.replace(/^data:image\/[a-z]+;base64,/, ""))
              .then(result => {
                  this.props.encodeImageAsUrl(result);
                // console.log("SET STATE");
                // console.log(this.state.base64Data);
            
              }
            )
          
          }
        return (true)
    }
}
export default EncodeImage