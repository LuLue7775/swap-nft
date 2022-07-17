import WantNFTContent from '../CreateSwapAddAssetTab/WantNFTContent';
import styled from 'styled-components';

export default function RightCard({
    renderWantInputForms, 
    handleAssetClicked, 
    fetchedWantData,
    setFetchedWantData,
    handletWantNFT,
    setModalOpened,
    setWantPrice,
    wantNFTData

}) {
  return (
    <StyledCardWrapRight> 
    <StyledCardWrapNestedRight>
        <StyledCardWrapNestedInnerRight>
        {
            renderWantInputForms  && (
            <>
                <h3> Target NFT </h3>
                <StyledButton 
                onClick={ () => handleAssetClicked(
                <WantNFTContent fetchedWantData={fetchedWantData} setFetchedWantData={setFetchedWantData} handletWantNFT={handletWantNFT} setModalOpened={setModalOpened}/>)}
                > 
                by address
                </StyledButton>
                <StyledSwapCardTexts>
                leave a make-up price if you'd like to: 
                <div> 
                    <input type="number" defaultValue="0"  onChange={e => setWantPrice(e.target.value)}/>  
                    <p> eth </p>
                </div>
                </StyledSwapCardTexts>
            </>
            )
        }
        
        <StyledImg src={wantNFTData?.image_url} alt=""/>
      </StyledCardWrapNestedInnerRight>
    </StyledCardWrapNestedRight>
  </StyledCardWrapRight>
  )
}


const StyledCardWrapRight = styled.div`

  grid-area: right;
  border: 1px solid var(--main-border-color);
  border-radius: 20px;
  
`

const StyledCardWrapNestedRight = styled.div`
  border: 1px solid var(--main-border-color);
  border-radius: 20px;
  width: calc( 100% - 10px );
  height: calc( 100% - 10px);
  display: flex;
  align-items: end;
    
`
const StyledCardWrapNestedInnerRight = styled.div`
  position: relative;

  border: 1px solid var(--main-border-color);
  border-radius: 20px;
  width: calc( 100% - 10px );
  height: calc( 100% - 10px );

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  padding: 1rem;
  
  overflow: hidden;
`


const StyledSwapCardTexts = styled.div`
  
  div { 
    display: flex;
    align-items: end;
    gap: 20px;
  }

  input {
    width: 150px;
  }

`
const StyledImg = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  pointer-events: none;
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
