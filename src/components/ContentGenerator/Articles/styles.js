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
    width: 40px;
    height: 32px;
`;

export const DivStyled = styled.div`
    box-shadow: 0 0 12px #11111122;
    padding: 10px;
    width: 100%;
    background: white;
    @media (max-width: 600px) {
        flex-direction: column;
        gap: 5px;
        box-shadow: none;
        h2 {
            font-size:16px;
        }
    }
`;
export const DivHeader = styled.div`
display: flex;
box-shadow: rgb(0 21 41) 0px 0px 12px;
padding: 10px;
width: 100%;
background: #5ed4f4;
`;

export const ContainerStyled = styled.section`
box-shadow: 0 0 12px #11111122;
padding: 10px;
width: 100%;
background: white;
@media (max-width: 600px) {
    flex-direction: column;
    gap: 5px;
    box-shadow: none;
}
`;


