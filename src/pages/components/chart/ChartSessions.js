import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {getTickerData} from '../../../utils/api';

import '../../../assets/css/footer.css';
import '../../../assets/css/table.css';

class ChartSessions extends Component {

    constructor() {
        super()

        this.state = {
            tickers: []
        };

        this.options = {
            defaultSortName: 'pair',
            defaultSortOrder: 'asc',
            expandRowBgColor: 'white'
        };

    }

    componentDidMount() {
        setInterval(() => {
            this.getTicker();
        }, 5000);
        this.getTicker();
    }

    getTicker(){
        getTickerData().then((tickers) => {
            this.setState({ tickers: tickers });
        });
    }

    onRowSelect(row) {
        this.props.onClick(row.selector);
    }

    isExpandableRow(row) {
        return true;
    }

    expandComponent(row) {

        if(row.options){

            let expandData = [];

            Object.keys(row.options).map((key, value) => {
                let object = [];
                object["name"] = key;
                object["value"] = row.options[key];
                expandData.push(object)
                return false;
            });

            const cellEditProp = {
                mode: 'click'
            };

            return (
                <div className="tickers-table-tr">
                    <div className="tickers-table-tr-header">
                        Click to edit
                    </div>
                    <BootstrapTable
                        data={expandData}
                        trClassName='tickers-table-tr'
                        striped={true}
                        hover={true}
                        cellEdit={ cellEditProp }
                    >
                        <TableHeaderColumn dataField="name" dataSort={true} isKey={true}>Name</TableHeaderColumn>
                        <TableHeaderColumn dataField="value">Value</TableHeaderColumn>
                    </BootstrapTable>
                </div>
            );
        }

    }

    expandColumnComponent({ isExpandableRow, isExpanded }) {
        let content = '';

        if (isExpandableRow) {
            content = (isExpanded ? '(-)' : '(+)' );
        } else {
            content = ' ';
        }
        return (
            <div> { content } </div>
        );
    }


    render() {

        let tickers = this.state.tickers;
        let activeSessions = [];
        let session = this;

        Object.entries(tickers).map((entries) => {

            var ticker = entries[1];
            ticker.pair = entries[0];
            ticker.price = parseFloat(ticker.last).toFixed(3);
            ticker.change = parseFloat(ticker.percentChange).toFixed(2);

            //Only fetch main currencies
            if(ticker.pair.substring(0, 4) === "USDT"){
                activeSessions.push(ticker);
            }

            /*
             let now = moment();
             let updated = moment(ticker.updated);
             ticker.started= moment(ticker.started).fromNow();
             ticker.updated = moment(ticker.updated).fromNow();

             if(moment.duration(now.diff(updated)).asSeconds() < 120) {
             }
            */
            return false;
        });

        let selectRowProp = {
            mode: 'radio',
            bgColor: '#ffccc6',
            onSelect: function(row) {
                console.log(session.props.pair);
                session.props.onClick(row.pair);
            },

            clickToExpand:true,
            selected:[session.props.pair]
        };

        return (
            <div>
                <BootstrapTable
                    data={activeSessions}
                    options={ this.options }
                    expandableRow={ this.isExpandableRow }
                    expandComponent={ this.expandComponent }
                    trClassName='tickers-table-tr'
                    expandColumnOptions={ {
                        expandColumnVisible: true,
                        expandColumnComponent: this.expandColumnComponent
                    } }
                    striped={true}
                    hover={true}
                    selectRow={ selectRowProp }
                >
                    <TableHeaderColumn dataField="pair" dataSort={true} isKey={true}>Pair</TableHeaderColumn>
                    <TableHeaderColumn dataField="change" dataSort={true} >Change</TableHeaderColumn>
                    <TableHeaderColumn dataField="price" dataSort={true} >Price</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }

}

ChartSessions.propTypes = {
    pair: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired
};


export default ChartSessions;