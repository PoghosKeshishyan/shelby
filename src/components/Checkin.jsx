import { useEffect, useState } from 'react'

export function Checkin({ checkin, setCheckin, bookingPageLabel }) {
  const [minValue, setMinValue] = useState('');

  useEffect(() => {
    let date = new Date();
    let str = date.getFullYear() + '-' + 
              ((date.getMonth() + 1) > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)) 
              + '-' + ((date).getDate() > 9 ? date.getDate() : '0' + (date.getDate()));
    setMinValue(str);
  }, []);

  return (
    <div>
        <p>{bookingPageLabel[0]?.checkIn}</p>
        <input min={minValue} type='date' value={checkin} onChange={(e) => setCheckin(e.target.value)} />
    </div>
  )
}
