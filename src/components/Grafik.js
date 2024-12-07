// src/components/Grafik.js

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

const Grafik = () => {
  const [categoryCounts, setCategoryCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data dari Supabase
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('history_deteksi') // Nama tabel
        .select('jenis_kerusakan'); // Kolom yang dibutuhkan

      if (error) {
        setError(error.message);
      } else {
        const counts = data.reduce((acc, curr) => {
          const category = curr.jenis_kerusakan;
          if (category) {
            acc[category] = (acc[category] || 0) + 1;
          }
          return acc;
        }, {});
        setCategoryCounts(counts);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  // Jika data sedang di-load
  if (loading) {
    return <Text>Loading...</Text>;
  }

  // Jika terjadi error
  if (error) {
    return <Text color="red.500">Error: {error}</Text>;
  }

  // Data untuk grafik
  const chartData = {
    labels: Object.keys(categoryCounts), // Label berdasarkan kategori
    datasets: [
      {
        label: 'Jumlah Kerusakan Berdasarkan Kategori',
        data: Object.values(categoryCounts), // Data jumlah tiap kategori
        backgroundColor: 'rgba(75, 192, 192, 0.6)', // Warna bar
        borderColor: 'rgba(75, 192, 192, 1)', // Warna border
        borderWidth: 1,
      },
    ],
  };

  // Opsi konfigurasi grafik
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top', // Posisi legenda
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw} kejadian`,
        },
      },
    },
    scales: {
      x: { beginAtZero: true }, // Mulai dari 0 di sumbu X
      y: { beginAtZero: true }, // Mulai dari 0 di sumbu Y
    },
  };

  return (
    <Box>
      <Heading size="md" mb={4}>
        Grafik Kerusakan Berdasarkan Kategori
      </Heading>
      <Box width="100%" height="100%">
        <Bar data={chartData} options={options} />
      </Box>
    </Box>
  );
};

export default Grafik;
