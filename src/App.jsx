import React, { useState } from 'react';
import { posts } from './posts';
import Search from './components/Search.jsx';

export default function App() {
  const [selected, setSelected] = useState(null);
  const PostComponent = selected ? selected.component : null;

  return (
    <div className="p-4">
      <h1 className="text-3xl mb-4">Ferox Blog</h1>
      <Search />
      <ul className="space-y-2 my-4">
        {posts.map(p => (
          <li key={p.slug}>
            <button className="text-blue-500" onClick={() => setSelected(p)}>
              {p.title}
            </button>
          </li>
        ))}
      </ul>
      {PostComponent && (
        <article className="prose prose-invert">
          <PostComponent />
        </article>
      )}
    </div>
  );
}
