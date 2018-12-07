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
import Select from 'react-select';
import 'react-select/dist/react-select.css';

@inject("store") @observer
class MonthPicker extends Component {

  render() {
        let radix=10;
        let yearStart = parseInt(this.props.store.app.yearStart,radix);
        let yearEnd = parseInt(this.props.store.app.yearEnd,radix);
        const range = (start, end) => Array.from({length: (end - start)}, (v, k) => k + start);
        const yearArray = range(yearStart,yearEnd+1);

        var yearOptions = []
        for (var v of yearArray) {
            yearOptions.push({ value: v.toString(), label: v.toString(), clearableValue: false })
        }

        return (
            <div>
            <div className='year-month-label'>
              <label><b>Select Month / Year</b></label>
            </div>
            <div className='year-month-select'>
                <table><tbody><tr>
                <td className='date-select'>
                <Select
                    name="month"
                    value={this.props.store.app.getMonth}
                    clearable={false}
                    options={this.props.store.app.getMonthOptions}
                    onChange={this.props.store.app.updateSelectedMonth}
                />
                </td>
                <td className='date-select'>
                <Select
                    name="year"
                    value={this.props.store.app.getYear}
                    clearable={false}
                    options={yearOptions}
                    onChange={this.props.store.app.updateSelectedYear}
                />
                </td>
                </tr></tbody></table>
            </div>
            </div>
        )
  }

};

export default MonthPicker;

