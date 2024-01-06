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
`;

