import type { NextPage } from 'next';
import BasicQuery from '../components/BasicQuery';
import Tabs from '../components/Tabs';

const Home: NextPage = () => {
  return (
    <div className='flex flex-col text-gray-700 px-28 py-14 '>
      <h2 className='text-xl font-semibold'> Company Settings </h2>

      <Tabs />
      <BasicQuery />
    </div>
  );
};

export default Home;
