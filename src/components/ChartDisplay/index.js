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
import { inject, observer } from 'mobx-react';
import ReactHighcharts from 'react-highcharts';

var app;

@inject("store") @observer
class ChartDisplay extends Component {

    constructor(props) {
      super(props);
      app = this.props.store.app;
    }

    render() {
        if (app.selectedCountryData.length > 0) {
            return (
                <div className="csftool-display-chart">
                   <ReactHighcharts config={ app.chartConfig } isPureConfig />
                </div>
            )
        } else {
            return (
                <div className="csftool-display-message">
                   <p>Move cursor over map to view monthly indices for individual countries</p>
                </div>
            )
        }
    }

};

export default ChartDisplay;

