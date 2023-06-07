import { useEffect, useState } from 'react';

export function Checkout({ checkout, setCheckout, bookingPageLabel }) {
  const [minValue, setMinValue] = useState('');

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]; 
    setMinValue(today); 
  }, []);

  return (
    <div>
        <p>{bookingPageLabel[0]?.checkOut}</p>
        <input id='checkout' type='date' min={minValue} value={checkout} onChange={(e) => setCheckout(e.target.value)} />
    </div>
  )
}
