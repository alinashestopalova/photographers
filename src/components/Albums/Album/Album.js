import React from 'react'
import '../../Photographers/Photographer/Photographer.css'

const Photographer = (props) => {
    let clicked = {}
    if (props.chosenAlbumId === props.id){
        clicked = {backgroundColor: '#20B2AA', color: '#fff'}
    }
    return (
        <div className="chosen" onClick={props.getPhotos} style={clicked}>
            <span>{props.title}</span>
        </div>
    )
}

export default Photographer