import { Outlet } from 'react-router';
import Banner from '~/components/Banner';


const HomeLayout = () => {
  return (
    <>
      <Banner />
      <section className='max-w-6xl mx-auto px-6 my-8'>
        <Outlet />
      </section>
    </>
  );
};

export default HomeLayout;
