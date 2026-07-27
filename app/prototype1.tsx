'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';

type PrototypeState = 'leading' | 'committed' | 'compatible' | 'unaccounted' | 'final';
type ReviewMode = 'static' | null;
type SceneState = 'leading' | 'committed' | 'preparing' | 'compatible' | 'unaccounted' | 'contracting' | 'final';
type EvidenceId = 'e1' | 'e2' | 'e3' | 'e4' | 'e5' | 'e6' | 'e7' | 'e8';
type EvidenceGroup = 'supporting' | 'compatible' | 'unaccounted' | 'unresolved';

interface EvidenceItem {
  id: EvidenceId;
  text: string;
  group: EvidenceGroup;
}

const EVIDENCE: EvidenceItem[] = [
  { id: 'e1', text: 'Deployment introduced three new database queries', group: 'supporting' },
  { id: 'e2', text: 'Query duration increased after deployment', group: 'supporting' },
  { id: 'e3', text: 'Latency and database pressure increased during degradation', group: 'supporting' },
  { id: 'e4', text: 'Query duration moved toward baseline after rollback', group: 'compatible' },
  { id: 'e5', text: 'Latency remained elevated', group: 'unaccounted' },
  { id: 'e6', text: 'Memory remained elevated', group: 'unaccounted' },
  { id: 'e7', text: 'Connection saturation persisted', group: 'unaccounted' },
  { id: 'e8', text: 'Replication lag remained elevated', group: 'unresolved' },
];

const STATE_ORDER: PrototypeState[] = ['leading', 'committed', 'compatible', 'unaccounted', 'final'];
const EMBEDDED_EVIDENCE_IDS: EvidenceId[] = ['e1', 'e2', 'e3', 'e4'];
const OUTSIDE_EVIDENCE_IDS: EvidenceId[] = ['e5', 'e6', 'e7', 'e8'];

const stateMeta: Record<SceneState, { status: string; assistive: string }> = {
  leading: {
    status: 'EXPLAINS THE FULL INCIDENT',
    assistive: 'The new queries fully explain the degradation. If the new queries are the only active explanation, removing them should begin a recovery consistent with this mechanism.',
  },
  committed: {
    status: 'EXPLAINS THE FULL INCIDENT',
    assistive: 'Prediction committed. Post-rollback evidence is being compared.',
  },
  preparing: {
    status: 'EXPLAINS THE FULL INCIDENT',
    assistive: 'The explanatory structure quietly becomes ready to receive evidence.',
  },
  compatible: {
    status: 'EXPLAINS THE FULL INCIDENT',
    assistive: 'Query duration moved toward baseline and remains compatible with the explanation.',
  },
  unaccounted: {
    status: 'EXPLAINS THE FULL INCIDENT',
    assistive: 'Latency, memory, and connection saturation remain outside the explanation\'s current scope.',
  },
  contracting: {
    status: 'EXPLAINS PART OF THE INCIDENT',
    assistive: 'The claimed boundary retracts toward the supported region while outside observations retain their visual weight.',
  },
  final: {
    status: 'EXPLAINS PART OF THE INCIDENT',
    assistive: 'The explanation remains supported but insufficient. Replication lag remains unresolved. Investigation remains open.',
  },
};

const copy = {
  hypothesis: 'The new queries fully explain the degradation.',
  claimLeading: 'EXPLAINS THE FULL INCIDENT',
  claimFinal: 'EXPLAINS PART OF THE INCIDENT',
  prediction:
    'If the new queries are the only active explanation, removing them should begin a recovery consistent with this mechanism.',
  finalMessage:
    'This explanation remains compatible with part of the evidence, but it does not yet account for the full incident.',
};

export default function Prototype1() {
  const searchParams = useSearchParams();
  const prefersReducedMotion = useReducedMotion();
  const initialState = (searchParams?.get('state') as PrototypeState) || 'leading';
  const reviewMode: ReviewMode = searchParams?.get('review') === 'static' ? 'static' : null;
  const derivedState = STATE_ORDER.includes(initialState) ? initialState : 'leading';
  const reviewOnly = reviewMode === 'static' && derivedState === 'final';

  const [sceneState, setSceneState] = useState<SceneState>(derivedState === 'leading' ? 'leading' : derivedState);
  const [predictionCommitted, setPredictionCommitted] = useState(derivedState !== 'leading');
  const [showReplay, setShowReplay] = useState(false);
  const [announcedMessage, setAnnouncedMessage] = useState('');
  const commitFocusRef = useRef<HTMLDivElement>(null);
  const finalFocusRef = useRef<HTMLButtonElement>(null);
  const timersRef = useRef<number[]>([]);
  const devAssertionRanRef = useRef(false);

  const clearTimers = () => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
  };

  useEffect(() => clearTimers, []);

  useEffect(() => {
    if (sceneState === 'committed') commitFocusRef.current?.focus();
    if (sceneState === 'final') finalFocusRef.current?.focus();
  }, [sceneState]);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development' || devAssertionRanRef.current) return;
    const embeddedIds = EMBEDDED_EVIDENCE_IDS.join(',');
    const outsideIds = OUTSIDE_EVIDENCE_IDS.join(',');
    const overlap = EMBEDDED_EVIDENCE_IDS.filter((id) => OUTSIDE_EVIDENCE_IDS.includes(id));
    devAssertionRanRef.current = true;
    if (embeddedIds !== 'e1,e2,e3,e4' || outsideIds !== 'e5,e6,e7,e8' || overlap.length > 0) {
      console.error('Day 11 evidence source-of-truth assertion failed', {
        embeddedIds,
        outsideIds,
        overlap,
      });
    }
  }, []);

  const stateKey: PrototypeState = sceneState === 'preparing' ? 'compatible' : sceneState === 'contracting' ? 'final' : sceneState;
  const showAction = !reviewOnly && sceneState === 'leading';
  const showFinalActions = !reviewOnly && sceneState === 'final';
  const showReplayButton = !reviewOnly && showReplay && sceneState === 'final';
  const showReview = !reviewOnly;

  const embeddedEvidence = useMemo(() => {
    switch (sceneState) {
      case 'leading':
      case 'committed':
        return EVIDENCE.filter((item) => ['e1', 'e2', 'e3'].includes(item.id));
      case 'preparing':
      case 'compatible':
      case 'unaccounted':
      case 'contracting':
      case 'final':
        return EVIDENCE.filter((item) => EMBEDDED_EVIDENCE_IDS.includes(item.id));
      default:
        return EVIDENCE.filter((item) => ['e1', 'e2', 'e3'].includes(item.id));
    }
  }, [sceneState]);

  const outsideEvidence = useMemo(() => {
    if (sceneState === 'unaccounted' || sceneState === 'contracting' || sceneState === 'final') {
      return EVIDENCE.filter((item) => OUTSIDE_EVIDENCE_IDS.includes(item.id));
    }
    return [];
  }, [sceneState]);

  const runTimeline = () => {
    clearTimers();
    setShowReplay(false);

    if (prefersReducedMotion) {
      setSceneState('final');
      setAnnouncedMessage(stateMeta.final.assistive);
      return;
    }

    const schedule = (delay: number, fn: () => void) => {
      const timer = window.setTimeout(fn, delay);
      timersRef.current.push(timer);
    };

    setSceneState('committed');
    setAnnouncedMessage(stateMeta.committed.assistive);
    schedule(1200, () => {
      setSceneState('preparing');
      setAnnouncedMessage(stateMeta.preparing.assistive);
    });
    schedule(3200, () => {
      setSceneState('compatible');
      setAnnouncedMessage(stateMeta.compatible.assistive);
    });
    schedule(4200, () => {
      setSceneState('unaccounted');
      setAnnouncedMessage(stateMeta.unaccounted.assistive);
    });
    schedule(5600, () => {
      setSceneState('contracting');
      setAnnouncedMessage(stateMeta.contracting.assistive);
    });
    schedule(6800, () => {
      setSceneState('final');
      setShowReplay(true);
      setAnnouncedMessage(stateMeta.final.assistive);
    });
  };

  const handleCommit = () => {
    if (predictionCommitted) return;
    setPredictionCommitted(true);
    runTimeline();
  };

  const handleReplay = () => {
    clearTimers();
    setPredictionCommitted(false);
    setSceneState('leading');
    setShowReplay(false);
    setAnnouncedMessage('');
  };

  const handleReopen = () => {
    finalFocusRef.current?.focus();
  };

  const sceneClass = reviewOnly ? 'scene-review-static' : '';
  const boundaryClass = sceneState === 'contracting' || sceneState === 'final' ? 'scene-boundary scene-boundary--contracted' : 'scene-boundary';
  const claimText = sceneState === 'contracting' || sceneState === 'final' ? copy.claimFinal : copy.claimLeading;

  return (
    <main className={`page-shell ${sceneClass}`}>
      <section className="page-frame">
        <header className="hero-copy">
          <p className="eyebrow">OUTGROWN</p>
          <h1>{copy.hypothesis}</h1>
          <p className="lede">The evidence outgrew the explanation.</p>
        </header>

        <div className="scene-canvas" aria-label="Explanatory scene">
          <div className={boundaryClass} aria-describedby="scene-caption">
            <div className="scene-strata">
              <Stratum tone="tone-a" items={embeddedEvidence.filter((item) => item.id === 'e1')} />
              <Stratum tone="tone-b" items={embeddedEvidence.filter((item) => item.id === 'e2')} />
              <Stratum tone="tone-c" items={embeddedEvidence.filter((item) => item.id === 'e3')} />
              <Stratum tone="tone-d" items={embeddedEvidence.filter((item) => item.id === 'e4')} />
            </div>
          </div>

          <ObservationCard id="e5" text="Latency remained elevated" label="Latency" position="left" visible={outsideEvidence.some((item) => item.id === 'e5')} reviewOnly={reviewOnly} />
          <ObservationCard id="e6" text="Memory remained elevated" label="Memory" position="right-top" visible={outsideEvidence.some((item) => item.id === 'e6')} reviewOnly={reviewOnly} />
          <ObservationCard id="e7" text="Connection saturation persisted" label="Connection saturation" position="right-mid" visible={outsideEvidence.some((item) => item.id === 'e7')} reviewOnly={reviewOnly} />
          <ObservationCard id="e8" text="Replication lag remained elevated" label="Replication lag" position="open" visible={outsideEvidence.some((item) => item.id === 'e8')} reviewOnly={reviewOnly} />

          <div id="scene-caption" className="scene-caption">
            <div className="claim-block">
              {!reviewOnly && <span className="claim-label">Claimed boundary</span>}
              <strong>{claimText}</strong>
            </div>
            {!reviewOnly && <p className="status-line">{stateMeta[stateKey].status}</p>}
          </div>
        </div>

        <div className="interaction-row">
          {showAction && (
            <motion.button type="button" className="primary-action" onClick={handleCommit} aria-describedby="interaction-help">
              COMMIT &amp; TEST PREDICTION
            </motion.button>
          )}
          {showFinalActions && (
            <>
              <button type="button" className="secondary-action" onClick={handleReopen} ref={finalFocusRef}>
                REOPEN THE INVESTIGATION
              </button>
              {showReplayButton && (
                <button type="button" className="secondary-action" onClick={handleReplay}>
                  REPLAY TEST
                </button>
              )}
            </>
          )}
        </div>

        <p id="interaction-help" className="assistive-copy">
          {stateMeta[stateKey].assistive}
        </p>

        <AnimatePresence>
          {(sceneState !== 'leading' || reviewOnly) && (
            <motion.div className="prediction-strip" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease: 'easeOut' }} ref={commitFocusRef} tabIndex={-1}>
              <div className="prediction-title">Prediction</div>
              <p>{copy.prediction}</p>
              {sceneState === 'committed' && <p className="prediction-state">LOCKED</p>}
              {sceneState === 'final' && <p className="prediction-state">{copy.finalMessage}</p>}
            </motion.div>
          )}
        </AnimatePresence>

        {showReview && (
          <details className="review-controls" open={reviewOnly ? false : undefined}>
            <summary>Review controls</summary>
            <div className="review-links">
              {STATE_ORDER.map((state) => (
                <a key={state} href={`?state=${state}`} aria-current={derivedState === state ? 'page' : undefined}>
                  {state}
                </a>
              ))}
              <a href="?state=final&review=static">Static final review</a>
            </div>
          </details>
        )}

        <div className="live-region" aria-live="polite" aria-atomic="true" role="status">
          {announcedMessage}
        </div>
      </section>
    </main>
  );
}

function Stratum({ tone, items }: { tone: 'tone-a' | 'tone-b' | 'tone-c' | 'tone-d'; items: EvidenceItem[] }) {
  return (
    <section className={`stratum ${tone}`}>
      <div className="stratum-content">
        {items.map((item) => (
          <EvidenceSeat key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

function EvidenceSeat({ item }: { item: EvidenceItem }) {
  return (
    <motion.div className="seat" layout transition={{ duration: 0.25, ease: 'easeOut' }}>
      <span>{item.text}</span>
    </motion.div>
  );
}

function ObservationCard({
  id,
  text,
  label,
  position,
  visible,
  reviewOnly,
}: {
  id: EvidenceId;
  text: string;
  label: string;
  position: 'left' | 'right-top' | 'right-mid' | 'open';
  visible: boolean;
  reviewOnly: boolean;
}) {
  const className = {
    left: 'obs obs-left',
    'right-top': 'obs obs-right-top',
    'right-mid': 'obs obs-right-mid',
    open: 'obs obs-open',
  }[position];

  return (
    <AnimatePresence>
      {visible && (
        <motion.article key={id} className={`${className} ${reviewOnly ? 'obs-review' : ''}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.28, ease: 'easeOut' }}>
          {!reviewOnly && <span className="obs-label">{label}</span>}
          <p>{text}</p>
        </motion.article>
      )}
    </AnimatePresence>
  );
}

