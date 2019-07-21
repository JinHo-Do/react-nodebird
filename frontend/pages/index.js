import Head from 'next/head';

import Layout from '../components/Layout';

const Home = () => {
  return (
    <>
      <Head>
        <title>NodeBird</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.18.2/antd.css"
        />
      </Head>

      <Layout>
        <div>Hello, Next!</div>
      </Layout>
    </>
  );
};

export default Home;
