import { useLayoutEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';

const LayoutEffectComponent = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const el = useRef();

  useLayoutEffect(() => {
    setWidth(el.current.clientWidth);
    setHeight(el.current.clientHeight);
  }, [width, height]);

  return (
    <div>
      <h2>textarea width: {width}px</h2>
      <h2>textarea height: {height}px</h2>
      <textarea ref={el}
        onClick={() => {
          setWidth(0); // this is basically saying "force update"
        }}/>
    </div>
  );
};

export default LayoutEffectComponent;
