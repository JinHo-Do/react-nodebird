import Head from 'next/head';

import Layout from '../components/Layout';

const Profile = () => (
  <>
    <Head>
      <title>NodeBird</title>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.18.2/antd.css"
      />
    </Head>

    <Layout>
      <div>Profile</div>
    </Layout>
  </>
);

export default Profile;
