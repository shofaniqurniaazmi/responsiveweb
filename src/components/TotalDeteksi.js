import React, { useEffect, useState } from 'react';
import { Box, Heading, List, ListItem, Text, useBreakpointValue } from '@chakra-ui/react';
import { supabase } from '../services/supabase';

function TotalDeteksi() {
    const [totalArea, setTotalArea] = useState(0);
    const [totalAreaLubang, setTotalAreaLubang] = useState([]);
    const [totalAreaRetak, setTotalAreaRetak] = useState([]);
    const [totalAreaGelombang, setTotalAreaGelombang] = useState([]);
    const [totalAreaAmblas, setTotalAreaAmblas] = useState([]);

    useEffect(() => {
      const fetchAreaLubang = async () => {
        const { data, error } = await supabase
        .from('history_deteksi')
        .select('area_kerusakan')
        .eq('jenis_kerusakan', 'Lubang');
      if (error) {
        console.error('Error Fetching data: ', error);
      } else {

        const sum = data.reduce((acc, cur) => acc + cur.area_kerusakan, 0);
        setTotalAreaLubang(sum);
      }
      };
      fetchAreaLubang();
    }, []);

    useEffect(() => {
      const fetchAreaRetak = async () => {
        const { data, error } = await supabase
        .from('history_deteksi')
        .select('area_kerusakan')
        .eq('jenis_kerusakan', 'Retak Buaya');
      if (error) {
        console.error('Error Fetching data: ', error);
      } else {

        const sum = data.reduce((acc, cur) => acc + cur.area_kerusakan, 0);
        const sumTotal = sum.toFixed(2);
        setTotalAreaRetak(sumTotal);
      }
      };
      fetchAreaRetak();
    }, []);

    useEffect(() => {
      const fetchAreaAmblas = async () => {
        const { data, error } = await supabase
        .from('history_deteksi')
        .select('area_kerusakan')
        .eq('jenis_kerusakan', 'Amblas');
      if (error) {
        console.error('Error Fetching data: ', error);
      } else {

        const sum = data.reduce((acc, cur) => acc + cur.area_kerusakan, 0);
        const sumTotal = sum.toFixed(2);
        setTotalAreaAmblas(sumTotal);
      }
      };
      fetchAreaAmblas();
    }, []);

    useEffect(() => {
      const fetchAreaGelombang = async () => {
        const { data, error } = await supabase
        .from('history_deteksi')
        .select('area_kerusakan')
        .eq('jenis_kerusakan', 'Gelombang');
      if (error) {
        console.error('Error Fetching data: ', error);
      } else {

        const sum = data.reduce((acc, cur) => acc + cur.area_kerusakan, 0);
        const sumTotal = sum.toFixed(2);
        setTotalAreaGelombang(sumTotal);
      }
      };
      fetchAreaGelombang();
    }, []);

    useEffect(() => {
      const fetchtotalArea = async () => {
        const { data, error } = await supabase
          .from('history_deteksi')
          .select('area_kerusakan');

          if (error) {
            console.error('Error fetching data:', error);
          } else {
            const total = data.reduce((sum, row) => sum + row.area_kerusakan, 0);
            const roundTotal = total.toFixed(2);
            setTotalArea(roundTotal);
          }
      }
      fetchtotalArea();
    }, []);

    const boxPadding = useBreakpointValue({ base: 2, md: 4 });
    const fontSize = useBreakpointValue({ base: 'sm', md: 'md' });
    
    return (
        <Box p={4} borderRadius="md" shadow="md">
            <Heading size="md" mb={4}>Total Area Kerusakan</Heading>
            <List spacing={3}>
              <ListItem>

              <Box
                  p={boxPadding}
                  borderRadius="md"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  bg="teal.100" 
                  w="full"
                  marginBottom={3}
                >
                  <Text fontWeight="bold" fontSize={fontSize}>
                    Lubang:
                  </Text>
                  <Text fontSize={fontSize}>{totalAreaLubang} m2</Text>
                </Box>

              <Box
                  p={boxPadding}
                  borderRadius="md"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  bg="teal.100" 
                  w="full"
                  marginBottom={3}
                >
                  <Text fontWeight="bold" fontSize={fontSize}>
                    Retak Buaya:
                  </Text>
                  <Text fontSize={fontSize}>{totalAreaRetak} m2</Text>
                </Box>

              <Box
                  p={boxPadding}
                  borderRadius="md"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  bg="teal.100" 
                  w="full"
                  marginBottom={3}
                >
                  <Text fontWeight="bold" fontSize={fontSize}>
                    Amblas:
                  </Text>
                  <Text fontSize={fontSize}>{totalAreaAmblas} m2</Text>
                </Box>

              <Box
                  p={boxPadding}
                  borderRadius="md"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  bg="teal.100" 
                  w="full"
                  marginBottom={3}
                >
                  <Text fontWeight="bold" fontSize={fontSize}>
                    Gelombang:
                  </Text>
                  <Text fontSize={fontSize}>{totalAreaGelombang} m2</Text>
                </Box>

                <Box
                  p={boxPadding}
                  borderRadius="md"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  bg="teal.100" 
                  w="full"
                  marginBottom={3}
                >
                  <Text fontWeight="bold" fontSize={fontSize}>
                    Total Area Kerusakan:
                  </Text>
                  <Text fontSize={fontSize}>{totalArea} m3</Text>
                </Box>
                
              </ListItem>
            </List>
        </Box>

    );
  }
  
  export default TotalDeteksi;