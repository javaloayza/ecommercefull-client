import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Pagination from '../Pagination'
import ProductCard from '../ProductCard'
import { clearProductFilter, getProductsList } from '../../redux/actions/products.actions'
import styles from './index.module.css'
import { Box, Heading, Text, Tooltip } from '@chakra-ui/react'
import SortingSelector from '../SortingSelector'
import ModalLogin from '../ModalLogin'
import { MdCleaningServices } from 'react-icons/md'
import LoadingSpinner from '../LoadingSpinner'

function ProductList () {
  const products = useSelector(state => state.products.data)
  const isLoading = useSelector((state) => state.products.isLoading)
  const token = useSelector(state => state.users.token)
  const options = useSelector(state => state.products.filter)
  const dispatch = useDispatch()
  const shouldDisplay = !!token
  const [modal, setModal] = useState(false)

  useEffect(() => {
    dispatch(getProductsList(options))
  }, [dispatch, options])

  if (isLoading) {
    return <div className={styles.loadingProducts}> <LoadingSpinner /> </div>
  }

  if (products.message) {
    return <div>Error: {products.message}</div>
  }

  if (!products.length) {
    return <div>No products available.</div>
  }
  // if (products.message !== undefined) return <div>{products.message}</div>

  return (
    <Box display='flex' flexDirection='column' width='100%'>
      <Box justifyContent='center' alignItems='center' display='flex' gap='1rem' mb='1rem' mr={['0rem', '0rem', '3rem']}>
        <Box display='flex' gap='1rem' justifyContent='center' alignItems='center'>Ordenar por <SortingSelector /></Box>
        <Tooltip label='Limpiar filtro' fontSize='sm' placement='top' mt='8px' bg='#333333'>
          <Box display='flex' cursor='pointer' bg='#333333' height='2.45rem' pl='0.5rem' pr='0.5rem' pt='0.5rem' pb='0.8rem' color='white' fontSize={['22px', '22px', '24px']} borderRadius='50px' justifyContent='center' onClick={() => dispatch(clearProductFilter())} name='Clean'>
            <span><MdCleaningServices /></span>
          </Box>
        </Tooltip>
      </Box>
      <Box display='flex' flexWrap='wrap' alignSelf='flex-end' justifyContent='center'>
        {Array.isArray(products) && products.map(product => (
          <ProductCard
            state={modal}
            setState={setModal}
            key={product.id + product.name}
            product={product}
            shouldDisplay={shouldDisplay}
          />
        ))}
      </Box>
      <Pagination className={styles.pagination} />
      <ModalLogin state={modal} setState={setModal}>
        <Heading color='black' textAlign='center'>No has iniciado sesión</Heading>
        <Text color='black' mt={2} textAlign='center'>Para seguir con tu compra debes registrarte o iniciar sesión.</Text>
      </ModalLogin>
    </Box>
  )
}

export default ProductList
