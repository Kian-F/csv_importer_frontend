const handleSort = (key) => {
  if (sortKey === key) {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  } else {
    setSortKey(key);
    setSortOrder('asc');
  }
}

export default handleSort
