import { useEffect } from 'react';

const useInfiniteScroll = (onLoadMore) => {
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        onLoadMore();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onLoadMore]);
};

export default useInfiniteScroll;