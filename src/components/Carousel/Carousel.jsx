import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./carousel.css";
import {Row, Col, Card} from "react-bootstrap";
import PICT1 from '../../assets/images/img-banner1.png';

export function Carousel() {
    const options = {
        items: 2,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        center: true,
        loop: true,
        margin: 10,
        nav: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
            },
            400: {
                items: 1,
            },
            600: {
                items: 2,
            },
            700: {
                items: 2,
            },
            1000: {
                items: 2,
            }
        },
    };

    return (
        <>
        <div className="sliderCarousel">
            <OwlCarousel items={1}
                className="mt-5 owl-theme"
                center
                autoplay={true}
                stagePadding={200}
                loop={true}
                margin={0}
                lazyLoad={true}
                dots={false}

                >

                <div className="item">
                    <div className="slider1">
                        <img src={PICT1} className="image1" alt="Foto produk" />
                    </div>
                </div>
                <div className="item">
                    <div className="slider2">
                        <img src={PICT1} className="image2" alt="Foto produk" />
                    </div>
                </div>
                <div className="item">
                    <div className="slider3">
                        <img src={PICT1} className="image3" alt="Foto produk" />
                    </div>
                </div>

            </OwlCarousel>
            </div>


            

            <div className="slider">
                <OwlCarousel
                    className="owl-theme slider-items"
                    {...options}
                >
                    <div className="slider-card">
                        <Card className="card-content home-carousel-1">
                            <Row>
                                <Col xs={18} md={10} className="imgCarousel">
                                    <img src={PICT1} alt="" />
                                </Col>
                            </Row>
                        </Card>
                    </div>
                    <div className="slider-card second-slide slider-2">
                        <Card className="card-content home-carousel-2">
                            <Row>
                                <Col xs={18} md={10} className="imgCarousel">
                                    <img src={PICT1} alt="" />
                                </Col>
                            </Row>
                        </Card>
                    </div>
                    <div className="slider-card third-slide slider-2">
                        <Card className="card-content home-carousel-3">
                            <Row>
                                <Col xs={18} md={10} className="imgCarousel">
                                    <img src={PICT1} alt="" />
                                </Col>
                            </Row>
                        </Card>
                    </div>
                </OwlCarousel>
            </div>
                    
        </>
    );
}