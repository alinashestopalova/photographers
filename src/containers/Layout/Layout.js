import React, {Component} from 'react'
import Photographers from '../../components/Photographers/Photographers'
import axios from 'axios'
import Albums from "../../components/Albums/Albums";
import './Layout.css'
import Photos from '../../components/Photos/Photos'
import NameFilter from "../../components/NameFilter/NameFilter";

class Layout extends Component {
    state = {
        photographers: [],
        albums: [],
        photos: [],
        chosenPhotographerId: 1,
        chosenAlbumId: 1,
        showMoreBtn: false,
        searchedAlbum: '',
        photographersWithAlbums: {},
        albumsWithPhotos: {}
    }

    getAlbums = (id) => {
        if (!this.state.photographersWithAlbums.hasOwnProperty(id)) {
            let allAlbums = {...this.state.photographersWithAlbums}
            axios.get(`https://jsonplaceholder.typicode.com/albums/?userId=${id}`)
                .then(res => {
                    allAlbums[id] = res.data
                    this.getPhotos(res.data[0].id)
                    this.setState({albums: res.data,
                        chosenPhotographerId: id,
                        chosenAlbumId: res.data[0].id,
                        showMoreBtn: true,
                        photographersWithAlbums: allAlbums
                    })
                })

        }
        else {
            let albumId = this.state.photographersWithAlbums[id][0].id
            this.setState({
                albums: this.state.photographersWithAlbums[id],
                chosenPhotographerId: id,
                chosenAlbumId: albumId,
                showMoreBtn: true,
                photos: this.state.albumsWithPhotos[albumId]
            })
        }
    }

    getPhotos = (id) => {
        if (!this.state.albumsWithPhotos.hasOwnProperty(id)) {
            let allAlbums = {...this.state.albumsWithPhotos}
            axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${id}`)
                .then(res => {
                    allAlbums[id] = res.data
                    this.setState({photos: res.data,
                        chosenAlbumId: id,
                        showMoreBtn: true,
                        albumsWithPhotos: allAlbums})
                })
        }
        else{
            this.setState({photos: this.state.albumsWithPhotos[id], chosenAlbumId: id, showMoreBtn: true})
        }
    }

    changeShowMoreBtn =() =>{
        this.setState({showMoreBtn: !this.state.showMoreBtn})
    }

    searchedAlbum = (event) =>{
        this.setState({searchedAlbum: event.target.value})
    }

    searchAlbum = () =>{
        return this.state.albums.filter((album)=>{
            return (album.title.indexOf(this.state.searchedAlbum) >= 0)
        })
    }

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(res => {
                this.setState({photographers: res.data})
            })
    }

    render() {
        let showMoreBtn = ''
        if((this.state.showMoreBtn) && (this.state.chosenAlbumId)){
            showMoreBtn = <div className='showMoreBtn' onClick={this.changeShowMoreBtn}>
                                Show more
                            </div>
        }
        return (
            <div>
                <div className="layout">
                    <Photographers
                        personList={this.state.photographers}
                        chosenPhotographerId={this.state.chosenPhotographerId}
                        getAlbums={this.getAlbums}
                    />
                    <Albums
                        albumList={this.state.searchedAlbum ? this.searchAlbum() : this.state.albums}
                        chosenAlbumId={this.state.chosenAlbumId}
                        getPhotos={this.getPhotos}
                    />
                    {this.state.chosenPhotographerId ? <NameFilter searchedAlbum={this.searchedAlbum}/> : ''}
                </div>
                <Photos
                    photoList={this.state.showMoreBtn? this.state.photos.slice(0,10) : this.state.photos}
                    showMoreBtn={this.state.showMoreBtn}
                />
                {showMoreBtn}
            </div>
        )
    }
}

export default Layout