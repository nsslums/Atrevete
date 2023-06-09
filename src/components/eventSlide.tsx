import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { EventCard } from "../stories/atrevete/event/EventCard";
import {FaChevronLeft} from "@react-icons/all-files/fa/FaChevronLeft"
import {FaChevronRight} from "@react-icons/all-files/fa/FaChevronRight"


const arrow_css = css({
    position: "absolute",
    width: "40px",
    height: "40px",
    top: "50%",
    transform: "translate(0, -50%)",
    backgroundColor: "rgba(255,255,255, .4)",
    borderRadius: "90px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#1E1E1E",
    zIndex: 20,
})

const sleeveCurtain = css({
    "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        width: "50px",
        height: "100%",
        background: "linear-gradient(90deg, #121212 0%, rgba(18, 18, 18, 0.713542) 47.4%, rgba(18, 18, 18, 0) 100%)",
        zIndex: 10
    },

    "&::after": {
        content: '""',
        position: "absolute",
        top: 0,
        right: 0,
        width: "50px",
        height: "100%",
        background: "linear-gradient(-90deg, #121212 0%, rgba(18, 18, 18, 0.713542) 47.4%, rgba(18, 18, 18, 0) 100%)",
        zIndex: 10
    }
})

function NextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        css={[arrow_css, { right: "-20px",}]}
        onClick={onClick}
      >
        <FaChevronRight />
    </div>
    );
  }

  function PrevArrow(props: any) {
    const { className, style, onClick } = props
    return (
      <div
        css={[arrow_css, { left: "-20px",}]}
        onClick={onClick}
      >
        <FaChevronLeft />
    </div>
    );
  }
  

export const Events: React.FC = () => {

    const result = useStaticQuery(graphql`
        query{
            allContentfulEvent(filter: {hidden: {ne: true}}) {
                nodes {
                    title
                    contentful_id,
                    date,
                    eye_catch {
                        gatsbyImageData
                    }
                }
            }
        }
    `)
    
    const width = window.innerWidth

    const settings = (width > 1000 ? {
        infinite: true,
        initialSlide: 0,
        speed: 500,
        dots: false,
        arrows: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        centerMode: true,
        centerPadding: "50px",
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    }
    : {
        infinite: true,
        initialSlide: 0,
        speed: 500,
        dots: false,
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "0px",
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    })

    const Contener = (width > 1000 ? styled.div({
        width: "980px",
        margin: "auto",
    })
    :
    styled.div({
        width: "600px",
        margin: "auto",
    })
    )

    return (
    <Contener>
         <div>
             <Slider {...settings} css={sleeveCurtain}>
                 {result.allContentfulEvent.nodes?.map((event: any) => (
                    <div key={event.contentful_id}><EventCard title={event.title} url={"/event/" + event.title} date={event.date} image={event.eye_catch}/></div>
                 ))}
             </Slider>
         </div>
    </Contener>
    )
}