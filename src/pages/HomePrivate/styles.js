import styled from 'styled-components';

export const ImageStyled = styled.div`

`;

export const ButtonStyled = styled.button`
cursor: pointer;
display: inline-block;
height: 140px;
width: 200px;
top:600px;
line-height: 40px;
padding: 0 10px;
position:absolute;
color: white;
border:2px solid transparent;
border-radius:10px;
border-right-color:#743ad5;
border-left-color:#d53a9d;
font-size: 36px;
left:10%;
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
    height: 80px;
    width: 300px;
    top:280px;
    line-height: 40px;
    padding: 0 10px;
    position:absolute;
    color: white;
    border:2px solid transparent;
    border-radius:10px;
    border-right-color:#743ad5;
    border-left-color:#d53a9d;
    font-size: 26px;
    left:20px;
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

    

   
`;
