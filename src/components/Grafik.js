import React, { useEffect, useState } from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import { Bar } from 'react-chartjs-2';
import { supabase } from '../services/supabase';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registrasi komponen Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Statistics = () => {
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
        setError(error.message); // Simpan pesan error
      } else {
        const validData = data.filter(item => item.jenis_kerusakan?.trim() && item.volume != null);

        // Hitung jumlah kategori
        const counts = validData.reduce((acc, curr) => {
          const category = curr.jenis_kerusakan.trim();
          acc[category] = (acc[category] || 0) + 1;
          return acc;
        }, {});

        // Hitung total volume per kategori
        const volumes = validData.reduce((acc, curr) => {
          const category = curr.jenis_kerusakan.trim();
          acc[category] = (acc[category] || 0) + (curr.volume || 0);
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

  // Data untuk Chart.js
  const chartData = {
    labels: Object.keys(categoryCounts), // Label kategori
    datasets: [
      {
        label: 'Jumlah Kejadian',
        data: Object.values(categoryCounts),
        backgroundColor: Object.keys(categoryCounts).map(() => 'rgba(75, 192, 192, 0.6)'),
        borderColor: Object.keys(categoryCounts).map(() => 'rgba(75, 192, 192, 1)'),
        borderWidth: 1,
      },
      {
        label: 'Total Volume',
        data: Object.keys(categoryVolumes).map(category => categoryVolumes[category]),
        backgroundColor: Object.keys(categoryCounts).map(() => 'rgba(54, 162, 235, 0.6)'), // Warna untuk Total Volume
        borderColor: Object.keys(categoryCounts).map(() => 'rgba(54, 162, 235, 1)'), // Warna untuk Total Volume
        borderWidth: 1,
      },
    ],
  };

  // Opsi untuk Chart.js
  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        callbacks: {
          label: (context) => {
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
    scales: {
      x: { beginAtZero: true },
      y: { beginAtZero: true },
    },
  };

  return (
    <Box>
      <Heading size="md" mb={4}>
        Statistik Kerusakan
      </Heading>
      <Box width="100%" height="100%">
        <Bar data={chartData} options={options} />
      </Box>
    </Box>
  );
};

export default Statistics;
