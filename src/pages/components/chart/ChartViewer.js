import React, { Component } from 'react';
import {getChartData} from '../../../utils/api';
import CandleStickChartWithMACDIndicator from './Chart';

import '../../../assets/css/footer.css';
import '../../../assets/css/chart.css';

class ChartViewer extends Component {

    constructor() {
        super()

        this.state = {
            periods: []
        };

    }

    componentDidMount() {
        setInterval(() => {
            this.getPeriods();
        }, 5000);
        this.getPeriods();
    }

    getPeriods(){
        getChartData(this.props.pair, 300, Math.round(new Date().getTime() / 1000) - (24 * 3600), 9999999999).then(periods=>Object.values(periods)).then((periods) => {
            this.setState({ periods: periods });
        });
    }

    render() {
        let periods = this.state.periods;

        if(periods.length){

            periods.forEach((d, i) => {
                d.date = new Date(periods[i].date);
                d.open = +d.open;
                d.high = +d.high;
                d.low = +d.low;
                d.close = +d.close;
                d.volume = +d.volume;
                //console.log(d);
            });

            return (
                <div className="chart-container center-block">
                    <CandleStickChartWithMACDIndicator type="hybrid" data={periods} />
                </div>
            )
        }

        return (
            <div className="chart-container loading">
                Loading ...
            </div>
        )

    }
}



ChartViewer.propTypes = {
    pair: React.PropTypes.string.isRequired
};

export default ChartViewer;