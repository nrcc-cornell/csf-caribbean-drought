///////////////////////////////////////////////////////////////////////////////
//
// Climate Smart Farming Caribbean Drought Atlas
// Copyright (c) 2018 Cornell Institute for Climate Smart Solutions
// All Rights Reserved
//
// This software is published under the provisions of the GNU General Public
// License <http://www.gnu.org/licenses/>. A text copy of the license can be
// found in the file 'LICENSE' included with this software.
//
// A text copy of the copyright notice, licensing conditions and disclaimers
// is available in the file 'COPYRIGHT' included with this software.
//
///////////////////////////////////////////////////////////////////////////////

import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import Loader from 'react-loader-advanced';
import Control from 'react-leaflet-control';
import { Map, ImageOverlay, GeoJSON, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import legend from '../../img/pdsi_map_colorbar.png'
//import logo from '../../img/ecrl_logo_transparent.png'

//const mapCenter = [17.4691, -72.6569];
const mapCenter = [18.6691, -72.6569];
const zoomLevel = 5;
const minZoomLevel = 5;
const maxZoomLevel = 8;
const spinner = <div className="loader"></div>
var app;

@inject("store") @observer
export default class MapDisplay extends Component {

  constructor(props) {
    super(props);
    app = this.props.store.app;
  }

  handleImageLoad = () => {
    //console.log('LOADED IMAGE');
    if (app.getLoaderImageOverlay === true) {
        app.updateLoaderImageOverlay(false);
    }
  }

  render() {

            return (
                <div className="csftool-display-map">
                  <Loader message={spinner} show={app.getLoader} priority={10} backgroundStyle={{backgroundColor: null}} hideContentOnLoad={false}>
                    <Map
                        center={mapCenter}
                        zoom={zoomLevel}
                        minZoom={minZoomLevel}
                        maxZoom={maxZoomLevel}
                        attributionControl={false}
                        style={{ height: '440px', width: '784px' }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                            // wmflabs originally used, no longer available
                            //url="http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
                            // the following would work, but it is hard to find ocean colors that are outside of data color ranges
                            //url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                            //url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
                            // no tiles used (white ocean, no country labels)
                            url=""
                        />
                        <ImageOverlay
                            url={'http://tools.climatesmartfarming.org/caribbean-drought/static/pdsi_'+app.yearMonthText+'.png'}
                            opacity={0.7}
                            // final bounds
                            //bounds={[[6.64,-90.00],[30.00,-60.00]]}
                            // old dataset bounds
                            //bounds={[[7.07,-90.00],[30.00,-60.00]]}
                            bounds={[[7.18786812,-90.00],[30.00,-60.00]]}
                            onLoad={this.handleImageLoad}
                        >
                        </ImageOverlay>
                        <GeoJSON
                            data={app.getCaribbeanGeojson}
                            style={app.countryFeatureStyle}
                            onEachFeature={app.countryOnEachFeature}
                        />
                        <Control position="topright">
                            <div className="map-legend">
                                <img src={legend} alt="Map Legend" opacity={0.7} width={61} height={340}></img>
                            </div>
                        </Control>
                    </Map>
                  </Loader>
                </div>
            )
  }

}

//export default MapDisplay;

