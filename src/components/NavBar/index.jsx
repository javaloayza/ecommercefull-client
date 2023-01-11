import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// import firebase from 'firebase/compat/app'
import { auth } from '../../config/firebase-config.js'
import { signOut } from 'firebase/auth'
import {
  Box, UnorderedList, ListItem, Icon, Heading, Text, Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Avatar,
  Flex,
  useToast
} from '@chakra-ui/react'
import { BsCart, BsShopWindow } from 'react-icons/bs'
import { AiFillCaretDown } from 'react-icons/ai'
import { GiHamburgerMenu } from 'react-icons/gi'
import { MdOutlineFavoriteBorder } from 'react-icons/md'
import s from './index.module.css'
import { setUsersPanelTab } from '../../redux/actions/system.actions'
import { logOut } from '../../redux/actions/users.actions'
import { getUserWishList } from '../../redux/actions/wishlist.actions'
import ModalLogin from '../../components/ModalLogin'
import SearchBar from '../SearchBar'
import { getRemoteCart, mergeLocalCart, updateCart } from '../../redux/actions/cart.actions'
import { getUserOrders } from '../../redux/actions/orders.actions'
import DrawerRight from '../Drawer/DrawerRight.jsx'
import DrawerCategory from '../Drawer/DrawerCategory.jsx'
import { BiCategoryAlt } from 'react-icons/bi'
import { clearProductFilter } from '../../redux/actions/products.actions.js'

const NavBar = () => {
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
  const { pathname } = useLocation()

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

  /**
   * A function that handles the logout of the user.
   */
  /* function handleLogOut () {
    if (token) {
      firebase.auth().signOut()
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
  } */

  function handleClick (tab) {
    dispatch(setUsersPanelTab(tab))
    navigate('/perfil')
  }

  return (
    <Box>
      <Box position='relative' height='5rem' bg='#333333' display='flex' justifyContent='space-between' color='white' alignItems='center' pl={['2rem', '2rem', '3rem']} pr={['2rem', '2rem', '5rem']}>
        <Link to='/' onClick={() => dispatch(clearProductFilter())} className={s.logo}>
          <Icon width='1.7rem' height='1.7rem' name='logo' as={BsShopWindow} />
          <Flex display={['none', 'none', 'flex']}><span>Line</span> </Flex>
          <DrawerCategory>  <BiCategoryAlt fontSize='1.7rem' color='black' /> </DrawerCategory>
        </Link>
        <>
          {user.isAdmin &&
            <Box display={['none', 'none', 'flex']} fontSize='1.2rem'>
              <Link to='/administration'><Box color='white' _hover={{ color: '#0078FF' }}>Admin</Box></Link>
            </Box>}
        </>

        <Box />
        <Box>
          <UnorderedList display={['none', 'none', 'none', 'flex']} alignItems='center' gap='1rem'>
            {token
              ? <>
                <div className={s.navLink} onClick={() => handleClick(3)}><MdOutlineFavoriteBorder /></div>
                <Menu>
                  <Flex bg='#333333' alignItems='center'>
                    <Avatar size='sm' mr={2} name={user.email && user.email.split('@')[0]} src='' />
                    <MenuButton _hover={{ bg: '#333333' }} _active={{ bg: '#333333' }} _focus={{ boxShadow: 'none' }} p={0} fontSize='1rem' fontWeight={700} bg='#333333' as={Button} rightIcon={<AiFillCaretDown />}>{user.firstname ? 'Hola, ' + user.firstname : user.email ? 'Hola, ' + user.email.split('@')[0] : 'Hola, User'}
                    </MenuButton>
                  </Flex>
                  <MenuList bg='#333333' mt='1rem' width='3rem'>
                    <Link to='/perfil/' onClick={() => handleClick(0)}><MenuItem _active={{ bg: '#333333' }} _focus={{ boxShadow: 'none' }} fontSize='1rem' bg='#333333' name='perfil'>Perfil</MenuItem></Link>
                    <Link to='/perfil/' onClick={() => handleClick(2)}><MenuItem _active={{ bg: '#333333' }} _focus={{ boxShadow: 'none' }} fontSize='1rem' bg='#333333' name='mis-compras'>Mis compras</MenuItem></Link>
                    <MenuItem _focus={{ boxShadow: 'none' }} _active={{ bg: '#333333' }} fontSize='1rem' bg='#333333' onClick={handleSubmit} name='salir'>Salir</MenuItem>
                  </MenuList>
                </Menu>
                  </>//eslint-disable-line
              : <ListItem listStyleType='none' fontSize='1.25rem' mr='2.5rem'><Link to='#' onClick={handleSubmit} name='ingresar'>Ingresar</Link></ListItem>}
            <ListItem display='flex' alignItems='flex-start' color='white'>
              <Link to='/cart' className={s.cartLink}>
                {cartCounter > 0 ? <span>{cartCounter}</span> : undefined}
                <BsCart fontSize='1.7rem' color='white' />
              </Link>
            </ListItem>
          </UnorderedList>
          <Flex display={['flex', 'flex', 'flex', 'none']}>
            <DrawerRight> <GiHamburgerMenu fontSize='1.7rem' color='white' /></DrawerRight>
          </Flex>
        </Box>
        <ModalLogin isRegistrando={isRegistrando} setIsRegistrando={setIsRegistrando} state={modal} setState={setModal}>
          <Heading color='black' textAlign='center'>{isRegistrando ? 'Registrate' : 'Inicia Sesion'}</Heading>
          <Text color='black' mt={2} textAlign='center'>Ingresa a tu cuenta para ver tus compras, favoritos, etc.</Text>
        </ModalLogin>
      </Box>
      <Box position='absolute' top='-2' left={['19%', '27%', '42%']}>
        {pathname === '/' && <SearchBar />}
      </Box>
    </Box>
  )
}

export default NavBar
