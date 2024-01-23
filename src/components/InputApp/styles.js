import styled from 'styled-components';

export const InputContainerStyled = styled.div`
    position: relative;
    padding: 20px 0 0;
    width: 200px;
    margin-bottom: 20px;
    color: #000;
`;

export const LabelStyled = styled.label`
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 17px;
    color: #000;
    pointer-events: none;
    font-weight: 700;
`;

export const InputStyled = styled.input`
    width: 100%;
    border-bottom: 2px solid #fff;
    font-size: 17px;
    color: #000;
    font-weight: 300;
    padding: 7px 0;
    background: transparent;

    &::placeholder {
        color: transparent;
    }

    &:placeholder-shown ~ ${LabelStyled} {
        font-size: 17px;
        cursor: text;
        top: 20px;
    }

    &:focus {
        padding-bottom: 6px;
        border-width: 3px;
        border-image: linear-gradient(to right, #116399, #61dafb);
        border-image-slice: 1;
    }

    &:focus ~ ${LabelStyled} {
        position: absolute;
        top: 0;
        display: block;
        transition: 0.2s;
        font-size: 17px;
        color: #61dafb;
        text-shadow: 0 0 3px #00000015;
    }

    &:required,
    &:invalid {
        box-shadow: none;
    }
`;
