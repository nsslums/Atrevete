import { Global, css } from "@emotion/react";

const GlobalStyle = () => (
  <Global
    styles={css`
      html,
      body,
      div,
      span,
      object,
      iframe,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      p,
      blockquote,
      pre,
      abbr,
      address,
      cite,
      code,
      del,
      dfn,
      em,
      img,
      ins,
      kbd,
      q,
      samp,
      small,
      strong,
      sub,
      sup,
      var,
      b,
      i,
      dl,
      dt,
      dd,
      ol,
      ul,
      li,
      fieldset,
      form,
      label,
      legend,
      table,
      caption,
      tbody,
      tfoot,
      thead,
      tr,
      th,
      td,
      article,
      aside,
      canvas,
      details,
      figcaption,
      figure,
      footer,
      header,
      hgroup,
      menu,
      nav,
      section,
      summary,
      time,
      mark,
      audio,
      video {
        padding: 0;
        margin: 0;
        font-size: 100%;
        vertical-align: baseline;
        background: transparent;
        border: 0;
        outline: 0;
      }

      article,
      aside,
      details,
      figcaption,
      figure,
      footer,
      header,
      hgroup,
      menu,
      nav,
      section {
        display: block;
      }

      ul,
      li {
        list-style: none;
      }

      a {
        color: inherit;
        text-decoration: none;
        outline: none;
      }

      a:visited {
        border: none;
      }

      /* Form Style Reset */
      input,
      button,
      select,
      textarea {
        font: inherit;
        background: transparent;
        border: none;
        border-radius: 0;
        outline: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        color: white;
      }

      textarea {
        resize: none;
      }

      input[type="checkbox"],
      input[type="radio"] {
        display: none;
      }

      input[type="date"]{
        position: relative;
      }

      input[type=date]::-webkit-calendar-picker-indicator {
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
      }

      input[type="submit"],
      input[type="button"],
      label,
      button,
      select {
        cursor: pointer;
      }

      select::-ms-expand {
        display: none;
      }

      input:-webkit-autofill {
        -webkit-box-shadow: 0 0 0 1000px #fff inset;
      }

      input[type="number"] {
        -moz-appearance: textfield;
      }

      input[type="number"]::-webkit-outer-spin-button,
      input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      /* Atrevete Style */

      html {
        width: 100%;
        height: 100%;
      }
      body{
        width: 100%;
        height: 100%;
        position: relative;
        background-color: #121212;
        color: white;

        &:before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url(/noise.png);
          background-repeat: 'repeat';
          background-size: 40%;
          background-blend-mode: color-dodge;
          opacity: 3%;
        }

      }

      .bg_noise{
        position: relative;
        &:after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url(/noise.png);
          background-repeat: 'repeat';
          background-size: 40%;
          background-blend-mode: color-dodge;
          opacity: 20%;
        }
      }

      #___gatsby,
      #storybook-root{
        z-index: 10;
        position: relative;
      }

      .grecaptcha-badge{
        z-index: 1000000
      }

      .ReactModal__Overlay{
        z-index: 100;
        background-color: rgba(255,255,255,.5) !important;
      }

      :root {
        --gold-gradient: linear-gradient(20deg,#ccb37e,#7e4d16);
      }
    `}
  />
);
export default GlobalStyle;