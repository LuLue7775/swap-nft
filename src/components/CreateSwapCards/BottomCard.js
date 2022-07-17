import React from 'react'
import styled from 'styled-components';

export default function BottomCard({
    haveNFTData,
    havePrice,
    wantNFTData,
    wantPrice,
    handleExpire,
    expireIn,
    handleSubmit,
    handleReset
}) {
  return (
    <StyledCardWrapBottom> 
    <StyledBottomTop>
      <h3> YOUR CONTRACT</h3>
    </StyledBottomTop>
    
    <StyledBottomLeft>
      <p> your NFT: {haveNFTData?.nft_address }</p>
      <p> token ID: # {haveNFTData?.token_id } </p>
      <p> {haveNFTData?.schema_name } </p>
      <p> name: {haveNFTData?.name } </p>
      <p> make-up price: { havePrice } </p>
    </StyledBottomLeft>
  
    <StyledBottomRight>
      <p> trade for NFT: {wantNFTData?.nft_address }</p>
      <p> token ID: # {wantNFTData?.token_id } </p>
      <p> {wantNFTData?.schema_name } </p>
      <p> name: {wantNFTData?.name } </p>
      <p> make-up price: { wantPrice } </p>
    </StyledBottomRight>
  
    <StyledBottomBottom>
      <StyledExpire> expire in 
        <StyledInput type="number" onChange={handleExpire} defaultValue={expireIn} />
      </StyledExpire>
      <StyledButton type="submit" onClick={handleSubmit}> create swap </StyledButton>
      <StyledButton onClick={handleReset}> reset swap </StyledButton>
    </StyledBottomBottom>

  </StyledCardWrapBottom>
  )
}


const StyledCardWrapBottom = styled.div`
  grid-area: bottom;
  border: 1px solid var(--main-border-color);
  border-radius: 20px;
  height: 100%;
  width: 100%;
  display: flex;
  
  display: grid;
  grid-template-areas: "b-top b-top" 
                        "b-left b-right"
                        "b-bottom b-bottom";
  grid-template-columns: 50% 50%;
  grid-template-rows: 15% 60% 25%;

  font-family: 'Gothic A1', sans-serif;
  font-weight: 300;

`



const StyledBottomTop = styled.div`
  grid-area: b-top;
  border-bottom:  1px solid var(--main-border-color);
  display: flex;
  justify-content: center;
  align-items: center;
`
const StyledBottomLeft = styled.div`
  grid-area: b-left;
  border-right:  1px solid var(--main-border-color);
`
const StyledBottomRight = styled.div`
  grid-area: b-right;
`
const StyledBottomBottom = styled.div`
  grid-area: b-bottom;
  border-top:  1px solid var(--main-border-color);
  padding: 0 10% 0 10% ;
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 10px;
  
`



const StyledExpire= styled.div`
  white-space: nowrap;

`
const StyledInput= styled.input`
  max-width: 70px;
`
const StyledButton = styled.button`
  display: inline-flex;
  justify-content: center; 
  align-items: center; 
  padding: 15px;
  margin: 10px;

  height: auto;
  max-height: 35px;
  background-color: #ebff12;
  border-radius: 5px;
  border-color: orange;
  box-shadow: 0px 2px 2px 1px #0F0F0F;
  cursor: pointer;

  &:hover {
    background-color: #12f7ff;
  }
`
