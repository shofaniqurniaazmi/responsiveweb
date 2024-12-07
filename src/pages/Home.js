import React, { useEffect, useState } from 'react';
import { Box, Heading, SimpleGrid, useBreakpointValue, Button, Flex } from '@chakra-ui/react';
import { CSVLink } from 'react-csv';
import Statistics from '../components/Statistics';
import Grafik from '../components/Grafik';
import GrafikPie from '../components/GrafikPie';
import RiwayatDeteksi from '../components/RiwayatDeteksi';
import TotalDeteksi from '../components/TotalDeteksi';
import Navbar from '../components/Navbar';

const Home = () => {
  const [detectionData, setDetectionData] = useState([]); 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/deteksi'); 
        const data = await response.json();
        setDetectionData(data); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 

  const flattenData = detectionData.map(item => ({
    ...item, 
  }));

  
  const cardHeight = useBreakpointValue({ base: '300px', md: '500px' });
  const gridColumns = useBreakpointValue({ base: 1, md: 2 }); 

  return (
    <>
      <Navbar />
      <Box maxW="container.xl" mx="auto" py={8} px={4}>
      <Heading mb={8} textAlign="center" fontSize={{ base: 'xl', md: '2xl' }}>
        Dashboard Monitoring
      </Heading>
      <SimpleGrid columns={gridColumns} spacing={8}>
        <Box
          p={5}
          borderWidth={1}
          borderRadius="md"
          shadow="md"
          bg="white"
          height={cardHeight}
          display="flex"
          flexDirection="column"
        >
          <Statistics /> {/* Menampilkan statistik */}
        </Box>
        <Box
          p={5}
          borderWidth={1}
          borderRadius="md"
          shadow="md"
          bg="white"
          height={cardHeight}
          display="flex"
          flexDirection="column"
        >
        <Grafik /> {/* Menampilkan grafik */}
        </Box>
      </SimpleGrid>

      {/* Menampilkan Grafik Pie di sebelah kiri dan Total Area Kerusakan di sebelah kanan */}
      <Flex direction={{ base: 'column', md: 'row' }} spacing={8} mt={8}>
        {/* Grafik Pie */}
        <Box
          p={5}
          borderWidth={1}
          borderRadius="md"
          shadow="md"
          bg="white"
          height={cardHeight}
          display="flex"
          flexDirection="column"
          flex="1"
        >
          <GrafikPie /> {/* Menampilkan Grafik Pie */}
        </Box>

        {/* Total Area Kerusakan dengan jarak */}
        <Box
          p={5}
          borderWidth={1}
          borderRadius="md"
          shadow="md"
          bg="white"
          height={cardHeight}
          display="flex"
          flexDirection="column"
          flex="1"
          mt={{ base: 8, md: 0 }} // Memberikan jarak antara box di mobile
          ml={{ md: 8 }} // Memberikan margin kiri pada layar besar untuk memberi jarak
        >
          <TotalDeteksi /> {/* Menampilkan Total Area Kerusakan */}
        </Box>
      </Flex>


      {/* Display Export CSV button */}
      <Box mt={8}>
        <RiwayatDeteksi /> {/* Menampilkan Riwayat Deteksi */}

          {/* Ekspor CSV */}
          {detectionData.length > 0 && (
            <Flex justify="flex-end" mt={4}>
              <CSVLink data={flattenData} filename="riwayat_deteksi.csv">
                <Button colorScheme="teal">Ekspor CSV</Button>
              </CSVLink>
            </Flex>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Home;
