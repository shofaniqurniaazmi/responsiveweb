// src/components/FeedbackForm.js

import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Textarea, useToast } from '@chakra-ui/react';

const FeedbackForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic (e.g., send data to a server)
    toast({
      title: "Feedback submitted.",
      description: "Your feedback has been sent successfully.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <Box p={5} borderWidth={1} borderRadius="md" shadow="md" bg="white">
      <form onSubmit={handleSubmit}>
        <FormControl id="name" mb={4} isRequired>
          <FormLabel>Nama</FormLabel>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl id="email" mb={4} isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="message" mb={4} isRequired>
          <FormLabel>Pesan</FormLabel>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
          />
        </FormControl>
        <Button type="submit" colorScheme="blue">Kirim</Button>
      </form>
    </Box>
  );
};

export default FeedbackForm;
