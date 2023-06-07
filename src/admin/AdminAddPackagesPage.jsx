import React, { useEffect, useState } from 'react'
import axios from '../axios';
import '../scss/AdminAddPackagesPage.scss'

export function AdminAddPackagesPage() {
  const [countries, setCountries] = useState([]);

  const [data, setData] = useState({
    lang: 'en',
    name: '',
    city: 'selectCountry',
    hotel: '',
    transport_depart: '',
    transport_arrive: '',
    price: '',
    btn_text: '',
  })

  useEffect(() => {
    loadingData();
  }, [data])

  async function loadingData() {
    const response = await axios.get(`city?lang=${data.lang}`);
    setCountries(response.data);
  }

  const onChangeInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    if (data.city === 'selectCountry') {
      return alert('Լրացրեք Country դաշտը:');
    }

    await axios.post('tour/add', data);

    setData({ 
      name: '', 
      hotel: '', 
      transport_arrive: '',
      transport_depart: '', 
      lang: 'en', 
      city: 'selectCountry', 
      price: '',
      btn_text: '',
    });
  }

  return (
    <div className='AdminAddPackagesPage'>
      <div className='backgroundAdmin'>Ավելացնել փաթեթ</div>

      <form onSubmit={submitHandler}>
        <div className='inner'>
          <div className='inputBox'>
            <select name='city' defaultValue={'selectCountry'} onChange={onChangeInput}>
              <option value="selectCountry" disabled>Select country *</option>
              {countries.map((el) => <option value={el.name} key={el.id}>{el.name}</option>)}
            </select>
          </div>

          <div className='inputBox'>
            <select name='lang' onChange={onChangeInput}>
              <option value="en">En</option>
              <option value="ru">Ru</option>
              <option value="am">Am</option>
            </select>
          </div>
        </div>

        <div className='inner'>
          <div className='inputBox'>
            <p>Name *</p>
            <input type='text' name='name' value={data.name} onChange={onChangeInput} required />
          </div>

          <div className='inputBox'>
            <p>Hotel *</p>
            <input type='text' name='hotel' value={data.hotel} onChange={onChangeInput} required />
          </div>
        </div>

        <div className='inner'>
          <div className="inputBox">
            <p>Transport depart *</p>
            <input type='text' value={data.transport_depart} onChange={onChangeInput} name='transport_depart' required />
          </div>

          <div className="inputBox">
            <p>Transport arrive *</p>
            <input type='text' value={data.transport_arrive} onChange={onChangeInput} name='transport_arrive' required />
          </div>
        </div>

        <div className='inner'>
          <div className="inputBox">
            <p>Price *</p>
            <input type='text' value={data.price} onChange={onChangeInput} name='price' required />
          </div>

          <div className="inputBox">
            <p>Action *</p>
            <input type='text' value={data.btn_text} onChange={onChangeInput} name='btn_text' required />
          </div>
        </div>

        <input type='submit' value='Ավելացնել փաթեթ' />
      </form>
    </div>
  )
}
