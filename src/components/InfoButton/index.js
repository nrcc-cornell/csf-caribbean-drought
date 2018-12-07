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
import { string } from 'prop-types'
import jQuery from 'jquery';
import 'jquery-ui/themes/base/core.css';
import 'jquery-ui/themes/base/theme.css';
import 'jquery-ui/themes/base/button.css';
import 'jquery-ui/ui/core';
import 'jquery-ui/ui/widgets/button';

import '../../styles/InfoButton.css';

@inject("store") @observer
class InfoButton extends Component {

  static propTypes = {
    button_label: string,
  }

  static defaultProps = {
    button_label: "Go",
  }

  componentDidMount() {
    jQuery(".data-sources-button").button({
       icons: { primary: "ui-icon-info" },
       iconPosition: "end",
       label: this.props.button_label,
    });
  }

  render() {
        return (
            <div className="data-sources-label">
                <button className="data-sources-button" onClick={this.props.store.ref.updatePopupStatus}>Info</button>
            </div>
        )
  }

};

export default InfoButton;
