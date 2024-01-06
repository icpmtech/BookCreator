import styled from 'styled-components';

export const HeaderStyled = styled.header`
    padding-bottom: 10px;
    border-bottom: 1px solid #555;
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 2px;

    svg {
        font-size: 10px;
        color: #9d9d9d;
    }
    h2 {
        color: #333;
    }
`;

export const SectionStyled = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const MainStyled = styled.main`
    
    margin: 0 auto;
    padding: 30px 15px;
    width: 100%;
   
    div {
       
        top: 5px;
        left: 5px;
        color: #61dafb;
        font-size: 15px;
        display: flex;
        gap: 3px;

        span {
            font-size: 15px;
            text-shadow: 0 0 3px #00000015;
        }
    }

    @media (max-width: 600px) {
        box-shadow: none;

        ${HeaderStyled} {
            flex-direction: column;
        }
    }

    @media (max-width: 490px) {
        ${SectionStyled} {
            flex-direction: column;
            gap: 0;
            padding: 0 20px;
        }
    }
`;
