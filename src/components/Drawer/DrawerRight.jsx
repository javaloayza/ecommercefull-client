import { Avatar, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, Heading, ListItem, Menu, Text, UnorderedList, useDisclosure, useToast } from '@chakra-ui/react'
import { signOut } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
/* import { AiFillCaretDown } from 'react-icons/ai' */
import { GiHamburgerMenu } from 'react-icons/gi'
/* import { MdOutlineFavoriteBorder } from 'react-icons/md'
 */import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../config/firebase-config'
import s from './index.module.css'
import { getRemoteCart, mergeLocalCart, updateCart } from '../../redux/actions/cart.actions'
import { getUserOrders } from '../../redux/actions/orders.actions'
import { setUsersPanelTab } from '../../redux/actions/system.actions'
import { logOut } from '../../redux/actions/users.actions'
import { getUserWishList } from '../../redux/actions/wishlist.actions'
import ModalLogin from '../ModalLogin'
import { BsCart } from 'react-icons/bs'

const DrawerRight = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  const navigate = useNavigate()
  const token = useSelector(state => state.users.token)
  const user = useSelector(state => state.users.user)
  const toastToDisplay = useSelector(state => state.system.toast)
  const localCart = useSelector(state => state.cart.localItems).slice()
  const cartCounter = useSelector(state => {
    if (state.users.token === '') return state.cart.localItems?.length
    return state.cart.items?.length
  })
  const [modal, setModal] = useState(false)
  const [isRegistrando, setIsRegistrando] = useState(false)
  const dispatch = useDispatch()
  const toast = useToast()
  /* const { pathname } = useLocation() */

  useEffect(() => {
    token && dispatch(getUserWishList())
    token && dispatch(getUserOrders())
    token && mergeCarts()
  }, [token])//eslint-disable-line

  function mergeCarts () {
    if (user && user.id && Array.isArray(localCart) && localCart.length) {
      dispatch(mergeLocalCart(localCart))
      dispatch(updateCart([]))
    } else {
      dispatch(getRemoteCart())
    }
  }

  useEffect(() => {
    toastToDisplay.title && toast(toastToDisplay)
  }, [toastToDisplay])//eslint-disable-line

  const handleSubmit = (e) => {
    e.target.name === 'ingresar' && setModal(true)
    e.target.name === 'salir' && handleLogOut()
    onClose()
  }

  async function handleLogOut () {
    if (token) {
      await signOut(auth)
        .then(() => {
          dispatch(logOut())
          window.localStorage.clear()
          toast({
            description: 'Sesion cerrada',
            status: 'warning',
            duration: 5000,
            isClosable: false
          })
          navigate('/')
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      alert('sin sesion iniciada')
    }
  }

  function handleClick (tab) {
    dispatch(setUsersPanelTab(tab))
    navigate('/perfil')
    onClose()
  }

  return (
    <>
      <Button ref={btnRef} pr='1px' pl='1px' colorScheme='black' onClick={onOpen}>
        <GiHamburgerMenu fontSize='1.7rem' color='white' />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Bienvenido</DrawerHeader>

          <DrawerBody>

            <UnorderedList display={['flex', 'flex', 'flex']} alignItems='flex-start' gap='1rem'>
              {token
                ? <>
                  <div className={s.navLink} onClick={() => handleClick(3)}>{/* <MdOutlineFavoriteBorder /> */}</div>
                  <Menu>
                    <Flex bg='#fff' alignItems='flex-start' direction='column'>
                      <Avatar size='sm' mr={2} name={user.email && user.email.split('@')[0]} src='' />
                      <Button _hover={{ bg: '#fff' }} _active={{ bg: '#fff' }} _focus={{ boxShadow: 'none' }} p={0} fontSize='1rem' fontWeight={700} bg='#fff' as={Button}>{user.firstname ? 'Hola, ' + user.firstname : user.email ? 'Hola, ' + user.email.split('@')[0] : 'Hola, User'}
                      </Button>
                      <Link to='/perfil/' onClick={() => handleClick(0)}><Text _active={{ bg: '#fff' }} _focus={{ boxShadow: 'none' }} fontSize='1rem' name='perfil' justify='flex-start'>Mi cuenta</Text></Link>
                      <Link to='/perfil/' onClick={() => handleClick(2)}><Text _active={{ bg: '#fff' }} _focus={{ boxShadow: 'none' }} fontSize='1rem' bg='#fff' name='mis-compras'>Mis compras</Text></Link>
                      <Link to='/perfil/' fontSize='1rem' onClick={() => handleClick(3)}><Text _active={{ bg: '#fff' }} _focus={{ boxShadow: 'none' }} fontSize='1rem' bg='#fff' name='lista-de-deseos'>Favoritos</Text></Link>
                      <Link _focus={{ boxShadow: 'none' }} _active={{ bg: '#fff' }} fontSize='1rem' bg='#fff' onClick={handleSubmit} name='salir'><Text _active={{ bg: '#fff' }} _focus={{ boxShadow: 'none' }} fontSize='1rem' bg='#fff'>Salir</Text></Link>
                    </Flex>
                  </Menu>
                </>//eslint-disable-line
                : <ListItem listStyleType='none' fontSize='1.25rem' mr='2.5rem'><Link to='#' onClick={handleSubmit} name='ingresar'>Ingresar</Link></ListItem>}
              <Link to='/cart' onClick={onClose} className={s.cartDrawer}>{cartCounter > 0 ? <span>{cartCounter}</span> : undefined}<BsCart fontSize='1.5rem' color='black' /> </Link>
            </UnorderedList>
            {/* <Input placeholder='Type here...' /> */}
          </DrawerBody>

          <DrawerFooter>
            {/* <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Save</Button> */}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <ModalLogin isRegistrando={isRegistrando} setIsRegistrando={setIsRegistrando} state={modal} setState={setModal}>
        <Heading color='black' textAlign='center'>{isRegistrando ? 'Registrate' : 'Inicia Sesion'}</Heading>
        <Text color='black' mt={2} textAlign='center'>Ingresa a tu cuenta para ver tus compras, favoritos, etc.</Text>
      </ModalLogin>
    </>
  )
}
export default DrawerRight
