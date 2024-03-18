const getCurrentUserFind = () => {
  const data = localStorage.getItem('currentUser');
  return data || '';
};

export const getLoginImage = () => {
  const data = localStorage.getItem('loginImage');
  return data || '';
};

export const validLogin = (items:any, action:string) => {
  return items.includes(action);
};

export default getCurrentUserFind;
