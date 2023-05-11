import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import Slider from "react-slick"
import { EventCard } from "../stories/atrevete/EventCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "@emotion/styled";

export const Events: React.FC = () => {

    const result = useStaticQuery(graphql`
        query{
            allContentfulEvent(filter: {hidden: {ne: true}}) {
                nodes {
                    title
                    contentful_id,
                    date
                }
            }
        }
    `)

    const settings = {
        dots: true,
        infinite: true,
        arrows: true,
        speed: 500,
        slidesToShow: 2,
        centerMode: true,
    }

    const Contener = styled.div({
        width: "990px",
        display: "flex",
        justifyContent: "center"
    })

    return (
        <Contener>
            <Slider {...settings} >
                {result.allContentfulEvent.nodes?.map((event: any) => (
                    <div><EventCard key={event.contentful_id} title={event.title} url={"/event/" + event.title} date={event.date} /></div>
                ))}
            </Slider>
        </Contener>
    )
}