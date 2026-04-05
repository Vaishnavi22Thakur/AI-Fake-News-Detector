import React from 'react';
import { motion } from 'framer-motion';
import './TrafficLight.css';

export default function TrafficLight({ verdict, confidence }) {
  const isRed    = verdict === 'Fake';
  const isYellow = verdict === 'Suspicious';
  const isGreen  = verdict === 'Real';

  const Light = ({ color, active, label }) => (
    <div className={`tl-light ${color} ${active ? 'active' : ''}`}>
      {active && (
        <motion.div
          className="tl-pulse"
          animate={{ scale: [1, 1.7, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        />
      )}
      <motion.div
        className="tl-inner"
        animate={active ? {
          boxShadow: [
            `0 0 10px var(--glow)`,
            `0 0 24px var(--glow)`,
            `0 0 10px var(--glow)`
          ]
        } : {}}
        transition={{ duration: 1.4, repeat: Infinity }}
      />
    </div>
  );

  return (
    <div className="traffic-light-wrap">
      <div className="traffic-light-housing">
        <Light color="red"    active={isRed}    />
        <Light color="yellow" active={isYellow} />
        <Light color="green"  active={isGreen}  />
      </div>
    </div>
  );
}
