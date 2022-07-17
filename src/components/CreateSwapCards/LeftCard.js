import HaveNFTContent from '../CreateSwapAddAssetTab/HaveNFTContent';
import UserAssets from '../../pages/UserAssets';
import styled from 'styled-components';


export default function LeftCard({ 
    renderHaveInputForms, 
    handleAssetClicked, 
    fetchedHaveData,
    setFetchedHaveData,
    handletHaveNFT,
    setModalOpened,
    setHavePrice,
    haveNFTData
}) {
  return (
    <StyledCardWrapLeft>
        <StyledCardWrapNestedLeft>
            <StyledCardWrapNestedInnerLeft>

                {renderHaveInputForms && (
                    <>
                    <h3> ADD ASSET </h3>

                    <StyledButton 
                        onClick={ () => handleAssetClicked(
                        <HaveNFTContent fetchedHaveData={fetchedHaveData} setFetchedHaveData={setFetchedHaveData} handletHaveNFT={handletHaveNFT} setModalOpened={setModalOpened}/>) }
                    > 
                        by address
                    </StyledButton>
                    <StyledButton 
                        onClick={ () => handleAssetClicked(
                        <UserAssets fetchedHaveData={fetchedHaveData} setFetchedHaveData={setFetchedHaveData} handletHaveNFT={handletHaveNFT} setModalOpened={setModalOpened}/>) }
                    > 
                        by searching in wallet
                    </StyledButton>
                    
                    <StyledSwapCardTexts>
                        leave a make-up price if needed: 
                        <div> 
                        <input type="number" defaultValue="0" onChange={e => setHavePrice(e.target.value)}/>  
                        <p> eth </p>
                        </div>
                    </StyledSwapCardTexts>
                    </>
                )}

                <StyledImg src={haveNFTData?.image_url} alt=""  />
            </StyledCardWrapNestedInnerLeft>
        </StyledCardWrapNestedLeft>
    </StyledCardWrapLeft>
  )
}


const StyledCardWrapLeft = styled.div`
  grid-area: left;
  border: 1px solid var(--main-border-color);
  border-radius: 20px;
  width: 100%;

`

const StyledCardWrapNestedLeft = styled.div`
  border: 1px solid var(--main-border-color);
  border-radius: 20px;
  width: calc( 100% - 10px );
  height: calc(100% - 10px);
`
const StyledCardWrapNestedInnerLeft = styled.div`
  position: relative;

  border: 1px solid var(--main-border-color);
  border-radius: 20px;
  width: calc( 100% - 10px );
  height: calc(100% - 10px);

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
