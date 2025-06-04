import React, { useState } from 'react';
import Fuse from 'fuse.js';
import { posts } from '../posts';

const fuse = new Fuse(posts, { keys: ['title'], includeScore: true });

export default function Search() {
  const [query, setQuery] = useState('');
  const results = query ? fuse.search(query).map(r => r.item) : posts;

  return (
    <div>
      <input
        aria-label="search"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search posts"
        className="border p-2 mb-2"
      />
      <ul>
        {results.map(p => (
          <li key={p.slug}>{p.title}</li>
        ))}
      </ul>
    </div>
  );
}
