import './SkeletonGrid.css';

const HEIGHTS = [280, 380, 240, 340, 300, 420, 260, 320, 370, 280, 360, 300];

export default function SkeletonGrid({ count = 12 }) {
  return (
    <div className="sk-root">
      <div className="sk-grid">
        {Array.from({ length: count }, (_, i) => (
          <div
            key={i}
            className="sk-item"
            style={{ height: HEIGHTS[i % HEIGHTS.length] }}
          />
        ))}
      </div>
    </div>
  );
}
