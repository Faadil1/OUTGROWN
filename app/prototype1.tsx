'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

type PrototypeState = 'leading' | 'committed' | 'compatible' | 'unaccounted' | 'final';

interface EvidenceItem {
  id: string;
  text: string;
  type: 'supported' | 'unaccounted' | 'unresolved';
}

const EVIDENCE: EvidenceItem[] = [
  // Initial supporting (pre-rollback) - embedded
  { id: 'e1', text: 'Deployment introduced three new database queries', type: 'supported' },
  { id: 'e2', text: 'Query duration increased after deployment', type: 'supported' },
  { id: 'e3', text: 'Latency and database pressure increased during degradation', type: 'supported' },

  // Post-rollback compatible - embedded after state C
  { id: 'e4', text: 'Query duration moved toward baseline after rollback', type: 'supported' },

  // Post-rollback unaccounted - adjacent to boundary
  { id: 'e5', text: 'Latency remained elevated', type: 'unaccounted' },
  { id: 'e6', text: 'Memory remained elevated', type: 'unaccounted' },
  { id: 'e7', text: 'Connection saturation persisted', type: 'unaccounted' },

  // Still unresolved - open field
  { id: 'e8', text: 'Replication lag remained elevated', type: 'unresolved' },
];

// 12-token palette
const COLORS = {
  canvas: '#FFFFFF',
  textPrimary: '#3A3A3C',
  textSecondary: '#6A6A6E',
  stratum1: '#F2F2F4',
  stratum2: '#E8E8EC',
  stratum3: '#DCDCE2',
  stratum4: '#D0D0D6',
  seam: '#B0B0B6',
  boundaryClaimed: '#2A2A2C',
  boundarySupported: '#5A5A5E',
  shadow: 'rgba(0, 0, 0, 0.08)',
  buttonPrimary: '#0066CC',
};

export default function Prototype1() {
  const searchParams = useSearchParams();
  const currentState: PrototypeState = (searchParams?.get('state') as PrototypeState) || 'leading';

  // Determine visibility based on state
  const visibleEvidence = useMemo(() => {
    switch (currentState) {
      case 'leading':
        return EVIDENCE.filter(e => e.type === 'supported' && e.id !== 'e4'); // e1-e3 only
      case 'committed':
        return EVIDENCE.filter(e => e.type === 'supported' && e.id !== 'e4'); // e1-e3 only
      case 'compatible':
        return EVIDENCE.filter(e => e.type === 'supported'); // e1-e4
      case 'unaccounted':
        return EVIDENCE.filter(e => e.type === 'supported' || e.type === 'unaccounted'); // e1-e7
      case 'final':
        return EVIDENCE; // all 8
      default:
        return EVIDENCE.filter(e => e.type === 'supported' && e.id !== 'e4');
    }
  }, [currentState]);

  // Determine boundary width (full in early states, contracted in final)
  const boundaryWidth = currentState === 'final' ? '420px' : '520px';
  const boundaryHeight = currentState === 'final' ? '280px' : '380px';

  return (
    <div style={{ backgroundColor: COLORS.canvas, minHeight: '100vh', padding: '60px' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', minHeight: '900px', position: 'relative' }}>

        {/* HEADER: Hypothesis Statement */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{
            fontSize: '18px',
            fontWeight: 500,
            color: COLORS.textPrimary,
            margin: 0,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          }}>
            Deployment introduced queries that degraded latency without triggering expected mitigations
          </h1>
        </div>

        {/* MAIN COMPOSITION */}
        <div style={{ position: 'relative', display: 'flex', gap: '120px' }}>

          {/* LEFT: EXPLANATORY STRUCTURE */}
          <div style={{ position: 'relative', width: '780px', height: '460px' }}>

            {/* CLAIMED BOUNDARY (outer frame) */}
            <div style={{
              position: 'absolute',
              top: currentState === 'final' ? '90px' : '0',
              left: currentState === 'final' ? '80px' : '0',
              width: boundaryWidth,
              height: boundaryHeight,
              border: `4px solid ${COLORS.boundaryClaimed}`,
              transition: 'all 300ms ease-out',
            }} />

            {/* FOUR STRATA */}
            <div style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}>

              {/* Stratum 1 - 110px */}
              <div style={{
                flex: '0 0 110px',
                backgroundColor: COLORS.stratum1,
                borderBottom: `1px solid ${COLORS.seam}`,
                display: 'flex',
                alignItems: 'center',
                paddingLeft: '40px',
                paddingRight: '40px',
                overflow: 'hidden',
              }}>
                {visibleEvidence.find(e => e.id === 'e1') && (
                  <EvidenceEmbed text={EVIDENCE[0].text} />
                )}
              </div>

              {/* Stratum 2 - 140px */}
              <div style={{
                flex: '0 0 140px',
                backgroundColor: COLORS.stratum2,
                borderBottom: `1px solid ${COLORS.seam}`,
                display: 'flex',
                alignItems: 'center',
                paddingLeft: '40px',
                paddingRight: '40px',
                gap: '60px',
                overflow: 'hidden',
              }}>
                {visibleEvidence.find(e => e.id === 'e2') && (
                  <EvidenceEmbed text={EVIDENCE[1].text} />
                )}
                {visibleEvidence.find(e => e.id === 'e4') && (
                  <EvidenceEmbed text={EVIDENCE[3].text} />
                )}
              </div>

              {/* Stratum 3 - 100px */}
              <div style={{
                flex: '0 0 100px',
                backgroundColor: COLORS.stratum3,
                borderBottom: `1px solid ${COLORS.seam}`,
                display: 'flex',
                alignItems: 'center',
                paddingLeft: '40px',
                paddingRight: '40px',
                overflow: 'hidden',
              }}>
                {visibleEvidence.find(e => e.id === 'e3') && (
                  <EvidenceEmbed text={EVIDENCE[2].text} />
                )}
              </div>

              {/* Stratum 4 - 110px (base) */}
              <div style={{
                flex: '0 0 110px',
                backgroundColor: COLORS.stratum4,
                display: 'flex',
                alignItems: 'center',
                paddingLeft: '40px',
                paddingRight: '40px',
              }} />
            </div>

            {/* EXTERNAL EVIDENCE - positioned around structure */}

            {/* Unaccounted evidence adjacent to structure */}
            {currentState === 'unaccounted' || currentState === 'final' ? (
              <>
                {/* Latency - left edge */}
                <div style={{
                  position: 'absolute',
                  left: '-80px',
                  top: '60px',
                  width: '180px',
                  padding: '12px',
                  backgroundColor: COLORS.stratum2,
                  border: `1px solid ${COLORS.seam}`,
                  fontSize: '12px',
                  color: COLORS.textPrimary,
                  fontFamily: '-apple-system, sans-serif',
                }}>
                  <strong>Latency</strong><br />
                  Remained elevated
                </div>

                {/* Memory - upper right */}
                <div style={{
                  position: 'absolute',
                  right: '-240px',
                  top: '40px',
                  width: '180px',
                  padding: '12px',
                  backgroundColor: COLORS.stratum2,
                  border: `1px solid ${COLORS.seam}`,
                  fontSize: '12px',
                  color: COLORS.textPrimary,
                  fontFamily: '-apple-system, sans-serif',
                }}>
                  <strong>Memory</strong><br />
                  Remained elevated
                </div>

                {/* Connection saturation - bottom right */}
                <div style={{
                  position: 'absolute',
                  right: '-240px',
                  bottom: '40px',
                  width: '180px',
                  padding: '12px',
                  backgroundColor: COLORS.stratum2,
                  border: `1px solid ${COLORS.seam}`,
                  fontSize: '12px',
                  color: COLORS.textPrimary,
                  fontFamily: '-apple-system, sans-serif',
                }}>
                  <strong>Saturation</strong><br />
                  Persisted
                </div>
              </>
            ) : null}
          </div>

          {/* RIGHT: UNRESOLVED FIELD (visible in final state) */}
          {currentState === 'final' ? (
            <div style={{
              flex: 1,
              maxWidth: '400px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}>
              <h3 style={{
                fontSize: '12px',
                fontWeight: 400,
                color: COLORS.textSecondary,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                margin: '0 0 10px 0',
              }}>
                Observations Remaining Unresolved
              </h3>
              <div style={{
                padding: '16px',
                backgroundColor: COLORS.stratum1,
                border: `1px solid ${COLORS.seam}`,
                fontSize: '13px',
                color: COLORS.textPrimary,
                fontFamily: '-apple-system, sans-serif',
              }}>
                <strong>Replication lag</strong><br />
                Remained elevated<br />
                <span style={{ fontSize: '10px', color: COLORS.textSecondary, fontStyle: 'italic' }}>
                  Awaiting investigation
                </span>
              </div>
            </div>
          ) : null}
        </div>

        {/* FOOTER: Status and Action */}
        <div style={{ marginTop: '80px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{
              fontSize: '13px',
              fontWeight: 500,
              color: COLORS.textSecondary,
              margin: '0 0 8px 0',
              fontFamily: '-apple-system, sans-serif',
            }}>
              {currentState === 'leading' && 'Ready to test prediction'}
              {currentState === 'committed' && 'Prediction locked • awaiting rollback'}
              {currentState === 'compatible' && '1 of 3 predictions confirmed'}
              {currentState === 'unaccounted' && 'Prediction tested • 3 observations unaccounted'}
              {currentState === 'final' && 'Investigation remains open • scope contracted'}
            </p>
          </div>
          {currentState === 'final' && (
            <button style={{
              padding: '10px 20px',
              backgroundColor: COLORS.buttonPrimary,
              color: 'white',
              border: 'none',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: '-apple-system, sans-serif',
              textTransform: 'uppercase',
            }}>
              Reopen the Investigation
            </button>
          )}
        </div>
      </div>

      {/* REVIEW CONTROLS (bottom) */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        backgroundColor: COLORS.canvas,
        border: `1px solid ${COLORS.seam}`,
        padding: '12px 16px',
        borderRadius: '4px',
        fontSize: '11px',
        fontFamily: '-apple-system, sans-serif',
      }}>
        <div style={{ marginBottom: '8px', color: COLORS.textSecondary }}>Review controls:</div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['leading', 'committed', 'compatible', 'unaccounted', 'final'].map(s => (
            <a
              key={s}
              href={`?state=${s}`}
              style={{
                padding: '4px 8px',
                backgroundColor: currentState === s ? COLORS.buttonPrimary : COLORS.stratum3,
                color: currentState === s ? 'white' : COLORS.textPrimary,
                textDecoration: 'none',
                fontSize: '10px',
                borderRadius: '2px',
                cursor: 'pointer',
              }}
            >
              {s}
            </a>
          ))}
        </div>
        <div style={{ marginTop: '8px', fontSize: '9px', color: COLORS.textSecondary }}>
          Technical interaction spike — visual direction not final
        </div>
      </div>
    </div>
  );
}

function EvidenceEmbed({ text }: { text: string }) {
  return (
    <div style={{
      fontSize: '11px',
      color: '#FFFFFF',
      backgroundColor: '#3A3A3C',
      padding: '6px 10px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      borderRadius: '2px',
      fontFamily: '-apple-system, sans-serif',
    }}>
      {text.substring(0, 35)}...
    </div>
  );
}
