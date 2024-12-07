// src/components/ContactSupport.js

import React from 'react';
import { Box, Heading, Text, Link } from '@chakra-ui/react';

const ContactSupport = () => {
  return (
    <Box p={5} borderWidth={1} borderRadius="md" shadow="md" bg="white">
      <Heading size="md" mb={4}>Hubungi Petugas</Heading>
      <Text mb={4}>Jika Anda membutuhkan bantuan lebih lanjut atau ingin melaporkan masalah, silakan hubungi kami melalui:</Text>
      <Text mb={2}>Email: <Link href="mailto:support@example.com" color="blue.500">support@example.com</Link></Text>
      <Text>Telepon: <Link href="tel:+1234567890" color="blue.500">+1 234 567 890</Link></Text>
    </Box>
  );
};

export default ContactSupport;
