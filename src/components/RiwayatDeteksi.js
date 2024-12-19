import React, { useEffect, useState } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Heading, Text, Button, Flex } from '@chakra-ui/react';
import { supabase } from '../services/supabase';
import Papa from 'papaparse';

export const exportToCSV = (data, filename) => {
  const csvString = Papa.unparse(data);
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const RiwayatDeteksi = () => {
  const [riwayatData, setRiwayatData] = useState([]);
  const [allData, setAllData] = useState([]); // Store all data for CSV export
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // Track the current page for load more
  const [limit] = useState(20); // Limit of data per page for table display

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('history_deteksi')
        .select('id, jenis_kerusakan, longitude, latitude, area_kerusakan, kedalaman_rata_rata, volume, waktu_deteksi')
        .order("waktu_deteksi", { ascending: false })
        .range(0, limit - 1); // Only fetch 20 records for the table

      if (error) {
        setError(error.message);
      } else {
        setRiwayatData(data);
      }

      // Fetch all data for CSV export
      const { data: allData, error: allDataError } = await supabase
        .from('history_deteksi')
        .select('id, jenis_kerusakan, longitude, latitude, area_kerusakan, kedalaman_rata_rata, volume, waktu_deteksi');

      if (allDataError) {
        setError(allDataError.message);
      } else {
        setAllData(allData);
      }

      setLoading(false);
    };

    fetchData();
  }, [limit]);

  const handleExportToCSV = () => {
    const csvData = allData.map((item, index) => ({
      No: index + 1,
      "Jenis Kerusakan": item.jenis_kerusakan,
      Longitude: item.longitude || "Data tidak tersedia",
      Latitude: item.latitude || "Data tidak tersedia",
      "Area Kerusakan (m²)": item.area_kerusakan,
      "Kedalaman Rata-rata": item.kedalaman_rata_rata,
      "Volume (m³)": item.volume,
      "Waktu Deteksi": item.waktu_deteksi,
    }));
    exportToCSV(csvData, 'riwayat_deteksi.csv');
  };

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    setPage(nextPage);

    const { data, error } = await supabase
      .from('history_deteksi')
      .select('id, jenis_kerusakan, longitude, latitude, area_kerusakan, kedalaman_rata_rata, volume, waktu_deteksi')
      .order("waktu_deteksi", { ascending: false })
      .range(limit * nextPage - limit, limit * nextPage - 1); // Fetch the next set of data

    if (error) {
      setError(error.message);
    } else {
      setRiwayatData(prevData => [...prevData, ...data]);
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text color="red.500">Error: {error}</Text>;
  }

  return (
    <Box p={5} borderWidth={1} borderRadius="md" shadow="md" bg="white">
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="lg">Riwayat Proses Deteksi</Heading>
        <Button
          colorScheme="teal"
          bg="teal.400"
          color="white"
          _hover={{ bg: 'teal.500' }}
          onClick={handleExportToCSV}
        >
          Ekspor CSV
        </Button>
      </Flex>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>No</Th>
            <Th>Jenis Kerusakan</Th>
            <Th>Longitude</Th>
            <Th>Latitude</Th>
            <Th>Area Kerusakan</Th>
            <Th>Kedalaman Rata-rata</Th>
            <Th>Volume</Th>
            <Th>Waktu Deteksi</Th>
          </Tr>
        </Thead>
        <Tbody>
          {riwayatData.map((item, index) => (
            <Tr key={item.id}>
              <Td>{index + 1}</Td>
              <Td>{item.jenis_kerusakan}</Td>
              <Td>{item.longitude || "Data tidak tersedia"}</Td>
              <Td>{item.latitude || "Data tidak tersedia"}</Td>
              <Td>{item.area_kerusakan} m²</Td>
              <Td>{item.kedalaman_rata_rata}</Td>
              <Td>{item.volume} m³</Td>
              <Td>{item.waktu_deteksi}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Flex justify="center" mt={4}>
        <Button
          colorScheme="teal"
          onClick={handleLoadMore}
        >
          Load More
        </Button>
      </Flex>
    </Box>
  );
};

export default RiwayatDeteksi;
