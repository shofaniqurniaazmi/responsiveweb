// src/components/Grafik.js

import React, { useEffect, useState } from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import { Pie } from 'react-chartjs-2';
import { supabase } from '../services/supabase';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Registrasi komponen Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const Grafik = () => {
  const [categoryCounts, setCategoryCounts] = useState({});
  const [categoryVolumes, setCategoryVolumes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('history_deteksi')
        .select('jenis_kerusakan, volume');

      if (error) {
        setError(error.message);
      } else {
        // Hitung jumlah kejadian per kategori
        const counts = data.reduce((acc, curr) => {
          const category = curr.jenis_kerusakan;
          if (category) {
            acc[category] = (acc[category] || 0) + 1;
          }
          return acc;
        }, {});

        // Hitung total volume per kategori
        const volumes = data.reduce((acc, curr) => {
          const category = curr.jenis_kerusakan;
          if (category && curr.volume != null) {
            acc[category] = (acc[category] || 0) + (curr.volume || 0);
          }
          return acc;
        }, {});

        setCategoryCounts(counts);
        setCategoryVolumes(volumes);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text color="red.500">Error: {error}</Text>;
  }

  // Data untuk Pie Chart
  const pieChartData = {
    labels: Object.keys(categoryCounts),
    datasets: [
      {
        label: 'Jumlah Kejadian',
        data: Object.values(categoryCounts),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
      },
      {
        label: 'Total Volume',
        data: Object.keys(categoryCounts).map(category => categoryVolumes[category] || 0),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ], // Warna untuk Total Volume
      },
    ],
  };

  // Opsi untuk Pie Chart
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        callbacks: {
          label: context => {
            const label = context.label;
            const value = context.raw;
            if (context.datasetIndex === 0) {
              return `${label}: ${value} kejadian`; // Jumlah kejadian
            } else {
              return `${label}: ${value.toFixed(2)} m³`; // Volume per kategori
            }
          },
        },
      },
    },
  };

  return (
    <Box>
      <Heading size="md" mb={4}>Grafik Pie Kerusakan Berdasarkan Kategori</Heading>
      <Box
        width={['100%', '400px']} 
        height="400px" 
        mx="auto" 
        bg="white.50" 
        p={4} 
      >
        <Pie data={pieChartData} options={options} />
      </Box>
    </Box>
  );
};

export default Grafik;
