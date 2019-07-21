import PropTypes from 'prop-types';
import Head from 'next/head';
import Layout from '../components/Layout';

const App = ({ Component }) => (
  <>
    <Head>
      <title>NodeBird</title>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.18.2/antd.css"
      />
    </Head>

    <Layout>
      <Component />
    </Layout>
  </>
);

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default App;
