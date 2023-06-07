import { useEffect, useState } from 'react';
import '../scss/AdminBookingPage.scss';
import axios from '../axios';

export function AdminBookingPage() {
  const [allReservation, setAllReservation] = useState([]);
  const [filteredReservation, setFilteredReservation] = useState([]);
  const [date, setDate] = useState('');

  useEffect(() => {
    loadingData()
  }, [])

  async function loadingData() {
    const response = await axios.get('booking');
    setAllReservation(response.data);
    setFilteredReservation(response.data);
  }

  const handlerAllBtn = () => {
    setFilteredReservation(allReservation);
    setDate('');
  }

  const handlerSearchBtn = () => {
    const newReservation = allReservation.filter(el => el.checkin === date)
    setFilteredReservation(newReservation);
  }

  const onChangeInputRadio = async (id) => {
    let isValidElement;

    const newReservation = filteredReservation.map(el => {
      if (el.id === id) {
        if (el.isValid === 'No') {
          el.isValid = 'Yes'
          isValidElement = el;
        } else {
          el.isValid = 'No';
          isValidElement = el;
        }
      }

      return el;
    })

    setFilteredReservation(newReservation);
    await axios.put(`booking/edit/${id}`, isValidElement);
  }

  return (
    <div className='AdminBookingPage'>
      <div className='backgroundAdmin'>Ամրագրված Տոմսեր</div>

      <div className='selectDate'>
        <p>Ընտրել ամսաթիվը</p>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        <button onClick={handlerSearchBtn}>Փնտրել</button>
        <button onClick={handlerAllBtn}>Ցույց տալ բոլորը</button>
      </div>

      <div className="container">
        {
          filteredReservation.map((el, index) => (
            <form className={el.isValid === 'Yes' ? 'active' : ''} key={el.id}>
              <table>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Hotel</th>
                    <th>Transport depart</th>
                    <th>Transport arrive</th>
                    <th>Selected country</th>
                    <th>Check In-Date</th>
                    <th>Check Out-Date</th>
                    <th>Rooms</th>
                    <th>Adults</th>
                    <th>Children</th>
                    <th>Child age</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>{el.id}</td>
                    <td>{el.name}</td>
                    <td>{el.email}</td>
                    <td>{el.phone}</td>
                    <td>{el.hotel}</td>
                    <td>{el.transport_depart}</td>
                    <td>{el.transport_arrive}</td>
                    <td>{el.city}</td>
                    <td>{el.checkin}</td>
                    <td>{el.checkout}</td>
                    <td>{el.rooms}</td>
                    <td>{el.adults}</td>
                    <td>{el.children}</td>
                    <td>{el.childageArr.split('/').join(', ')}</td>
                  </tr>
                </tbody>
              </table>

              <div className={el.isValid === 'Yes' ? 'validation activeValide' : 'validation'}>
                <span className='indexElem'> {index < 9 ? `0${index + 1}` : index + 1} |</span>

                <label>
                  Valid
                  <input type="radio" checked={
                    el.isValid === 'Yes' ? true : false
                  } onChange={() => onChangeInputRadio(el.id)} name="isValid" />
                </label>

                <label>
                  Invalid
                  <input type="radio" checked={
                    el.isValid === 'Yes' ? false : true
                  } onChange={() => onChangeInputRadio(el.id)} name="isValid" />
                </label>
              </div>
            </form>
          ))
        }
      </div>
    </div>
  )
}