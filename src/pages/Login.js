import React, { useState } from 'react';
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Text,
  Image,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { supabase_login } from '../services/supabase_login';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase_login.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error.message);
        alert(`Login failed: ${error.message}`);
      } else {
        console.log('Login successful!', data);
        alert('Login successful! Redirecting to home...');
        navigate('/home');
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <Flex
      minHeight="100vh"
      bg="teal.500"
      alignItems="center"
      justifyContent="center"
      px={4}
    >
      <Box
        bg="white"
        p={8}
        borderRadius="lg"
        boxShadow="lg"
        maxWidth="800px"
        width="full"
      >
        <Flex align="center" justify="space-between">
          <Box
            width="50%"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            bg="white.500"
            borderRadius="lg"
            p={6}
          >
            <Image
              src="/logoo.png"
              alt="Logo"
              boxSize={{ base: '120px', md: '180px' }}
              mb={4}
            />
            <Text
              fontSize={{ base: 'xl', md: '2xl' }}
              fontWeight="bold"
              color="teal.500"
              textAlign="center"
            >
              Welcome to VGtec!
            </Text>
          </Box>
          <Box width="50%" textAlign="center">
            <Heading as="h1" size="lg" mb={4} color="teal.600">
              Login
            </Heading>
            <Text fontSize="sm" color="gray.600" mb={6}>
              Masuk untuk mulai menggunakan aplikasi
            </Text>
            <form onSubmit={handleLogin}>
              <FormControl mb={4}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  bg="gray.50"
                  borderColor="gray.300"
                  _focus={{
                    borderColor: 'teal.400',
                    boxShadow: '0 0 0 1px teal.400',
                  }}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  bg="gray.50"
                  borderColor="gray.300"
                  _focus={{
                    borderColor: 'teal.400',
                    boxShadow: '0 0 0 1px teal.400',
                  }}
                />
              </FormControl>
              <Button
                type="submit"
                colorScheme="teal"
                width="full"
                bg="teal.500"
                _hover={{
                  bg: 'teal.600',
                  transform: 'scale(1.05)',
                }}
                transition="all 0.2s ease-in-out"
              >
                Login
              </Button>
            </form>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Login;
