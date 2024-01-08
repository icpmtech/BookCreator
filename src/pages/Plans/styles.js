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

export const ButtonStyled = styled.button`
cursor: pointer;
display: inline-block;
height: 140px;
width: 10%;
bottom:200px;
line-height: 40px;
padding: 0 10px;
position:absolute;
color: white;
border:2px solid transparent;
border-radius:10px;
border-right-color:#743ad5;
border-left-color:#d53a9d;
font-size: 36px;
margin-left: 3vw;
background:
  linear-gradient(to left,
    rgb(116, 58, 213) 0%, rgb(186, 58, 143) 70% ,
    transparent 70%,  transparent 85%, 
    rgb(201, 58, 128) 85%, rgb(213, 58, 157) 100%) top/100% 2px,
  linear-gradient(to left, #743ad5 0%, #d53a9d 100%) bottom/100% 2px;
background-repeat:no-repeat;
@media (max-width: 600px) {
    cursor: pointer;
    display: inline-block;
    height: 140px;
    width: 300px;
    bottom:200px;
    line-height: 40px;
    padding: 0 10px;
    position:absolute;
    color: white;
    border:2px solid transparent;
    border-radius:10px;
    border-right-color:#743ad5;
    border-left-color:#d53a9d;
    font-size: 36px;
    margin-left: 12vw;
    background:
      linear-gradient(to left,
        rgb(116, 58, 213) 0%, rgb(186, 58, 143) 70% ,
        transparent 70%,  transparent 85%, 
        rgb(201, 58, 128) 85%, rgb(213, 58, 157) 100%) top/100% 2px,
      linear-gradient(to left, #743ad5 0%, #d53a9d 100%) bottom/100% 2px;
    background-repeat:no-repeat;
}
`;

export const MainStyled = styled.main`
    
.container {
  padding:30px;
}

@media (max-width: 600px) {
  .container {
    padding:5px;
    
  }
}

    

   
`;
