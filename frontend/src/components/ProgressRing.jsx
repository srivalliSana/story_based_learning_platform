import React, { useEffect, useRef } from 'react';

const ProgressRing = ({ progress, size = 80, strokeWidth = 4, color = 'var(--primary)' }) => {
  const circleRef = useRef(null);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  useEffect(() => {
    const circle = circleRef.current;
    if (circle) {
      const offset = circumference - (progress / 100) * circumference;
      circle.style.strokeDashoffset = offset;
    }
  }, [progress, circumference]);

  return (
    <div className="progress-ring" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--bg-subtle)"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          ref={circleRef}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          style={{
            transition: 'stroke-dashoffset var(--transition-slow)',
          }}
        />
      </svg>
      <div className="progress-ring-text">
        {Math.round(progress)}%
      </div>
    </div>
  );
};

export default ProgressRing;
