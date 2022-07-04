import React, { useEffect, useState, useRef } from 'react'
import ModalAddAsset from './ModalAddAsset';
import HaveNFTContent from './HaveNFTContent';
import WantNFTContent from './WantNFTContent';
import styled from 'styled-components';

import { ethers, BigNumber } from 'ethers';
import { contractABI, contractAddress, erc721ContractABI } from '../configs/contract';
import { useSigner, useContract, useContractWrite } from 'wagmi'
import UserAssets from '../pages/UserAssets';

import { motion } from 'framer-motion'


/**
 * @TODO Refactor style component with variable (eg:left/right)
 * 
 * @TODO click wallet nft load data
 * @TODO load nft
 * @TODO add inputs: margin prices. 
 *        if have one, Take() first before create contract, (do it in one function?) *  
 * @TODO field sanitizing and validation. required field. 
 * @TODO useWaitForTransaction and add loader
 */
export default function CreateSwap() {

  const [fetchedHaveData, setFetchedHaveData] = useState({ haveTokenId:'', haveNFTAddress:'' });
  const [fetchedWantData, setFetchedWantData] = useState({ wantTokenId:'', wantNFTAddress:'', receiver: '', amount:'' });
  const [expireIn, setExpireIn] = useState(7);
  const [havePrice, setHavePrice] = useState(0);
  const [wantPrice, setWantPrice] = useState(0);
  const [ haveNFTData, setHaveNFTdata] = useState()
  const [ wantNFTData, setWantNFTdata] = useState()
  const [renderHaveInputForms, setRenderHaveInputForms] = useState(true)
  const [renderWantInputForms, setRenderWantInputForms] = useState(true)


  const { data: signer } = useSigner()
  const contract = useContract({
    addressOrName: contractAddress,
    contractInterface: contractABI,
    signerOrProvider: signer
  })
  


  const calculateExpiredDate = (days) => {
    return days*24*60*60 + Math.floor(Date.now() / 1000)
  }
  const formatPrice = (price) => {
    return parseFloat(price) *10**18
  }
  
  const createTransac = async(params) => {
    let paramArray = [
      params?.receiver , 
      params?.nft_address , 
      params?.wantNFTAddress || '0x0000000000000000000000000000000000000000', 
      parseInt(params?.token_id)|| 0, 
      params?.wantTokenId || 9999999, 
      calculateExpiredDate(expireIn), 
      formatPrice(havePrice) , 
      BigNumber.from(`${formatPrice(wantPrice)}`) ]
    
      // console.log(paramArray)
    // approve myNFT
    const nft_contract = new ethers.Contract(params.nft_address, erc721ContractABI, signer);
    await nft_contract.approve(contractAddress,  parseInt(params?.token_id) ).catch( e => console.log(e) )

    const create_res = await contract?.createTransaction(...paramArray).catch( e => console.log(e) )
    // console.log(create_res)
  }

  /**
   *  app states wise
   */
  const [isModalOpened, setModalOpened] = useState(false);
  const [ModalContent, setModalContent] = useState(null); 

  const handleAssetClicked = (whichClicked) => {
    setModalOpened(true);
    setModalContent(whichClicked);
  }

  const handleExpire = e => {
    setExpireIn(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault();
    createTransac({ ...fetchedHaveData, ...fetchedWantData });
  }
  const handleReset = e => {
    e.preventDefault();
    setFetchedHaveData({});
    setFetchedWantData({});
    setHaveNFTdata({});
    setWantNFTdata({});
    setRenderHaveInputForms(true);
    setRenderWantInputForms(true);
  }
  
  // useEffect(() => {
  //   console.log("haveNFTDataRef.current",haveNFTDataRef.current)
  // }, [haveNFTDataRef.current])

  function handletHaveNFT(newValue) {
    setHaveNFTdata(newValue);
    setRenderHaveInputForms(false)
  }
  function handletWantNFT(newValue) {
    setWantNFTdata(newValue);
    setRenderWantInputForms(false)
  }

  // useEffect(() => {
  //   console.log(fetchedHaveData)
  // }, [fetchedHaveData])

  return (
    <StyledCreateSwapContainer
      as={motion.div}
      initial={{ height: 0 }}
      animate={{ height: "100%" }}
      exit={{ y: window.innerHeight }}
      transition={{
        type:"spring",
        stiffness: 260,
        damping: 20
      }}
    >
      <StyledElementsWrap>
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

              <StyledNFTImg>
                <img src={haveNFTData?.image_url} alt=""  />
              </StyledNFTImg>
              </StyledCardWrapNestedInnerLeft>
            </StyledCardWrapNestedLeft>
            </StyledCardWrapLeft>

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
              <StyledNFTImg className='nft-img'>
                <img src={wantNFTData?.image_url} alt=""/>
              </StyledNFTImg>
              </StyledCardWrapNestedInnerRight>
            </StyledCardWrapNestedRight>
            </StyledCardWrapRight>

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
       </StyledElementsWrap>

        <ModalAddAsset isModalOpened={isModalOpened} setModalOpened={setModalOpened}> {ModalContent} </ModalAddAsset>
      </StyledCreateSwapContainer>
  )
}




// ==========================================
const StyledCreateSwapContainer = styled(motion.div)`
  position: absolute;
  top:0;
  left:0;
  height: 100vh;
  width: 100%;
  color: #FFF;
  background: #000;
`
const StyledElementsWrap = styled.div`
  height: 100vh;
  width: 100%;
  display: grid;
  grid-template-areas: "left right" 
                        "bottom bottom";
  grid-template-columns: 40% 40%;
  grid-template-rows: clamp(350px, 40%, 500px) clamp(300px, 40%, 400px);
  gap: 10px;
  justify-content: center;
  align-content: center;

 
  
`
const StyledCardWrapLeft = styled.div`
  grid-area: left;
  border: 1px solid var(--main-border-color);
  border-radius: 20px;
  width: 100%;

`
const StyledCardWrapRight = styled.div`
  grid-area: right;
  border: 1px solid var(--main-border-color);
  border-radius: 20px;
`

const StyledSwapCardTexts = styled.div`
  font-size: 1.2rem;
  font-family: 'Gothic A1', sans-serif;
  
  div { 
    display: flex;
    align-items: end;
    gap: 20px;
  }

  input {
    width: 150px;
  }

`
const StyledCardWrapBottom = styled.div`
  grid-area: bottom;
  border: 1px solid var(--main-border-color);
  border-radius: 20px;

  width: 100%;
  display: flex;
  
  display: grid;
  grid-template-areas: "b-top b-top" 
                        "b-left b-right"
                        "b-bottom b-bottom";
  grid-template-columns: 50% 50%;
  grid-template-rows: 15% 70% 15%;

  font-size: 1.2rem;
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

const StyledNFTImg = styled.div`
  // position: absolute;
  // width: 400px;
  // height: 400px;
  // z-index:-1;
  // overflow: hidden;
  // display: flex;
`

const StyledExpire= styled.div`
  white-space: nowrap;

`
const StyledInput= styled.input`
  max-width: 70px;
`

const StyledCardWrapNestedLeft = styled.div`
    border: 1px solid var(--main-border-color);
    border-radius: 20px;
    width: calc( 100% - 10px );
    height: calc(100% - 10px);
`
const StyledCardWrapNestedInnerLeft = styled.div`
    border: 1px solid var(--main-border-color);
    border-radius: 20px;
    width: calc( 100% - 10px );
    height: calc(100% - 10px);

    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    padding: 1rem;
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
    border: 1px solid var(--main-border-color);
    border-radius: 20px;
    width: calc( 100% - 10px );
    height: calc( 100% - 10px );

    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    padding: 1rem;
`
