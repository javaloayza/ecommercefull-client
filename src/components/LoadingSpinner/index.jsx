import { Box, Spinner, Text } from '@chakra-ui/react'

export default function LoadingSpinner () {
  return (
    <Box display='flex' flexDirection='column' alignItems='center'>
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      />
      <Text color='colorPalette.600'>Por favor, espere unos segundos, los datos estan cargando.</Text>
    </Box>
  )
}
