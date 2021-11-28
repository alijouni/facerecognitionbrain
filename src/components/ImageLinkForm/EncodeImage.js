import { Component } from 'react';
class EncodeImage extends Component {
    constructor(props) {
        super();
    }
    
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
          promise.then(data => {
            this.props.encodeImageAsUrl(data);
          })
          }
        return (true)
    }
}
export default EncodeImage