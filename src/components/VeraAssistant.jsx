import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './VeraAssistant.css';

export default function VeraAssistant({ verdict, explanation }) {
  const { t } = useTranslation();

  const messageKey = `vera_${verdict?.toLowerCase()}`;
  const message = t(messageKey);

  const color =
    verdict === 'Fake'
      ? '#ef4444'
      : verdict === 'Suspicious'
      ? '#f59e0b'
      : '#22c55e';

  const introText =
    verdict === 'Fake'
      ? "This content shows strong signs of being fake:"
      : verdict === 'Suspicious'
      ? "This content looks suspicious. Key concerns:"
      : "This content appears reliable. Positive signals:";

  return (
    <motion.div
      className="vera-assistant"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Character */}
      <div className="vera-char-wrap">
        <motion.div
          className="vera-char"
          style={{
            borderColor: color,
            boxShadow: `0 0 20px ${color}33`,
          }}
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="vera-char-face">
            <div className="vc-eye l" style={{ borderColor: color }}>
              <div className="vc-pupil" style={{ background: color }} />
            </div>
            <div className="vc-eye r" style={{ borderColor: color }}>
              <div className="vc-pupil" style={{ background: color }} />
            </div>
            <div className="vc-mouth" style={{ borderColor: color }} />
          </div>

          <div className="vera-char-antenna">
            <motion.div
              className="vc-ball"
              style={{ background: color }}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>

        <div className="vc-name">VERA</div>
      </div>

      {/* Speech bubble */}
      <motion.div
        className="vera-bubble"
        initial={{ scale: 0.8, opacity: 0, x: -10 }}
        animate={{ scale: 1, opacity: 1, x: 0 }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 18,
          delay: 0.4,
        }}
      >
        <div className="vera-bubble-arrow" />

        {/* Main message */}
        <p className="vera-bubble-msg">{message}</p>

        {/* Intro line */}
        {explanation?.length > 0 && (
          <p className="vera-intro" style={{ color }}>
            {introText}
          </p>
        )}

        {/* Bullet points */}
        {explanation && explanation.length > 0 && (
          <motion.ul
            className="vera-reasons"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.6,
                },
              },
              hidden: {},
            }}
          >
            {explanation.map((reason, i) => (
              <motion.li
                key={i}
                variants={{
                  hidden: { opacity: 0, x: -16 },
                  visible: { opacity: 1, x: 0 },
                }}
              >
                <span
                  className="vera-reason-dot"
                  style={{ background: color }}
                />
                {reason}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </motion.div>
    </motion.div>
  );
}