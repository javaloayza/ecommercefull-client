import FilterContainer from '../../components/FilterContainer'
import ProductList from '../../components/ProductsList'
/* import firebase from 'firebase/compat/app'
import 'firebase/compat/auth' */
import { auth } from '../../config/firebase-config.js'
import { onAuthStateChanged } from 'firebase/auth'
import { logIn } from '../../redux/actions/users.actions'
import { useDispatch } from 'react-redux'
import { Box } from '@chakra-ui/react'
import { useEffect } from 'react'
import { removeBuyNowItem } from '../../redux/actions/buyNow.actions'
import Carousel from '../../components/Carousel'

function UsersHome () {
  const dispatch = useDispatch()

  // const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(removeBuyNowItem())
  // })

  useEffect(() => {
    dispatch(removeBuyNowItem())
  }, [dispatch])

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      await user.getIdToken().then(token => {
        dispatch(logIn(token))
      })
    }
  })

  /* Checking if the user is logged in. If the user is logged in, it will get the token and dispatch
  the logIn action. */
  /*  firebase.auth().onIdTokenChanged(user => {
    if (user) {
      user.getIdToken().then(token => {
        dispatch(logIn(token))
      })
    }
  }) */

  return (
    <>
      <Box> <Carousel /> </Box>
      <Box pl={['0rem', '1rem', '4.5rem']} pr={['0rem', '0rem', '4.5rem']} pt={['2rem', '2rem', '4rem']} pb={['2rem', '2rem', '4rem']} display='flex' flexDirection='column' justifyContent='center' alignSelf='center'>
        <Box display='flex' justifyContent='center' minH='65vh'>
          <Box display={['none', 'none', 'flex']}> <FilterContainer /> </Box>
          <ProductList />
        </Box>
      </Box>
    </>

  )
}

export default UsersHome
