import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import Map from '../components/Map';
import Navbar from '../components/Navbar';
// import { supabase } from '../services/supabase';

const MapPage = () => {
  return (
    <>
      <Navbar />
      <Box maxW="container.xl" mx="auto" py={8}>
        <Heading mb={8} textAlign="center">Peta Kerusakan Jalan</Heading>

        {/* Perbesar ukuran peta */}
        <Box height="200px" mb={4}>
          <Map />
        </Box>

        {/* Tambahkan keterangan di bawah peta */}
        <Text fontSize="lg" textAlign="center">
          Peta di atas menunjukkan lokasi kerusakan jalan berdasarkan data yang telah dikumpulkan.
          Setiap penanda (marker) mewakili jenis kerusakan jalan tertentu, seperti jalan berlubang atau retakan.
        </Text>
      </Box>
    </>
  );
};

export default MapPage;
