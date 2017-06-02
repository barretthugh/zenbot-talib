import React, {Component} from 'react';
import {Grid, Row, Col} from "react-bootstrap";
import Nav from './components/Nav';
import Footer from './components/Footer';
import ChartSessions from './components/chart/ChartSessions'
import Trades from './components/Trades'
import ChartViewer from "./components/chart/ChartViewer";
import Header from "./components/Header";
import '../assets/css/app.css';
import '../assets/css/frontpage.css';
import 'moment/locale/nb';

class Dashboard extends Component {

    constructor() {
        super()

        this.state = {
            pair: 'USDT_BTC'
        };
        
        this.changeHandler = this.changeHandler.bind(this);

    }

    changeHandler(selector) {
        this.setState({ pair: selector })
    }
    
    render() {

        let fluid = true;
        let pair = this.state.pair;

        return (
            <div className="page">
                <Nav />
                <Header title={pair} />
                <Grid className="grid" fluid={fluid}>
                    <Row className="show-grid">
                        <Col sm={7} md={7}>
                            <ChartViewer pair={pair}/></Col>
                        <Col sm={5} md={5}>
                            <ChartSessions pair={pair} onClick={this.changeHandler}/>
                            <Trades pair={pair} onClick={this.changeHandler}/>
                        </Col>
                    </Row>
                </Grid>
                <Footer/>
            </div>
        );
    }
}

export default Dashboard;
