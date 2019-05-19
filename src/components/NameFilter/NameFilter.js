import React, {Component} from 'react'

class NameFilter extends Component {
    render() {
        const inputStyle= {width: '250px', height: '25px', fontSize: '16px'}
        return (
            <div>
                <p>Filter by name</p>
                <input type='text'
                       style={inputStyle}
                       onChange={this.props.searchedAlbum}
                />
            </div>
        )
    }
}

export default NameFilter