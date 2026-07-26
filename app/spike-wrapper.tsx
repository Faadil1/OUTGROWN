import { Suspense } from 'react';
import HypothesisTestSpike from './spike';

export default function SpikeWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HypothesisTestSpike />
    </Suspense>
  );
}
