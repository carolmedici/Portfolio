import type { Route } from './+types/index';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Carolina Médici | Developer" },
    { name: "description", content: "Welcome to my portfolio as a fullstack developer." },
  ];
}

export default function Home() {
  return <>
  My App</>;
}
