import { Flex, Text, Image } from '@chakra-ui/react'
import { HiPlusSm, HiMinus } from 'react-icons/hi'
import { useSelector, useDispatch } from 'react-redux'
import { updateCart, setRemoteCartProducts } from '../../redux/actions/cart.actions'
import { addToWishlist } from '../../redux/actions/wishlist.actions'
import BuyNowButton from '../BuyNowButton'

export default function CartItem ({ product }) {
  const { name, image, price, quantity } = product
  const cartList = useSelector(state => state.cart.localItems)
  const remoteCartList = useSelector(state => state.cart.items)
  const user = useSelector(state => state.users.user)
  const dispatch = useDispatch()

  function handleClick (operation) {
    let updatedCartList = user && user.id ? remoteCartList.slice() : cartList.slice()
    if (operation === 'wishlist') {
      dispatch(addToWishlist(product.id))
      return null
    }
    if (operation === 'buynow') {
      <BuyNowButton product={product} />
      console.log(product)
      return null
    }
    if (operation === 'increase') {
      updatedCartList = updatedCartList.map(item => {
        item.id === product.id && item.quantity++
        return item
      })
    }
    if (operation === 'decrease' && quantity > 1) {
      updatedCartList = updatedCartList.map(item => {
        item.id === product.id && item.quantity--
        return item
      })
    }
    if (operation === 'remove') {
      updatedCartList = updatedCartList.filter(item => item.id !== product.id)
    }

    if (user && user.id) {
      updatedCartList = updatedCartList.map(item => {
        item.productId = item.id
        return item
      })
      dispatch(setRemoteCartProducts(updatedCartList))
    } else {
      dispatch(updateCart(updatedCartList))
    }
  }

  return (
    <Flex _hover={{ boxShadow: 'xl', transform: 'scale(1.010)', transition: 'ease 0.25s' }} transition='ease 0.25s' mt={['0', '0', '1rem']} mb='1rem' w={['22rem', '22rem', '25rem', '61.3rem']} flexDirection='column' boxShadow='md'>
      <Flex mr='1.6rem' ml='1.6rem' h={['20rem', '20rem', '20rem', '8rem']} justifyContent={['space-around', 'space-around', 'space-around', 'center']} mt='1.6rem' flexDirection={['column', 'column', 'column', 'row']}>
        <Flex borderRadius='5px' mr='2.3rem' alignItems='center' w='7.6rem' h='7.6rem'>
          <Image w='7.2rem' h='7.2rem' objectFit='contain' src={image[0]} alt={name} />
        </Flex>
        <Text mr='6.5rem' w={['17rem', '17rem', '21.8rem']} textOverflow='ellipsis' overflow='hidden'>{name}</Text>
        <Flex justifyContent='center' w='7.5rem' h='2.7rem' mr='5.4rem' border='1px' borderColor='secondary' borderRadius='5px'>
          <Flex color='accent' justifyContent='space-around' alignItems='center' w='6.5rem' fontSize={['16px', '16px', '20px']}>
            <button onClick={() => handleClick('decrease')}><HiMinus /></button>
            <Text color='primary'>{product.quantity}</Text>
            <button onClick={() => handleClick('increase')}><HiPlusSm /></button>
          </Flex>
        </Flex>
        <Text textAlign='center' w='6.2rem' fontSize={['1.2rem', '1.2rem', '1.5rem']}>${quantity * price.split('.').join('')}</Text>
      </Flex>
      <Flex width={['17rem', '17rem', '20rem']} ml={['1.3rem', '1.3rem', '2.3rem']} mt='2rem' justifyContent='space-between' mb='1.6rem' color='accent'>
        <Text cursor='pointer' onClick={() => handleClick('remove')}>Eliminar</Text>
        {user && user.id && <Text cursor='pointer' onClick={() => handleClick('wishlist')}>Guardar en lista de deseos</Text>}

      </Flex>

    </Flex>
  )
}
