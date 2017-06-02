import React, { Component } from 'react';
import {getTradesData} from '../../utils/api';
import {BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import '../../assets/css/footer.css';
import '../../assets/css/chart.css';

class Trades extends Component {

    constructor() {
        super()

        this.state = {
            trades: []
        };

    }

    componentDidMount() {
        setInterval(() => {
            this.getTrades();
        }, 5000);
        this.getTrades();
    }

    getTrades(){
        getTradesData(this.props.pair).then(trades=>Object.values(trades)).then((trades) => {
            this.setState({ trades: trades });
        });
    }

    render() {
        let trades = this.state.trades;

        if(trades.length){
            for (var i = 0; i < trades.length; i++) {
                trades[i].date = new Date(trades[i].time);
            }

            trades.forEach((d, i) => {
                d.date = new Date(trades[i].time);
                d.open = +d.open;
                d.high = +d.high;
                d.low = +d.low;
                d.close = +d.close;
                d.volume = +d.volume;
                //console.log(d);
            });

            let tradesData = [];

            return (

                <div className="trades">
                    <h4 className="sub-title">Latest trades</h4>
                    <hr/>
                    <BootstrapTable
                        data={tradesData}
                        striped={true}
                        hover={true}
                    >
                        <TableHeaderColumn dataField="time" dataSort={true} isKey={true}>Pair</TableHeaderColumn>
                        <TableHeaderColumn dataField="num_trades">Action</TableHeaderColumn>
                        <TableHeaderColumn dataField="amount" dataSort={true} >Amount</TableHeaderColumn>
                        <TableHeaderColumn dataField="price" dataSort={true} >Price</TableHeaderColumn>
                        <TableHeaderColumn dataField="created" dataSort={true} >Time</TableHeaderColumn>
                    </BootstrapTable>
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


Trades.propTypes = {
    pair: React.PropTypes.string.isRequired
};

export default Trades;