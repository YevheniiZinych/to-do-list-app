import { createGlobalStyle } from "styled-components";
import bgImg from "./img/groot-bg.jpg";

export const GlobalStyle = createGlobalStyle`

* {
  box-sizing: border-box;
  }


body,
html {
  margin: 0;
  padding: 0;
}

  body {
    font-family: Montserrat, -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
      sans-serif;
    font-size: 20px;
  }

main {
  height: 100vh;
  background-image: url(${bgImg});
  background-position: top center;
  background-repeat: no-repeat;
  background-size: cover;
}

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }


  
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    margin: 0;
    padding: 0;
  }

  
`;
