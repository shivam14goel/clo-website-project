// // App.jsx
// import React, { useEffect, useState } from 'react';
// import FilterPanel from './components/FilterPanel';
// import SearchBar from './components/SearchBar';
// import ContentCard from './components/ContentCard';
// import useInfiniteScroll from './hooks/useInfiniteScroll';
// import './App.css';

// const API_URL = 'https://closet-recruiting-api.azurewebsites.net/api/data';

// function App() {
//   const [items, setItems] = useState([]);
//   const [filteredItems, setFilteredItems] = useState([]);
//   const [filters, setFilters] = useState({ Paid: false, Free: false, ViewOnly: false });
//   const [searchTerm, setSearchTerm] = useState('');
//   const [page, setPage] = useState(1);

//   useEffect(() => {
//     const url = new URL(window.location);
//     const search = url.searchParams.get('q') || '';
//     const paid = url.searchParams.get('paid') === 'true';
//     const free = url.searchParams.get('free') === 'true';
//     const viewOnly = url.searchParams.get('viewOnly') === 'true';

//     setSearchTerm(search);
//     setFilters({ Paid: paid, Free: free, ViewOnly: viewOnly });
//   }, []);


//   useEffect(() => {
//     fetch(API_URL)
//       .then((res) => res.json())
//       .then((data) => {
//         setItems(data);
//       });
//   }, []);


//   useEffect(() => {
//     if (items.length === 0) return;

//     applyFilters();

//     const url = new URL(window.location);
//     url.searchParams.set('q', searchTerm);
//     url.searchParams.set('paid', filters.Paid);
//     url.searchParams.set('free', filters.Free);
//     url.searchParams.set('viewOnly', filters.ViewOnly);
//     window.history.replaceState(null, '', url);
//   }, [filters, searchTerm, items]);



//   const applyFilters = () => {
//     let results = [...items];
//     results = results.filter(
//       (item) =>
//         (item.title && item.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
//         (item.creator && item.creator.toLowerCase().includes(searchTerm.toLowerCase()))
//     );


//     const activeFilters = Object.entries(filters)
//       .filter(([key, value]) => value)
//       .map(([key]) => key);

//     if (activeFilters.length > 0) {
//       results = results.filter((item) => {
//         if (item.pricingOption === 0 && activeFilters.includes('Paid')) return true;
//         if (item.pricingOption === 1 && activeFilters.includes('Free')) return true;
//         if (item.pricingOption === 2 && activeFilters.includes('ViewOnly')) return true;
//         return false;
//       });
//     }

//     if (searchTerm.trim()) {
//       const keywords = searchTerm.toLowerCase().trim().split(/\s+/);
//       results = results.filter((item) => {
//         const text = `${item.title || ''} ${item.creator || ''}`.toLowerCase();
//         return keywords.every((kw) => text.includes(kw));
//       });
//     }
//     setFilteredItems(results);
//   };

//   useInfiniteScroll(() => {
//     setPage((prev) => prev + 1);
//   });

//   const visibleItems = filteredItems.slice(0, page * 12); // 12 items per page

//   return (
//     <div className="app-container">
//       <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
//       <FilterPanel filters={filters} setFilters={setFilters} resetFilters={() => setFilters({ Paid: false, Free: false, ViewOnly: false })} />
//       <div className="grid">
//         {visibleItems.map((item, idx) => (
//           <ContentCard key={idx} item={item} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;


// App.jsx
import React, { useEffect, useState } from 'react';
import FilterPanel from './components/FilterPanel';
import SearchBar from './components/SearchBar';
import ContentCard from './components/ContentCard';
import useInfiniteScroll from './hooks/useInfiniteScroll';
import './App.css';

const API_URL = 'https://closet-recruiting-api.azurewebsites.net/api/data';

function App() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [filters, setFilters] = useState({ Paid: false, Free: false, ViewOnly: false });
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

  // Load filters & searchTerm from URL
  useEffect(() => {
    const url = new URL(window.location);
    const search = decodeURIComponent(url.searchParams.get('q') || '');
    const paid = url.searchParams.get('paid') === 'true';
    const free = url.searchParams.get('free') === 'true';
    const viewOnly = url.searchParams.get('viewOnly') === 'true';
    setSearchTerm(search);
    setFilters({ Paid: paid, Free: free, ViewOnly: viewOnly });
  }, []);

  // Load data
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
      });
  }, []);

  // Apply filters and search whenever items/filters/searchTerm change
  useEffect(() => {
    if (items.length === 0) return;

    applyFilters();

    const url = new URL(window.location);
    url.searchParams.set('q', searchTerm);
    url.searchParams.set('paid', filters.Paid);
    url.searchParams.set('free', filters.Free);
    url.searchParams.set('viewOnly', filters.ViewOnly);
    window.history.replaceState(null, '', url);
  }, [filters, searchTerm, items]);

  const applyFilters = () => {
    let results = [...items];

    const activeFilters = Object.entries(filters)
      .filter(([key, value]) => value)
      .map(([key]) => key);

    if (activeFilters.length > 0) {
      results = results.filter((item) => {
        if (item.pricingOption === 0 && activeFilters.includes('Paid')) return true;
        if (item.pricingOption === 1 && activeFilters.includes('Free')) return true;
        if (item.pricingOption === 2 && activeFilters.includes('ViewOnly')) return true;
        return false;
      });
    }

    // Keyword search (matches title or creator, each word separately)
    if (searchTerm.trim()) {
      const keywords = searchTerm.toLowerCase().trim().split(/\s+/);
      results = results.filter((item) => {
        const text = `${item.title || ''} ${item.creator || ''}`.toLowerCase();
        return keywords.every((kw) => text.includes(kw));
      });
    }

    setFilteredItems(results);
  };

  useInfiniteScroll(() => {
    setPage((prev) => prev + 1);
  });

  const visibleItems = filteredItems.slice(0, page * 12); // 12 items per page

  return (
    <div className="app-container">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <FilterPanel
        filters={filters}
        setFilters={setFilters}
        resetFilters={() => setFilters({ Paid: false, Free: false, ViewOnly: false })}
      />
      <div className="grid">
        {visibleItems.map((item, idx) => (
          <ContentCard key={idx} item={item} />
        ))}
      </div>
    </div>
  );
}

export default App;
