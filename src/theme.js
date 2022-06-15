import { createGlobalStyle } from "styled-components";

export const darkTheme = {
  body: "#181a1b",
  textColor: "#fff",
  btnColor: "#000",
  headingColor: "lightblue",
  colorLinks: "#fff",
  backFoterRed: "#460002",
  colorFoterRed: "#9f0000",
  backFoterGreen: "#365e00",
  colorFoterGreen: "#50a72",
  slider: "#FFFDF2",
};

export const lightTheme = {
  body: "#fff",
  textColor: "#000",
  btnColor: "#fff",
  headingColor: "#d23669",
  colorLinks: "#000",
  backFoterRed: "#FFDFE0",
  colorFoterRed: "#9f0000",
  backFoterGreen: "#D7FFB8",
  colorFoterGreen: "#45D62F",
  slider: "#FFCF96",
};

export const GlobalStyles = createGlobalStyle`
    body {
        background: ${(props) => props.theme.body};
        color: ${(props) => props.theme.textColor};
        transition: .3s ease;
    }
    a{
        color: ${(props) => props.theme.colorLinks};
    }
    span{
        color: ${(props) => props.theme.colorLinks};
    }
    .Loader{
        div:after {
            background: ${(props) => props.theme.textColor};
        }
    }
    label {
        background: ${(props) => props.theme.body};
        color: ${(props) => props.theme.textColor}
    }
    .answer {
        background: ${(props) => props.theme.body};
        color: ${(props) => props.theme.textColor}
    }
    .footer {
        button {
            background: ${(props) => props.theme.body};
            color: ${(props) => props.theme.textColor}
        }
    }
    .footer_error {
        background: ${(props) => props.theme.backFoterRed};
        button {
            color: ${(props) => props.theme.btnColor};
            background: ${(props) => props.theme.colorFoterRed};
        }
    }
    .footer_succes {
        background: ${(props) => props.theme.backFoterGreen};
        button {
            color: ${(props) => props.theme.btnColor};
            background: ${(props) => props.theme.colorFoterGreen};
        }
    }
    .slider:before {
        background-color: ${(props) => props.theme.slider}
    }
`;
