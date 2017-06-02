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

    render() {

        return (
            <div className="page">
                <Nav />
                <Header title="Disclaimer" />
                <Footer/>
            </div>
        );
    }
}

export default Dashboard;
