import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import s from './index.module.css'
import { Flex, Tabs, TabPanels, Tab, TabPanel, Box, Heading, Button } from '@chakra-ui/react'
import { BiUserCircle, BiDirections, BiShoppingBag, BiHeart, BiStar } from 'react-icons/bi'
import DatosPersonales from '../../components/PerfilPersonalData'
import MyShopping from '../../components/MyShopping'
import ReviewsContainer from '../../components/ReviewsContainer'
import AddressCreator from '../../components/AddressCreator'
import WishList from '../../components/WishList'
import { getCountriesList } from '../../redux/actions/countries.actions'
import { setUsersPanelTab } from '../../redux/actions/system.actions'
import { getUserAddresses } from '../../redux/actions/addresses.actions'
import AddressContainer from '../../components/AddressContainer'

export default function UserProfile () {
  const dispatch = useDispatch()
  const [Click, setClick] = useState({
    payment: false,
    address: false
  })

  useEffect(() => {
    dispatch(getCountriesList())
    dispatch(getUserAddresses())
  }, [])//eslint-disable-line

  const tabIndex = useSelector(state => state.system.usersPanelSelectedTab)
  const handleClickAddress = () => {
    // setClick(true)
    Click.address === false ? setClick({ ...Click, address: true }) : setClick({ ...Click, address: false })
  }

  return (
    <Flex justifyContent='center' pl={['1rem', '1rem', '2rem']} pr={['1rem', '1rem', '2rem']} pt={['0.5rem', '1rem', '3rem']} pb={['0rem', '1rem', '3rem']}>
      <Flex w='100%'>
        <Tabs borderColor='active' boxShadow='md' w='100%' index={tabIndex} onChange={(index) => dispatch(setUsersPanelTab(index))}>
          <Flex flexDirection={['column', 'column', 'row']} h='100vh' w={['90%', '100%', '100%']} overflowX='hidden'>
            <Flex alignItems='flex-start' bg='white' color='#333333' flexWrap='wrap' flexDirection={['row', 'row', 'column']} justifyContent='space-around'>
              <Tab
                justifyContent='flex-start'
                w={['45%', '45%', '100%']} _focus={{ borderColor: 'none' }}
                _active={{ color: 'white' }}
                fontWeight={500}
              ><BiUserCircle /> <Box textAlign='start' ml='10px'>Datos personales</Box>
              </Tab>
              <Tab
                justifyContent='flex-start'
                w={['45%', '45%', '100%']}
                _focus={{ borderColor: 'none' }}
                _active={{ color: 'white' }}
                fontWeight={500}
              ><BiDirections /> <Box textAlign='start' ml='10px'>Direcciones</Box>
              </Tab>
              <Tab
                justifyContent='flex-start'
                w={['45%', '45%', '100%']}
                _focus={{ borderColor: 'none' }}
                _active={{ color: 'white' }}
                fontWeight={500}
              ><BiShoppingBag /> <Box textAlign='start' ml='10px'>Mis compras</Box>
              </Tab>
              <Tab
                justifyContent='flex-start'
                w={['45%', '45%', '100%']}
                _focus={{ borderColor: 'none' }}
                _active={{ color: 'white' }}
                fontWeight={500}
              ><BiHeart /> <Box textAlign='start' ml='10px'>Lista de deseos</Box>
              </Tab>
              <Tab
                justifyContent='flex-start'
                w={['45%', '45%', '100%']}
                _focus={{ borderColor: 'none' }}
                _active={{ color: 'white' }}
                fontWeight={500}
              ><BiStar /> <Box textAlign='start' ml='10px'>Reseñas</Box>
              </Tab>
            </Flex>

            <TabPanels position='relative' bg='white' borderLeft='2px' borderStyle='inherit' ml='1rem' borderColor='secondary' overflow='auto'>
              <TabPanel>
                <Heading mb={5} size={['md', 'md', 'xl']}>Datos personales</Heading>
                <DatosPersonales />
              </TabPanel>
              {/* <TabPanel>
              <Heading mb={5}>Historial</Heading>
            </TabPanel> */}
              <TabPanel>
                <Heading mb={5} size={['md', 'md', 'xl']}>Direcciones</Heading>
                {/* <Box mb={5}>Elige donde recibir tus compras.</Box> */}
                {!Click.address
                  ? <>
                    <AddressContainer />
                    <Button borderRadius='none' mr='1rem' _hover={{ bg: 'none' }} name='AddAddress' border='2px' borderColor='accent' color='accent' bg='white' onClick={handleClickAddress}>Agregar una dirección</Button>
                    {/* eslint-disable-next-line */}
                </>
                  : <>
                    <AddressCreator handleClickAddress={handleClickAddress} />
                    {/* eslint-disable-next-line */}
              </>}

              </TabPanel>

              <TabPanel>
                <Heading mb={5} size={['md', 'md', 'xl']}>Mis compras</Heading>
                <MyShopping />
              </TabPanel>
              <TabPanel>
                <Heading mb={5} size={['md', 'md', 'xl']}>Lista de deseos</Heading>
                <WishList />
              </TabPanel>
              <TabPanel>
                <Heading mb={5} size={['md', 'md', 'xl']}>Reseñas</Heading>
                <ReviewsContainer />
              </TabPanel>
            </TabPanels>
          </Flex>

        </Tabs>
      </Flex>
    </Flex>

  )
}
