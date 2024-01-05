import React, { useEffect, useRef, ReactNode } from 'react';

type ObserverProps = {
  children: ReactNode;
  onContentEndVisible: () => void;
}

export function Observer({ children, onContentEndVisible }: ObserverProps) {
  const endContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const options: IntersectionObserverInit = {
      rootMargin: '0px',
      threshold: 1.0,
      root: null,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onContentEndVisible();
          observer.disconnect();
        }
      });
    }, options);

    if (endContentRef.current) {
      observer.observe(endContentRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [onContentEndVisible]);

  return (
    <div ref={endContentRef}>
      {children}
      <div />
    </div>
  );
}
