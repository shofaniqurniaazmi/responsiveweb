import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { supabase } from '../services/supabase';
import { Box, Select, Text } from '@chakra-ui/react';

const MapComponent = () => {
  const [potholes, setPotholes] = useState([]);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPotholes();
  }, []);

  const fetchPotholes = async () => {
    try {
      const { data, error } = await supabase.from('pothole_data').select('*');
      if (error) {
        setError(error.message);
        console.error('Error fetching potholes:', error);
      } else {
        console.log("Fetched data:", data);
        setPotholes(data);
      }
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  const filteredPotholes =
    filter === 'all' ? potholes : potholes.filter(p => p.damage_type === filter);

  return (
    <Box height="500px" width="100%" p={4} borderRadius="lg" boxShadow="lg" overflow="hidden">
      {error && <Text color="red.500">Error: {error}</Text>}
      <Select
        onChange={e => setFilter(e.target.value)}
        mb={4}
        placeholder="Pilih Jenis Kerusakan"
      >
        <option value="all">Semua Jenis Kerusakan</option>
        <option value="Jalan Berlubang (42.0%)">Jalan Berlubang (42.0%)</option>
        {/* Tambahkan lebih banyak opsi jika diperlukan */}
      </Select>

      <Box flex="1" position="relative" height="100%">
        <MapContainer
          center={[-8.420508, 114.104987]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {filteredPotholes.map(pothole => {
            // Log the location data to ensure it is correctly parsed
            console.log("Pothole location data:", pothole.location);

            const [lat, lng] = pothole.location.split(',').map(coord => parseFloat(coord.trim()));

            // Log the parsed latitude and longitude
            console.log(`Parsed location: Latitude ${lat}, Longitude ${lng}`);

            if (!isNaN(lat) && !isNaN(lng)) {
              return (
                <Marker key={pothole.id} position={[lat, lng]}>
                  <Popup>
                    Jenis Kerusakan: {pothole.damage_type}
                    <br />
                    Lokasi: {pothole.location}
                  </Popup>
                </Marker>
              );
            } else {
              console.error("Invalid coordinates for pothole:", pothole);
              return null;
            }
          })}
        </MapContainer>
      </Box>
    </Box>
  );
};

export default MapComponent;
