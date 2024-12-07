// src/pages/FeedbackAndSupport.js

import React from 'react';
import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import FeedbackForm from '../components/FeedbackForm';
import ContactSupport from '../components/ContactSupport';
import Navbar from '../components/Navbar';

const FeedbackAndSupport = () => {
  return (
    <>
      <Navbar />
      <Box maxW="container.xl" mx="auto" py={8} px={4}>
        <Heading mb={8} textAlign="center" fontSize="2xl">
          Feedback dan Dukungan
        </Heading>
        <SimpleGrid columns={[1, null, 2]} spacing={8}>
          <FeedbackForm /> {/* Komponen formulir feedback */}
          <ContactSupport /> {/* Komponen informasi kontak */}
        </SimpleGrid>
      </Box>
    </>
  );
};

export default FeedbackAndSupport;
