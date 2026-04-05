import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { useTranslation } from 'react-i18next';
import { useStats } from '../context/StatsContext';
import './StatsPanel.css';

const COLORS = { fake: '#f87171', real: '#34d399', suspicious: '#fbbf24' };

const TOOLTIP_STYLE = {
  background: '#1e293b',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 10,
  color: '#eef2ff',
  fontSize: 13,
};

export default function StatsPanel() {
  const { t } = useTranslation();
  const { stats } = useStats();

  const pieData = [
    { name: t('fakeCount'),       value: stats.fake,       color: COLORS.fake },
    { name: t('realCount'),       value: stats.real,       color: COLORS.real },
    { name: t('suspiciousCount'), value: stats.suspicious, color: COLORS.suspicious },
  ].filter(d => d.value > 0);

  const barData = stats.history.slice(-10).map((h, i) => ({
    name: `#${i + 1}`,
    confidence: h.confidence,
    fill: COLORS[h.verdict.toLowerCase()] || '#6b7a99',
  }));

  const statCards = [
    { label: t('totalAnalyzed'),   value: stats.total,       color: '#38bdf8' },
    { label: t('fakeCount'),       value: stats.fake,        color: '#f87171' },
    { label: t('realCount'),       value: stats.real,        color: '#34d399' },
    { label: t('suspiciousCount'), value: stats.suspicious,  color: '#fbbf24' },
  ];

  return (
    <motion.div className="stats-panel" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
      <div className="stats-title">{t('stats')}</div>

      <div className="stat-cards">
        {statCards.map((s, i) => (
          <motion.div key={s.label} className="stat-card"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
          >
            <div className="stat-card-num" style={{ color: s.color }}>{s.value}</div>
            <div className="stat-card-label">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {stats.total > 0 ? (
        <div className="charts-row">
          <div className="chart-box">
            <div className="chart-label">Distribution</div>
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={42} outerRadius={65} paddingAngle={3} dataKey="value">
                  {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={TOOLTIP_STYLE} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {barData.length > 1 && (
            <div className="chart-box">
              <div className="chart-label">Confidence History</div>
              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={barData} barSize={12}>
                  <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} width={28} />
                  <Tooltip contentStyle={TOOLTIP_STYLE} formatter={v => [`${v}%`, 'Confidence']} />
                  <Bar dataKey="confidence" radius={[4,4,0,0]}>
                    {barData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      ) : (
        <div className="stats-empty">
          <span>📊</span>
          <p>Analyze news to see stats here</p>
        </div>
      )}
    </motion.div>
  );
}
