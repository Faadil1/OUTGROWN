import { Suspense } from 'react';
import Prototype1 from './prototype1';

export default function SpikeWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Prototype1 />
    </Suspense>
  );
}
