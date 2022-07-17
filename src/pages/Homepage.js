import { useState } from 'react'
import BG from '../background/neon.gif'
import styled from 'styled-components'
export default function Homepage() {

    return (
      <StyledHome className='home' BG={BG}>
            <StyledBG src={BG} width="100%" height="100%" alt=""/>

          <StyledElementsTop >
            <StyledTextsOuter>
                <StyledTexts> Meet your blocks at our block. </StyledTexts>
            </StyledTextsOuter>
                
          </StyledElementsTop>

          {/* <StyledElementsBottom>
            <StyledCard></StyledCard>
            <StyledCard></StyledCard>
            <StyledCard></StyledCard>
          </StyledElementsBottom> */}
      </StyledHome>

      
  )
}

const StyledBG = styled.img`
  position: fixed;
  top:0;
  left:0;
  height: 100vh;
  width: 100%;
  z-index: -1;
  `

const StyledHome = styled.div`
  position: absolute;
  top:0;
  left:0;
  height: 100vh;
  width: 100%;
  z-index: -1;
  display: grid;
  grid-template-rows: 1fr 1fr;

  color: #FFF;
  background: #000;


`
const StyledElementsTop = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
  
`

const StyledElementsBottom = styled.div`
  width: auto;
  height: 100vh;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: center;
  justify-items: center;
  align-items: center;

`
const StyledCard = styled.div`
  width: 80%;
  height: 50%;

  border: 1px solid var(--home-border-color);
  border-radius: 20px;
  background: #FFFFFF50;
`

const StyledTexts = styled.div`
  margin: 5px;
  font-size: 1.2rem;
  padding: 3rem;
  border: 1px solid var(--home-border-color);
  border-radius: 20px;
  background: #000;
  font-family: 'Press Start 2P', serif;

`
const StyledTextsOuter = styled.div`
  border: 1px solid var(--home-border-color);
  border-radius: 20px;
`

const StyledButton = styled.button`
  display: inline-flex;
  justify-content: center; 
  align-items: center; 
  padding: 15px;
  margin: 10px;

  height: auto;
  max-height: 35px;
  background: #ebff12;
  border-radius: 5px;
  border-color: orange; 
  border-color: transparent;
  box-shadow: 0px 2px 2px 1px #0F0F0F;
  cursor: pointer;

  font-family: "VT323";
  font-size: 1.2rem;
  &:hover {
    background-color: #12f7ff;
  }
`