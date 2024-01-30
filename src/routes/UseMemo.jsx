import { useEffect } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';

import fibonacci from '../useExpensiveMathOperation';

export default function UseMemo() {
  const [count, setCount] = useState(35);
  const [left, setLeft] = useState(0);
  const value = useMemo(() => fibonacci(count), [count]);

  useEffect(() => {
    requestAnimationFrame(animate);

    function animate() {
      setLeft(left + 1);
    }
  }, [left]);

  return (
    <div>
      <div style={{ left: `${Math.sin(left * 0.05) * 100 + 100}px` }}
        className="ball">
      </div>
      <h2>
        Count: {count}
        <button onClick={() => setCount(count + 1)}>+</button>
      </h2>
      <h2>Result of an expensive math computation: {value}</h2>
    </div>
  );
}
