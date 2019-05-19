import React, {Component} from 'react'

class Photos extends Component {
    render() {
        return (
            <div>
                {this.props.photoList.map((photo) => {
                    return (
                        <img
                            src={photo.url}
                            key={photo.id}
                            style={{width: '200px', height: '200px', margin: '40px'}}
                        />
                    )
                })}
            </div>
        )
    }
}

export default Photos