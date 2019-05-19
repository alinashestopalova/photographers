import React, {Component} from 'react'
import Photographer from './Photographer/Photographer'

class Photographers extends Component {
    render() {
        return (
            <div>
                {this.props.personList.map((person) => {
                    return (
                        <Photographer
                            key={person.id}
                            id={person.id}
                            name={person.name}
                            userName={person.username}
                            getAlbums={() => {this.props.getAlbums(person.id)}}
                            chosenPhotographerId={this.props.chosenPhotographerId}
                        />
                    )
                })}
            </div>
        )
    }
}

export default Photographers