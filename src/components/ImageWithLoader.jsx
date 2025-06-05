import { useState } from 'react';

export default function ImageWithLoader(props) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div
      className={
        loaded
          ? ''
          : 'loading-skeleton relative flex items-center justify-center'
      }
    >
      {!loaded && <div className="spinner" aria-hidden="true"></div>}
      <img
        {...props}
        onLoad={() => setLoaded(true)}
        style={loaded ? {} : { visibility: 'hidden' }}
      />
    </div>
  );
}
