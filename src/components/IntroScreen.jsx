import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './IntroScreen.css';

const STEPS = ['intro', 'step1', 'step2', 'step3'];

export default function IntroScreen({ onDone }) {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);

  const stepContent = [
    { icon: '🔍', text: t('introDesc') },
    { icon: '📋', text: t('step1') },
    { icon: '🤖', text: t('step2') },
    { icon: '📊', text: t('step3') },
  ];

  const current = stepContent[step];
  const isLast = step === STEPS.length - 1;

  return (
    <motion.div
      className="intro-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Skip button */}
      <motion.button
        className="intro-skip"
        onClick={onDone}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
        whileHover={{ scale: 1.05 }}
      >
        {t('skipIntro')} ✕
      </motion.button>

      {/* Card */}
      <motion.div
        className="intro-card"
        initial={{ scale: 0.8, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        {/* VERA character */}
        <div className="intro-vera-wrap">
          <motion.div
            className="intro-vera"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Face */}
            <div className="vera-face">
              <div className="vera-eye left">
                <motion.div
                  className="vera-pupil"
                  animate={{ x: [0, 2, -2, 0], y: [0, 1, -1, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>
              <div className="vera-eye right">
                <motion.div
                  className="vera-pupil"
                  animate={{ x: [0, -2, 2, 0], y: [0, 1, -1, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>
              <motion.div
                className="vera-mouth"
                animate={{ scaleX: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
            {/* Antenna */}
            <div className="vera-antenna">
              <motion.div
                className="vera-antenna-ball"
                animate={{ backgroundColor: ['#63d2ff', '#a78bfa', '#f472b6', '#63d2ff'] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
          <div className="vera-shadow" />
        </div>

        {/* Title */}
        <motion.h2
          className="intro-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {t('introTitle')}
        </motion.h2>

        {/* Step content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            className="intro-step"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            <span className="intro-step-icon">{current.icon}</span>
            <p className="intro-step-text">{current.text}</p>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="intro-dots">
          {STEPS.map((_, i) => (
            <motion.button
              key={i}
              className={`intro-dot ${i === step ? 'active' : ''}`}
              onClick={() => setStep(i)}
              whileHover={{ scale: 1.3 }}
            />
          ))}
        </div>

        {/* Next / Start */}
        <motion.button
          className="intro-next-btn"
          onClick={() => isLast ? onDone() : setStep(s => s + 1)}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          {isLast ? t('letsGo') : 'Next →'}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
