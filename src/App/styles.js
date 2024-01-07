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
export const DivStyled = styled.div`
@media screen and (max-width: 599px) {
    h2 {
        font-size: 16px;
      }
  }
  @media screen and (max-width: 300px) {
    h2 {
        font-size: 10px;
      }
      p {
        font-size: 10px;
      }
  }
  
  `;
