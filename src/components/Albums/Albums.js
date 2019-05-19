import React, {Component} from 'react'
import Album from "./Album/Album";

class Albums extends Component {

    render() {
        return (
            <div>
                {this.props.albumList.map((album) => {
                    return (
                        <Album
                            key={album.id}
                            id={album.id}
                            title={album.title}
                            getPhotos={() => {this.props.getPhotos(album.id)}}
                            chosenAlbumId={this.props.chosenAlbumId}
                        />
                    )
                })}
            </div>
        )
    }
}

export default Albums