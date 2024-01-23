import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    :root {
        font-family: 'Raleway', sans-serif;
        font-size: 16px;
        font-weight: 500;
        font-synthesis: none;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        -webkit-text-size-adjust: 100%;
    }

    * {
        margin: 0;
        padding: 0;
        outline: none;
        border: none;
        box-sizing: border-box;
        text-decoration: none;
        list-style-type: none;
    }

    body, #root {
        min-height: 100vh;
        min-width: 100vw;
        display: flex;
        background: linear-gradient(45deg, #eee 51%, #666 49%);
    }
`;
import styled from 'styled-components';
import { SiInfluxdb } from 'react-icons/si';
export const LogoAnimation = styled(SiInfluxdb)`
    animation: rotateAnimation 4s ease-in-out infinite alternate;
    @keyframes rotateAnimation {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    };
    width: 140px;
    height: 32px;
    @media screen and (max-width: 599px) {
        animation: rotateAnimation 4s ease-in-out infinite alternate;
        @keyframes rotateAnimation {
            0% {
                transform: rotate(0deg);
            }
    
            100% {
                transform: rotate(360deg);
            }
        };
        width: 24px;
        height: 24px;
      }
     
`;