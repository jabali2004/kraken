import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';

type Props = {
  children: JSX.Element;
};

export default function Layout({ children }: Props) {
  return (
    <div className="flex flex-col h-screen">
      <header>
        <Header />
      </header>
      <main className="flex-grow mx-auto px-6 py-6 md:px-0 container">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}