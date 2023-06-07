import { useEffect, useState } from 'react'

export function Checkout({ checkout, setCheckout, bookingPageLabel }) {
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
        <p>{bookingPageLabel[0]?.checkOut}</p>
        <input id='checkout' type='date' min={minValue} value={checkout} onChange={(e) => setCheckout(e.target.value)} />
    </div>
  )
}
