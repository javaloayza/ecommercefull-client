import React from 'react'
import { Box, IconButton, useBreakpointValue } from '@chakra-ui/react'
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi'
// And react-slick as our Carousel Lib
import Slider from 'react-slick'
import './carousel.css'

// Settings for the slider
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
  // eslint-disable-next-line no-undef
  appendDots: (dots) => (
    <Box
      // className='slick-dots'
      bottom='-2px !important'
      style={{
        borderRadius: '10px',
        padding: '10px'
      }}
    >
      <ul style={{ margin: '0px' }}>
        {dots}
      </ul>
    </Box>
  )
}

export default function Carousel () {
  // As we have used custom buttons, we need a reference variable to
  // change the state
  // eslint-disable-next-line no-self-compare
  const [slider, setSlider] = React.useState(Slider | null)

  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: '50%', md: '50%' })
  const side = useBreakpointValue({ base: '10px', md: '10px' })

  // These are the images used in the slide
  const cards = [
    'https://res.cloudinary.com/dek59rwek/image/upload/v1673279985/banner1_r7wqqq.webp',
    'https://res.cloudinary.com/dek59rwek/image/upload/v1673280016/banner2_agcmne.webp',
    'https://res.cloudinary.com/dek59rwek/image/upload/v1673280031/banner3_dtxmko.webp'
  ]

  return (
    <Box
      position='relative'
      height={['10rem', '12rem', '16rem', '22rem']}
      width='full'
      overflow='hidden'
    >
      {/* CSS files for react-slick */}
      <link
        rel='stylesheet'
        type='text/css'
        charSet='UTF-8'
        href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css'
      />
      <link
        rel='stylesheet'
        type='text/css'
        href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css'
      />
      {/* Left Icon */}
      <IconButton
        background='#333333'
        opacity='80%'
        aria-label='left-arrow'
        colorScheme='messenger'
        borderRadius='full'
        position='absolute'
        left={side}
        top={top}
        transform='translate(0%, -50%)'
        zIndex={2}
        onClick={() => slider?.slickPrev()}
        _hover={{ background: '#0078FF' }}
      >
        <Box> <BiLeftArrowAlt fontSize='1.5rem' /> </Box>
      </IconButton>
      {/* Right Icon */}
      <IconButton
        background='#333333'
        opacity='80%'
        aria-label='right-arrow'
        colorScheme='messenger'
        borderRadius='full'
        position='absolute'
        right={side}
        top={top}
        transform='translate(0%, -50%)'
        zIndex={2}
        onClick={() => slider?.slickNext()}
        _hover={{ background: '#0078FF' }}
      >
        <BiRightArrowAlt fontSize='1.5rem' />
      </IconButton>
      {/* Slider */}
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {cards.map((url, index) => (
          <Box
            key={index}
            height={['10rem', '12rem', '16rem', '22rem']}
            position='relative'
            backgroundPosition='center'
            backgroundRepeat='no-repeat'
            backgroundSize='cover'
            backgroundImage={`url(${url})`}
            objectFit='cover'
          />
        ))}
      </Slider>
    </Box>
  )
}
