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

import React from 'react';
import { observable, computed, action } from 'mobx';
import jsonp from 'jsonp';

import caribbean_geojson from '../data/caribbean.json';
 
export class RefStore {
    // Data Sources and References -------------------------------------------------------
    // For Components: InfoButton & InfoWindow -------------------------------------------
    @observable info_status=false;
    @action updatePopupStatus = () => { this.info_status = !this.info_status };
    @computed get popupStatus() { return this.info_status };
    info_content = 
        <div>
          <h2>Data Sources</h2>
          <div>This is a test.</div>
        </div>;
}

export class AppStore {

    // Everything Else -------------------------------------------------------------------

    @observable year;
    @observable month;
    @observable country='';
    @observable yearStart='1950';
    @observable yearEnd;
    @observable monthEnd;
    @observable selectedCountryData = [];
    @observable countryData = {};
    @observable countryGeojson = {};
    @observable loaderLastDate=false;
    @observable loaderCountryData=false;
    @observable loaderCountryGeojson=false;
    @observable loaderImageOverlay=false;
    monthPickerLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    monthNumberLabels = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

    @action updateLoaderImageOverlay = (l) => {
            this.loaderImageOverlay = l;
        }

    @action updateLoaderLastDate = (l) => {
            this.loaderLastDate = l;
        }

    @action updateLoaderCountryData = (l) => {
            this.loaderCountryData = l;
        }

    @action updateLoaderCountryGeojson = (l) => {
            this.loaderCountryGeojson = l;
        }

    @action changeCalendarValues = (y,m) => {
            this.year = y;
            this.month = m;
        }

    @action changeCountry = (c) => {
            this.country = c;
            this.updateSelectedCountryData(this.countryData[c])
        }

    @action updateSelectedYear = (y) => {
            if (this.getLoaderImageOverlay === false) {
                this.updateLoaderImageOverlay(true);
            }
            let yearValue = y.value;
            this.year = yearValue;
            if (this.getYear===this.yearEnd) {
                this.updateSelectedMonth({ value: this.getMonth });
            }
        }

    @action updateSelectedMonth = (m) => {
            if (this.getLoaderImageOverlay === false) {
                this.updateLoaderImageOverlay(true);
            }
            let radix=10;
            let monthValue = m.value;
            if (this.year === this.yearEnd) {
                if (parseInt(monthValue,radix)<=parseInt(this.monthEnd,radix)) {
                    this.month = monthValue;
                } else {
                    this.month = this.monthEnd;
                }
            } else {
                this.month = monthValue;
            }
        }

    @action updateSelectedCountryData = (d) => {
            this.selectedCountryData = d;
        }

    @action updateCountryData = (d) => {
            this.countryData = d;
        }

    @action updateCountryGeojson = (d) => {
            this.countryGeojson = d;
        }

    @computed get getLoaderImageOverlay() {
            return this.loaderImageOverlay
        }

    @computed get getLoaderLastDate() {
            return this.loaderLastDate
        }

    @computed get getLoaderCountryData() {
            return this.loaderCountryData
        }

    @computed get getLoaderCountryGeojson() {
            return this.loaderCountryGeojson
        }

    @computed get getLoader() {
            let res = null
            //console.log(this.getLoaderCountryData);
            //console.log(this.getLoaderCountryGeojson);
            //console.log(this.getLoaderLastDate);
            //console.log(this.getLoaderImageOverlay);
            if (this.getLoaderCountryData || this.getLoaderCountryGeojson || this.getLoaderLastDate || this.getLoaderImageOverlay) {
                res = true
            } else {
                res = false
            }
            return res
        }

    @computed get getMonthLabels() {
            //this.updateMonthLabels
            //return {'text': this.monthPickerLabels, 'numbers': this.monthNumberLabels }
            return {'text': this.monthPickerLabels, 'numbers': this.monthNumberLabels }
        }

    @computed get getMonthOptions() {
            let radix=10;
            const labels = this.getMonthLabels
            const monthOptions = []
            var idxMonthEnd;
            if (this.year === this.yearEnd) {
                idxMonthEnd = parseInt(this.monthEnd,radix) - 1
            } else {
                idxMonthEnd = labels.text.length - 1
            }
            for (var i = 0; i < labels.text.length; i += 1) {
                if (i <= idxMonthEnd) {
                    monthOptions.push({ value: labels.numbers[i], label: labels.text[i], clearableValue: false, disabled: false })
                } else {
                    monthOptions.push({ value: labels.numbers[i], label: labels.text[i], clearableValue: false, disabled: true })
                }
            }
            return monthOptions
        }

    @computed get getCountry() {
            return this.country
        }

    //@computed get getCountryGeojson() {
    //        return this.countryGeojson
    //    }
    @computed get getCaribbeanGeojson() { return caribbean_geojson };

    @computed get getYear() {
            return this.year
        }

    @computed get getMonth() {
            return this.month
        }

    @computed get yearMonthTextDisplay() {
            return (this.monthPickerLabels[this.month-1] + ' ' + this.year)
        }

    @computed get yearMonthText() {
            return (this.year+this.monthNumberLabels[this.month-1])
        }

    @computed get yearMonthObject() {
            let radix = 10;
            return {year:parseInt(this.year,radix), month:parseInt(this.month,radix)}
        }

    @computed get chartData() {
            let colorUse = '';
            const monthData = [];
            const dlen = this.selectedCountryData.length;
            for (var i=0; i<dlen; i++) {
                if (this.selectedCountryData[i] > 4) {
                    colorUse = 'rgba(29,64,64,1.0)'
                } else if ((this.selectedCountryData[i] > 3) && (this.selectedCountryData[i] <= 4)) {
                    colorUse = 'rgba(3,93,93,1.0)'
                } else if ((this.selectedCountryData[i] > 2) && (this.selectedCountryData[i] <= 3)) {
                    colorUse = 'rgba(49,143,143,1.0)'
                } else if ((this.selectedCountryData[i] > 1) && (this.selectedCountryData[i] <= 2)) {
                    colorUse = 'rgba(139,203,203,1.0)'
                } else if ((this.selectedCountryData[i] > 0) && (this.selectedCountryData[i] <= 1)) {
                    colorUse = 'rgba(196,218,244,1.0)'
                } else if ((this.selectedCountryData[i] > -1) && (this.selectedCountryData[i] <= 0)) {
                    colorUse = 'rgba(246,222,165,1.0)'
                } else if ((this.selectedCountryData[i] > -2) && (this.selectedCountryData[i] <= -1)) {
                    colorUse = 'rgba(246,178,91,1.0)'
                } else if ((this.selectedCountryData[i] > -3) && (this.selectedCountryData[i] <= -2)) {
                    colorUse = 'rgba(240,103,12,1.0)'
                } else if ((this.selectedCountryData[i] > -4) && (this.selectedCountryData[i] <= -3)) {
                    colorUse = 'rgba(121,66,10,1.0)'
                } else if (this.selectedCountryData[i] <= -4) {
                    colorUse = 'rgba(64,42,13,1.0)'
                } else {
                    colorUse = null
                }
                monthData.push({
                    x: Date.UTC(this.yearStart,i,1),
                    y: this.selectedCountryData[i],
                    color: colorUse,
                })
            }
            return monthData
        }

    @computed get chartTitle() {
            //return 'PDSI : '+ this.getCountry + ' <span style="color:red;">(USING FILLER DATA FOR TESTING)</span>'
            return 'PDSI : '+ this.getCountry
        }

    @computed get chartConfig() {
            return {
                    credits: { enabled: false },
                    legend: { enabled: false },
                    chart: { 
                        height: 100,
                        margin: [5,5,5,10],
                    },
                    title: {
                        text: this.chartTitle,
                        style: { "color": "#0000FF", "fontSize": "12px" },
                        align: 'left',
                        x: 20,
                        y: 8,
                        floating: true,
                    },
                    xAxis: {
                        type: 'datetime',
                        dateTimeLabelFormats: { year: '%Y' },
                        labels: {
                            align: 'left',
                            x: 0,
                            y: -2 
                        },
                    },
                    yAxis: {
                        min: -6,
                        max: 6,
                        tickInterval: 2,
                        title: { text: null },
                        labels: {
                            align: 'center',
                            x: 0,
                            y: 4,
                        }
                    },
                    tooltip: {
                        pointFormat: "PDSI: {point.y:.2f}",
                        xDateFormat: "%b %Y",
                        crosshairs: [{
                            width: 1,
                            color: 'gray',
                            dashStyle: 'solid'
                        }],
                    },
                    series: [{
                        type: 'column',
                        name: 'PDSI',
                        data: this.chartData,
                        //color: '#00FF00',
                        //negativeColor: '#FF0000',
                        //color: '#318F8F',
                        //negativeColor: '#F0670C',
                    }],
                }
        }

    countryFeatureStyle(feature) {
            return {
                    weight: 2,
                    opacity: 0.2,
                    color: 'black',
                    dashArray: '3',
                    fillOpacity: 0.0
            };
        }

    countryMouseoverStyle = {
            weight: 3,
            opacity: 0.7,
            color: 'black',
            dashArray: '3',
            fillOpacity: 0.0
        }

    countryMouseoutStyle = {
            weight: 2,
            opacity: 0.2,
            color: 'black',
            dashArray: '3',
            fillOpacity: 0.0
        }

    @action countryOnEachFeature = (feature, layer) => {
            let namesToIgnore = ['Saint Barthelemy', 'Cayman Islands', 'Saint Martin', 'Turks and Caicos Islands', 'Barbados']
            if (!namesToIgnore.includes(feature.properties.admin)) {
                layer.on({
                    mouseover: () => {
                        layer.setStyle(this.countryMouseoverStyle);
                        this.changeCountry(feature.properties.admin);
                    },
                    mouseout: () => { layer.setStyle(this.countryMouseoutStyle) },
                    click: () => {
                        layer.setStyle(this.countryMouseoverStyle);
                        this.changeCountry(feature.properties.admin)
                    },
                });
            } else {
            };
        }

    @action downloadFinalYearMonth = () => {
            //console.log('INSIDE downloadFinalYearMonth Beginning');
            //console.log(this.getLoaderLastDate);
            if (this.getLoaderLastDate === false) {
                this.updateLoaderLastDate(true);
            }
            const url = 'http://tools.climatesmartfarming.org/caribbean-drought/last-date'
            jsonp(url, null, (err,data) => {
                if (err) {
                    //console.log('INSIDE downloadFinalYearMonth ERROR');
                    //console.error(err.message);
                    this.year = '2017';
                    this.month = '06';
                    this.yearEnd = '2017';
                    this.monthEnd = '06';
                    return
                } else {
                    //console.log(data);
                    let y = data['finalYear'];
                    let m = data['finalMonth'];
                    this.yearEnd = y;
                    this.monthEnd = m;
                    this.updateLoaderLastDate(false);
                    this.changeCalendarValues(y,m);
                    return
                }
            });
        }

    @action downloadCountryGeojson = () => {
            if (this.getLoaderCountryGeojson === false) {
                this.updateLoaderCountryGeojson(true);
            }
            const url = 'http://tools.climatesmartfarming.org/caribbean-drought/geojson'
            jsonp(url, null, (err,data) => {
                if (err) {
                    console.error(err.message);
                    this.updateCountryGeojson({"type":"FeatureCollection", "features":[]});
                    return
                } else {
                    this.updateCountryGeojson(data);
                    if (this.getLoaderCountryGeojson === true) {
                        this.updateLoaderCountryGeojson(false);
                    }
                    return
                }
            });
        }

    @action downloadCountryData = () => {
            if (this.getLoaderCountryData === false) {
                this.updateLoaderCountryData(true);
            }
            const url = 'http://tools.climatesmartfarming.org/caribbean-drought/ts-all'
            jsonp(url, null, (err,data) => {
                if (err) {
                    console.error(err.message);
                    this.updateCountryData({});
                    return
                } else {
                    const d = data['data']
                    this.updateCountryData(d);
                    if (this.getLoaderCountryData === true) {
                        this.updateLoaderCountryData(false);
                    }
                    return
                }
            });
        }

    constructor() {
        this.downloadFinalYearMonth()
        //this.downloadCountryGeojson()
        this.downloadCountryData()
    }

}

