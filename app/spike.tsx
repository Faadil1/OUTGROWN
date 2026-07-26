'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

type SpikeState = 'before-commitment' | 'evidence-reveal' | 'final-state';

interface EvidenceItem {
  id: string;
  text: string;
  group: 'matched' | 'divergence' | 'unresolved';
  delay: number;
}

const EVIDENCE: EvidenceItem[] = [
  { id: 'query-recovery', text: 'Query duration moved toward baseline after rollback.', group: 'matched', delay: 0 },
  { id: 'latency-elevated', text: 'Application latency remained elevated.', group: 'divergence', delay: 1 },
  { id: 'memory-elevated', text: 'Memory remained elevated.', group: 'divergence', delay: 1.5 },
  { id: 'connection-persists', text: 'Connection saturation persisted.', group: 'divergence', delay: 2 },
  { id: 'replication-unexplained', text: 'Replication lag remained elevated.', group: 'unresolved', delay: 2.5 },
];

export default function HypothesisTestSpike() {
  const searchParams = useSearchParams();
  const queryState = searchParams?.get('state') as SpikeState | null;

  const [state, setCurrentState] = useState<SpikeState>('before-commitment');
  const initializedRef = useRef(false);
  const evidenceRef = useRef<HTMLDivElement>(null);

  // Derive visibility directly from state
  const showUnexplained = state === 'final-state';

  // Set initial state from query parameter (only once on mount)
  useEffect(() => {
    if (!initializedRef.current && queryState && ['before-commitment', 'evidence-reveal', 'final-state'].includes(queryState)) {
      initializedRef.current = true;
      setCurrentState(queryState);
    }
  }, [queryState]);

  const handleCommitTest = () => {
    if (state !== 'before-commitment') return;
    setCurrentState('evidence-reveal');
  };

  const handleReplay = () => {
    setCurrentState('before-commitment');
  };

  // Auto-transition to final state when evidence animation completes
  useEffect(() => {
    if (state === 'evidence-reveal') {
      const timer = setTimeout(() => {
        setCurrentState('final-state');
      }, 3500); // After all evidence has appeared

      return () => clearTimeout(timer);
    }
  }, [state]);

  // Focus management on state changes
  useEffect(() => {
    if (state === 'evidence-reveal' && evidenceRef.current) {
      evidenceRef.current.focus();
    }
  }, [state]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-2xl mx-auto">
        {/* HYPOTHESIS CARD */}
        <motion.div
          layout
          className="bg-white dark:bg-slate-800 rounded-lg border-2 border-slate-800 dark:border-slate-200 p-8 mb-8 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">LEADING HYPOTHESIS</h2>
          </div>

          <p className="text-slate-700 dark:text-slate-300 mb-6 text-base leading-relaxed">
            The new queries fully explain the degradation.
          </p>

          <div className="border-t border-slate-200 dark:border-slate-700 pt-4 mb-6">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">COMPLETENESS CLAIM</p>
            <motion.p
              key={`claim-${state}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-medium text-slate-900 dark:text-slate-100"
            >
              {state === 'before-commitment' ? 'Explains the full incident.' : 'Explains part of the incident.'}
            </motion.p>
          </div>

          {state === 'before-commitment' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-3">SUPPORTING OBSERVATIONS</p>
              <ul className="space-y-2">
                <li className="text-sm text-slate-700 dark:text-slate-300">• Latency rose after deployment</li>
                <li className="text-sm text-slate-700 dark:text-slate-300">• Database CPU increased</li>
                <li className="text-sm text-slate-700 dark:text-slate-300">• Query duration increased</li>
              </ul>
            </motion.div>
          )}
        </motion.div>

        {/* PREDICTION CARD */}
        <motion.div
          layout
          className="bg-white dark:bg-slate-800 rounded-lg border-2 border-slate-300 dark:border-slate-600 p-8 mb-8 shadow-sm"
          animate={
            state === 'before-commitment'
              ? { borderColor: '#cbd5e1', backgroundColor: '#ffffff' }
              : { borderColor: '#1e293b', backgroundColor: '#f8fafc' }
          }
          transition={{ duration: 0.3 }}
        >
          <div className="mb-4">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Required Prediction</p>
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              If this explanation is sufficient, removing the queries should begin a recovery consistent with this mechanism.
            </h3>
          </div>

          {state !== 'before-commitment' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border-t border-slate-200 dark:border-slate-700 pt-4 mt-6"
            >
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">
                Status
              </p>
              <motion.p
                key={`status-${state}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-bold text-slate-900 dark:text-slate-100"
              >
                {state === 'final-state' ? '◐ SUPPORTED + INSUFFICIENT' : 'LOCKED'}
              </motion.p>
            </motion.div>
          )}
        </motion.div>

        {/* EVIDENCE GROUPS - REVEALED AFTER COMMITMENT */}
        <AnimatePresence>
          {state !== 'before-commitment' && (
            <motion.div
              ref={evidenceRef}
              tabIndex={-1}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6 mb-8 focus:outline-none"
            >
              {/* MATCHED EVIDENCE */}
              <motion.div layout className="space-y-3">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">STILL COMPATIBLE</p>
                <div key="matched-card" className="bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-300 dark:border-blue-700 p-4">
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-sm text-slate-700 dark:text-slate-300 flex items-start"
                  >
                    <span className="text-blue-600 dark:text-blue-400 font-bold mr-3 mt-0.5">✓</span>
                    Query duration moved toward baseline after rollback.
                  </motion.p>
                </div>
              </motion.div>

              {/* DIVERGENCE EVIDENCE */}
              <motion.div layout className="space-y-3">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">NOT ACCOUNTED FOR BY THIS PREDICTION</p>
                <div className="space-y-2">
                  {EVIDENCE.filter(e => e.group === 'divergence').map((evidence) => (
                    <motion.div
                      key={evidence.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + evidence.delay * 0.2 }}
                      className="bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-300 dark:border-orange-700 p-4"
                    >
                      <p className="text-sm text-slate-700 dark:text-slate-300 flex items-start">
                        <span className="text-orange-600 dark:text-orange-400 font-bold mr-3 mt-0.5">~</span>
                        {evidence.text}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* UNRESOLVED EVIDENCE */}
              <AnimatePresence>
                {showUnexplained && (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                  >
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">STILL UNEXPLAINED</p>
                    <div className="bg-gray-50 dark:bg-gray-900/20 rounded-lg border border-gray-300 dark:border-gray-700 p-4">
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-sm text-slate-700 dark:text-slate-300 flex items-start"
                      >
                        <span className="text-gray-600 dark:text-gray-400 font-bold mr-3 mt-0.5">?</span>
                        Replication lag remained elevated.
                      </motion.p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FINAL MESSAGE - APPEARS IN FINAL STATE */}
        <AnimatePresence>
          {state === 'final-state' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-100 dark:bg-slate-700 rounded-lg p-6 mb-8 border border-slate-300 dark:border-slate-600"
            >
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                This explanation remains compatible with part of the evidence, but it does not yet account for the full incident.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* PRIMARY ACTION BUTTON */}
        <div className="flex gap-4 justify-center mb-8">
          {state === 'before-commitment' ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCommitTest}
              className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-shadow text-base"
            >
              Commit & test prediction
            </motion.button>
          ) : state === 'final-state' ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleReplay}
              className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-shadow text-base"
            >
              Replay test
            </motion.button>
          ) : null}
        </div>

        {/* DEVELOPMENT LABEL */}
        <div className="text-center text-xs text-slate-500 dark:text-slate-400 space-y-3 border-t border-slate-200 dark:border-slate-700 pt-6">
          <p className="italic">Technical interaction spike — visual direction not final</p>

          {/* REVIEW CONTROLS */}
          <details className="inline-block cursor-pointer">
            <summary className="font-medium hover:text-slate-600 dark:hover:text-slate-300">Review controls</summary>
            <div className="text-slate-400 dark:text-slate-500 mt-2 space-y-1">
              <p>Current state: <span className="font-mono font-semibold">{state}</span></p>
              <p>
                Deterministic links: <a href="?state=before-commitment" className="underline hover:text-slate-600 dark:hover:text-slate-300">before</a> | <a href="?state=evidence-reveal" className="underline hover:text-slate-600 dark:hover:text-slate-300">reveal</a> | <a href="?state=final-state" className="underline hover:text-slate-600 dark:hover:text-slate-300">final</a>
              </p>
            </div>
          </details>
        </div>

        {/* ACCESSIBILITY: LIVE REGION FOR SCREEN READERS */}
        <div
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
          role="status"
        >
          {state === 'evidence-reveal' && 'Testing prediction. Revealed: Query duration moved toward baseline. Also observed: Application latency remained elevated, memory remained elevated, connection saturation persisted. Still unexplained: Replication lag.'}
          {state === 'final-state' && 'Test complete. The prediction was partially correct. The hypothesis is now supported and insufficient. The investigation remains open.'}
        </div>
      </div>
    </div>
  );
}
