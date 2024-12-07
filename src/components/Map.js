import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Box, Select, Text } from '@chakra-ui/react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { supabase } from '../services/supabase';

// Atur ikon default jika ikon marker tidak muncul
const defaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const MapComponent = () => {
  const [potholes, setPotholes] = useState([]);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('history_deteksi') // Pastikan nama tabel benar
        .select('id, jenis_kerusakan, latitude, longitude'); // Ambil kolom yang relevan

      if (error) {
        setError(error.message); // Simpan pesan error
      } else {
        setPotholes(
          data.map(item => ({
            id: item.id,
            damage_type: item.jenis_kerusakan,
            location: [item.latitude, item.longitude, parseFloat(item.longitude)],
          }))
        );
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const filteredPotholes =
    filter === 'all' ? potholes : potholes.filter(p => p.damage_type === filter);

  return (
    <Box height="80vh" width="100%" p={4} borderRadius="lg" boxShadow="lg" overflow="hidden">
      {error && <Text color="red.500">Error: {error}</Text>}
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <Select
            onChange={e => setFilter(e.target.value)}
            mb={4}
            placeholder="Pilih Kategori Kerusakan"
          >
            <option value="all">Semua Kategori Kerusakan</option>
            <option value="jalan amblas">Jalan Amblas</option>
            <option value="jalan retak">Jalan Retak</option>
            <option value="jalan gelombang">Jalan Gelombang</option>
            <option value="jalan lubang">Jalan Lubang</option>
          </Select>

          <Box flex="1" position="relative" height="100%">
            <MapContainer
              center={[-8.420508, 114.104987]}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {filteredPotholes.map(pothole => {
                if (pothole.location && pothole.location.length === 2) {
                const [lat, lng] = pothole.location;

                if (lat && lng && !isNaN(lat) && !isNaN(lng)) {
                  return (
                    <Marker key={pothole.id} position={[lat, lng]} icon={defaultIcon}>
                      <Popup>
                        <strong>Jenis Kerusakan:</strong> {pothole.damage_type}
                        <br />
                        <strong>Lokasi:</strong> {pothole.location.join(', ')}
                      </Popup>
                    </Marker>
                  );
                } 
              }
                  return null; // Abaikan data dengan koordinat tidak valid
                })}
          
            
            </MapContainer>
          </Box>
        </>
      )}
    </Box>
  );
};

export default MapComponent;
