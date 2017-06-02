import React, {Component} from 'react';
import {Grid, Row, Col} from "react-bootstrap";
import Nav from './components/Nav';
import Footer from './components/Footer';
import '../assets/css/app.css';
import '../assets/css/frontpage.css';
import 'moment/locale/nb';
import Header from "./components/Header";

class Frontpage extends Component {


    render() {

        return (
            <div className="page">
                <Nav />
                <Header title="Welcome to zenbot" />
                <Grid className="grid">
                    <Row className="show-grid">
                        <Col sm={6} md={6} className="info-box-container">
                            <div className="info-box">
                                <div className="info-box-image-container">
                                    <img className="info-box-image" src={"https://www.google.com/intl/hi/analytics/images/feat-hed-mobile.png"} />
                                </div>
                            </div>
                        </Col>
                        <Col sm={6} md={6} className="info-box-container">
                            <div className="info-box">
                                <div className="sub-title">
                                    <h4>Automated trading bots</h4>
                                </div>
                                <hr/>
                                <p>
                                    Fully automate your strategies through mBot running 24/7.
                                    You have to login to be able to create bots which can trade.
                                </p>
                                <p>

                                </p>
                            </div>
                        </Col>
                    </Row>
                </Grid>
                <div className="exchange-container">
                </div>

                <Footer/>
            </div>
        );
    }
}

export default Frontpage;
