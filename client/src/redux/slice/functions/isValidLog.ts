const isValidLog = (users:any, pay:string) => {
  const every = users.every((elem:any) => {
    const arr = elem.split(' ');
    const payload = pay.split(' ');
    return arr[0] !== payload[0];
  });
  return every;
};

export default isValidLog;
