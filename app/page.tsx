'use client';

import Image from 'next/image';
import PostGenerator from './components/PostGenerator';

export default function Home() {
  return (
    <main className="App">
      <div className='container'>
        <PostGenerator />
      </div>
    </main>
  )
}