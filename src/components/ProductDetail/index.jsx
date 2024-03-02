import { useEffect, useState } from 'react'
import s from './index.module.css'
import { Center, Container, Flex, Text, Box, Heading } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getProductDetails } from '../../redux/actions/products.actions'
import { getUserReviews } from '../../redux/actions/reviews.action'
import ReviewCard from '../ReviewCard'
import WishListManagerButton from '../WishListManagerButton'
import CartButton from '../CartButton'
import BuyNowButton from '../BuyNowButton'
import ModalReview from '../ModalReview'
import ModalLogin from '../ModalLogin'

function ProductDetail () {
  const product = useSelector(state => state.products.productDetail)
  const userReviews = useSelector(state => state.reviews.data)
  const token = useSelector(state => state.users.token)
  const dispatch = useDispatch()
  const { id } = useParams()
  const [modal, setModal] = useState(false)
  const [modalLogin, setModalLogin] = useState(false)

  function handleClick () {
    setModal(true)
  }

  useEffect(() => {
    dispatch(getProductDetails(id))
    dispatch(getUserReviews())
  }, [])//eslint-disable-line

  const didReview = !!userReviews.find(review => review.product.id === product.id)

  return (
    <Flex flexDirection='column'>
      <Flex pl='7rem' pr='7rem' pt='1rem' pb='1rem' justifyContent='center' alignItems='center' borderColor='red'>
        <Center display='flex' justifyContent='center' alignItems='center' borderColor='blue'>
          <Flex w='80rem' alignItems='flex-start' justifyContent='center' bg='#white' color='#black' flexDirection={['column', 'column', 'column', 'row']}>
            <Container ml={['null', 'null', 'null', '11rem']} mt={['null', 'null', 'null', '3rem']} width={['null', 'null', 'null', '100%']}>
              <Flex gap='1rem' flexDirection={['column', 'column', 'row', 'row']}>
                <Flex flexDirection={['row', 'row', 'column', 'column']} gap='0.5rem' boxShadow='md'>
                  <img className={s.productImgLittle} src={product.image} alt={product.name} />
                  <img className={s.productImgLittle} src={product.image} alt={product.name} />
                  <img className={s.productImgLittle} src={product.image} alt={product.name} />
                </Flex>
                <Box boxShadow='md'>
                  <img className={s.productImg} src={product.image} alt={product.name} />
                </Box>

              </Flex>

            </Container>
            <Container minHeight='10rem' boxShadow='md' mr={['null', 'null', 'null', '10rem']} width={['18.7rem', '18.7rem', '25.8rem', '20rem']} p='1rem' gap='0.2rem' display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
              <Box alignSelf='flex-end' mb='1rem'>{token && <WishListManagerButton productId={product.id} />}</Box>
              <Text fontWeight='bold'>{product.name}</Text>
              <Text alignSelf='flex-start' fontWeight='bold'>
                {product.category && product.category.name}
              </Text>
              <Text alignSelf='flex-start' mt={3}>${product.price}</Text>
              <Text fontWeight='bold' pt={3} alignSelf='flex-start'>Marca</Text>
              <Text alignSelf='flex-start'>{product.brand && product.brand.name}</Text>
              <Text alignSelf='flex-start' fontWeight='bold' pt={3}>Modelo</Text>
              <Text alignSelf='flex-start'>{product.model}</Text>
              {product.canReview && !didReview ? <Box onClick={handleClick} ml='0.1rem' alignSelf='flex-start' width='10rem' height='2.5rem' justifyContent='center' alignItems='center' cursor='pointer' p='0.5rem' bg='#0082E3' color='white'>Agregar reseña</Box> : null}

              <Flex mt='10px' width='100%' justifyContent='flex-start'>
                <BuyNowButton state={modalLogin} setState={setModalLogin} product={product} />
                <CartButton product={product} />
              </Flex>
            </Container>
          </Flex>
        </Center>
      </Flex>
      <Flex pl={['null', 'null', 'null', '7rem']} pr={['null', 'null', 'null', '7rem']} pt={['null', 'null', 'null', '0.5rem']} pb={['null', 'null', 'null', '0.5rem']} borderColor='aqua' justifyContent={['center', 'center', 'center', 'space-between']}>
        <Flex p='1rem' borderColor='green' ml={['null', 'null', 'null', '6rem']} min-height='5rem' width='50%' flexDirection='column'>
          <Text fontWeight='bold'>Descripcion del producto</Text>
          <Text>{product.description}</Text>
        </Flex>
      </Flex>

      <Flex pl={['null', 'null', 'null', '8rem']} pr={['null', 'null', 'null', '8rem']} pt={['1rem', '1rem', '2rem', '2rem']} pb='2rem' borderColor='orange' flexDirection='column' width='100%' alignItems={['center', 'center', 'center', 'flex-start']}>
        <Flex min-height='5rem' width={['75%', '50%', '50%', '50%']} gap='1rem' ml={['0rem', '0rem', '0rem', '4rem']} flexDirection='column' justifyContent='flex-start' alignItems='flex-start'>
          {Array.isArray(product.reviews) && product.reviews.map((r, i) => (
            <ReviewCard
              key={r.productId + i}
              rating={r.rating}
              review={r.review}
              productId={r.productId}
              productName={r.name}
              productImage={r.image}
            />
          ))}
        </Flex>

      </Flex>
      <ModalReview id={product.id} state={modal} setState={setModal} />
      <ModalLogin state={modalLogin} setState={setModalLogin}>
        <Heading color='black' textAlign='center'>No has iniciado sesión</Heading>
        <Text color='black' mt={2} textAlign='center'>Para seguir con tu compra debes registrarte o iniciar sesión.</Text>
      </ModalLogin>
    </Flex>

  )
}

export default ProductDetail
