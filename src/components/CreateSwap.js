import React, { useEffect, useState, useRef } from 'react'
import ModalAddAsset from './ModalAddAsset';
import WantNFTContent from './CreateSwapAddAssetTab/WantNFTContent';
import LeftCard from './CreateSwapCards/LeftCard';
import styled from 'styled-components';

import { ethers, BigNumber } from 'ethers';
import { contractABI, contractAddress, erc721ContractABI } from '../configs/contract';
import { useSigner, useContract, useContractWrite } from 'wagmi'

import { motion } from 'framer-motion'
import RightCard from './CreateSwapCards/RightCard';
import BottomCard from './CreateSwapCards/BottomCard';


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

  const [ fetchedHaveData, setFetchedHaveData] = useState({ haveTokenId:'', haveNFTAddress:'' });
  const [ fetchedWantData, setFetchedWantData] = useState({ wantTokenId:'', wantNFTAddress:'', receiver: '', amount:'' });
  const [ expireIn, setExpireIn] = useState(7);
  const [ havePrice, setHavePrice] = useState(0);
  const [ wantPrice, setWantPrice] = useState(0);
  const [ haveNFTData, setHaveNFTdata] = useState()
  const [ wantNFTData, setWantNFTdata] = useState()
  const [ renderHaveInputForms, setRenderHaveInputForms] = useState(true)
  const [ renderWantInputForms, setRenderWantInputForms] = useState(true)

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
  const [isNotifier, setNotifier] = useState(true);

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
            <LeftCard
              renderHaveInputForms={renderHaveInputForms} 
              handleAssetClicked={handleAssetClicked} 
              fetchedHaveData={fetchedHaveData}
              setFetchedHaveData={setFetchedHaveData}
              handletHaveNFT={handletHaveNFT}
              setModalOpened={setModalOpened}
              setHavePrice={setHavePrice}
              haveNFTData={haveNFTData}
            />

            <RightCard
              renderWantInputForms={renderWantInputForms} 
              handleAssetClicked={handleAssetClicked} 
              fetchedWantData={fetchedWantData}
              setFetchedWantData={setFetchedWantData}
              handletWantNFT={handletWantNFT}
              setModalOpened={setModalOpened}
              setWantPrice={setWantPrice}
              wantNFTData={wantNFTData}
            />
            
            <BottomCard
                haveNFTData={haveNFTData}
                havePrice={havePrice}
                wantNFTData={wantNFTData}
                wantPrice={wantPrice}
                handleExpire={handleExpire}
                expireIn={expireIn}
                handleSubmit={handleSubmit}
                handleReset={handleReset}
            />

       </StyledElementsWrap>

        <ModalAddAsset isModalOpened={isModalOpened} setModalOpened={setModalOpened}> {ModalContent} </ModalAddAsset>

        <StyledNotifier isNotifier={isNotifier}> 
          <StyledModalBtn onClick={() => setNotifier(false) }> X </StyledModalBtn>
          <div>NOTE: This service is still on alpha version. Currently only works on Rinkeby.  </div>
        </StyledNotifier>
      </StyledCreateSwapContainer>
  )
}

const StyledNotifier = styled.div`
  position: absolute;
  bottom:0;
  left:50%;
  transform: translateX(-50%);
  height: 50px;
  width: 60%;
  color: #000;
  background: #FFF;
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: ${({ isNotifier }) => isNotifier ? '' : 'hidden'}
`
const StyledModalBtn = styled.button`
    position: absolute;
    top: 0;
    right: 0;
    width: 20px;
    height: 20px;
    border: none;
    background: #FFF;
    z-index: 99;

    &:hover {
        background-color: #12f7ff;
      }
`

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
  position: relative;
  height: 100vh;
  width: 100%;
  display: grid;
  grid-template-areas: "left right" 
                        "bottom bottom";
  grid-template-columns: 40% 40%;
  grid-template-rows: 350px max(40%, 210px);
  padding: 80px 0;
  gap: 10px;
  justify-content: center;
  align-content: center;
  overflow: hidden;
`


