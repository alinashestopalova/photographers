import React, {Component} from 'react'
import './Photographer.css'

class Photographer extends Component {
   render(){
       let clicked = {}
       if(this.props.chosenPhotographerId === this.props.id){
           clicked = {backgroundColor: '#20B2AA', color: '#fff'}
       }
       return (
           <div className='chosen' onClick={this.props.getAlbums} style={clicked}>
               <span>{this.props.name}&nbsp;{this.props.userName}</span>
           </div>
       )
   }

}

export default Photographer