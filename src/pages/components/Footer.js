import React, { Component } from 'react';;
import {Grid, Row, Col} from "react-bootstrap";
import '../../assets/css/footer.css';

class Footer extends Component {

    render() {

        let fluid = true;

        return (
            <footer className="footer">
                <Grid className="grid" fluid={fluid}>
                    <Row className="show-grid">
                        <Col sm={6} md={6}><div className="footer-text"> Developed by <a target="_blank" href="https://founder.no">Founder</a></div></Col>
                        <Col sm={6} md={6}><div className="footer-text footer-text-right"><img className="exchange-image" src={"https://poloniex.com/images/media_kit/Poloniex-logo-800px.png"} /></div></Col>
                    </Row>
                </Grid>
            </footer>
        )

    }
}

export default Footer;