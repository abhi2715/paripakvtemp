'use client';

/**
 * Official UN Sustainable Development Goals Colour Wheel
 * Used WITHOUT the UN emblem, per UN usage guidelines for non-UN entities.
 * https://www.un.org/sustainabledevelopment/news/communications-material/
 */
export default function SDGWheel({ size = 200 }) {
  // Official SDG colours for each of the 17 goals (in order)
  const goals = [
    { num: 1,  color: '#E5243B', label: 'No Poverty' },
    { num: 2,  color: '#DDA63A', label: 'Zero Hunger' },
    { num: 3,  color: '#4C9F38', label: 'Good Health and Well-being' },
    { num: 4,  color: '#C5192D', label: 'Quality Education' },
    { num: 5,  color: '#FF3A21', label: 'Gender Equality' },
    { num: 6,  color: '#26BDE2', label: 'Clean Water and Sanitation' },
    { num: 7,  color: '#FCC30B', label: 'Affordable and Clean Energy' },
    { num: 8,  color: '#A21942', label: 'Decent Work and Economic Growth' },
    { num: 9,  color: '#FD6925', label: 'Industry, Innovation and Infrastructure' },
    { num: 10, color: '#DD1367', label: 'Reduced Inequalities' },
    { num: 11, color: '#FD9D24', label: 'Sustainable Cities and Communities' },
    { num: 12, color: '#BF8B2E', label: 'Responsible Consumption and Production' },
    { num: 13, color: '#3F7E44', label: 'Climate Action' },
    { num: 14, color: '#0A97D9', label: 'Life Below Water' },
    { num: 15, color: '#56C02B', label: 'Life on Land' },
    { num: 16, color: '#00689D', label: 'Peace, Justice and Strong Institutions' },
    { num: 17, color: '#19486A', label: 'Partnerships for the Goals' },
  ];

  const cx = 100;
  const cy = 100;
  const outerR = 90;
  const innerR = 48;
  const segmentAngle = (2 * Math.PI) / 17;
  const gap = 0.008; // tiny gap between segments

  const segments = goals.map((goal, i) => {
    const startAngle = i * segmentAngle - Math.PI / 2 + gap;
    const endAngle = (i + 1) * segmentAngle - Math.PI / 2 - gap;

    const x1 = cx + outerR * Math.cos(startAngle);
    const y1 = cy + outerR * Math.sin(startAngle);
    const x2 = cx + outerR * Math.cos(endAngle);
    const y2 = cy + outerR * Math.sin(endAngle);
    const x3 = cx + innerR * Math.cos(endAngle);
    const y3 = cy + innerR * Math.sin(endAngle);
    const x4 = cx + innerR * Math.cos(startAngle);
    const y4 = cy + innerR * Math.sin(startAngle);

    const path = [
      `M ${x1} ${y1}`,
      `A ${outerR} ${outerR} 0 0 1 ${x2} ${y2}`,
      `L ${x3} ${y3}`,
      `A ${innerR} ${innerR} 0 0 0 ${x4} ${y4}`,
      'Z',
    ].join(' ');

    return (
      <path
        key={goal.num}
        d={path}
        fill={goal.color}
        stroke="none"
      >
        <title>SDG {goal.num}: {goal.label}</title>
      </path>
    );
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="United Nations Sustainable Development Goals Colour Wheel"
      style={{ display: 'block' }}
    >
      {segments}
    </svg>
  );
}
