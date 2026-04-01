import { Outlet } from 'react-router';
import type { Route } from '../about/+types';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Carolina Médici | Developer' },
    { name: 'description', content: 'My Portfolio' },
  ];
}

const MainLayout = () => {
  return (
    <>
      <section className='min-h-screen w-full bg-gradient-to-br bg-gradient-to-br from-gray-600 via-gray-800 to-indigo-950 text-white transition-colors duration-300 flex flex-col items-center justify-center p-4 md:p-12'>
        <Outlet />
      </section>
    </>
  );
};

export default MainLayout;
