import { useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter, Button, Box } from '@chakra-ui/react'
import { BiCategoryAlt } from 'react-icons/bi'
import CategoryFilter from '../CategoryFilter'
import PriceFilter from '../PriceFilter'
import BrandFilter from '../BrandFilter'
import React from 'react'

export const DrawerCategory = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  return (
    <>
      <Button display={['flex', 'flex', 'none', 'none']} ref={btnRef} pr='1rem' pl='1px' size='1.8em' colorScheme='black' onClick={onOpen} zIndex='2'>
        <BiCategoryAlt fontSize='1.8rem' color='white' />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Filtro</DrawerHeader>

          <DrawerBody>

            <Box gap='1rem' padding='0.5rem' width='250px' mt='0rem' height='max-content'>
              <CategoryFilter />
              <PriceFilter />
              <BrandFilter />
            </Box>

          </DrawerBody>

          <DrawerFooter>
            {/* <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Save</Button> */}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default DrawerCategory
