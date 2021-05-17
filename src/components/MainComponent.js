import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Directory from './DirectoryComponent';
import { CAMPSITES } from '../shared/campsites'
import CampsiteInfo from "./CampsiteInfoComponent"

class Main extends Component {
  constructor(props){
    super(props)
    this.state = {
      campsites: CAMPSITES,
      selectedCampsite: null,
    }
  }

  onCampsiteSelect(campsiteId) {
    this.setState({selectedCampsite: campsiteId});
  }

  render() {
    const {campsites,selectedCampsite} = this.state
    return (
      <div>
        <Navbar dark color="primary">
        <div className="container">
          <NavbarBrand href="/">NuCamp</NavbarBrand>
        </div>
        </Navbar>
        <Directory campsites={campsites} onClick={campsiteId => this.onCampsiteSelect(campsiteId)}/>
        <CampsiteInfo campsite={campsites.filter(({id}) => id === selectedCampsite)[0]} />
      </div>
    );
  }
}

export default Main;