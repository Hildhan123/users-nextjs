import React from 'react';
import Head from 'next/head';
import { Container, Fab } from '@mui/material';
import User from './frontend/user';


const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>User List - My Next.js App</title>
        <meta name="description" content="This is the home page of my Next.js application." />
      </Head>
    <Container>
      <User/>
    </Container>
    </>
  );
};

export default Home;
