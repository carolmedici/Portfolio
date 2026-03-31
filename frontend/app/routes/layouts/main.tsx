import { Outlet } from 'react-router';
import type { Route } from '../about/+types';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Carolina Médici | Developer' },
    { name: 'description', content: 'CMy Portfolio' },
  ];
}

const MainLayout = () => {
  return (
    <>
      <section className='min-h-screen w-full bg-cyan-800 flex flex-col items-center justify-center p-4 md:p-12'>
        <Outlet />
      </section>
    </>
  );
};

export default MainLayout;
