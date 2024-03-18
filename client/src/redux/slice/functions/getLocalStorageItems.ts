const getLocalStorageItems = () => {
  const data = localStorage.getItem('items');
  return data ? JSON.parse(data) : [];
};

export default getLocalStorageItems;
