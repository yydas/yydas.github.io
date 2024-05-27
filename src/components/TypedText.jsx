import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

const TypedText = () => {
  const el = useRef(null);

  useEffect(() => {
    const options = {
      strings: [
        "这是第一个打字效果。",
        "这是第二个打字效果。",
        "这是第三个打字效果。"
      ],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true,
    };

    const typed = new Typed(el.current, options);

    return () => {
      // 销毁 Typed 实例防止内存泄漏
      typed.destroy();
    };
  }, []);

  return <span className="typed-element dark:text-white" ref={el}></span>;
};

export default TypedText;