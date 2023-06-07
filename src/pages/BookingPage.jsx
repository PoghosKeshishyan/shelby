import { useEffect, useState, useRef } from 'react';
import { SearchCountry } from '../components/SearchCountry';
import { Checkin } from '../components/Checkin';
import { Checkout } from '../components/Checkout';
import { Adults } from '../components/Adults';
import { Children } from '../components/Children';
import { ChildAge } from '../components/ChildAge';
import { Rooms } from '../components/Rooms';
import { Tour } from '../components/Tour';
import axios from '../axios';
import '../scss/BookingPage.scss';

export function BookingPage() {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [dropdown, setDropDown] = useState(false);
  const controlCheckPersonRef = useRef(null);
  const [countries, setCountries] = useState([]);
  const [bookingPageLabel, setBookingPageLabel] = useState({});
  const [tours, setTours] = useState([]);
  const [adults, setAdults] = useState('1');
  const [rooms, setRooms] = useState('1');
  const [children, setChildren] = useState('0');
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');
  const [childrenAge, setChildrenAge] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [tableShow, setTableShow] = useState(false);
  const [result, setResult] = useState({});

  useEffect(() => {
    loadingData();
    window.scrollTo(0, 0);
    window.addEventListener("mousedown", handleClickOutSide);
    setCurrentLanguage(localStorage.getItem('shelby-Language'));
  }, [currentLanguage]);

  useEffect(() => {
    let arr = [];

    for (let i = 0; i < +children; i++) {
      arr.push(i);
    }

    setChildrenAge(arr);
  }, [children]);

  async function loadingData() {
    const countriesData = await axios.get(`city?lang=${currentLanguage}`);
    setCountries(countriesData.data);

    const bookingPageLabelData = await axios.get(`booking_page_label?lang=${currentLanguage}`);
    setBookingPageLabel(bookingPageLabelData.data);

    if (sessionStorage.getItem('shelbyBookingPage')) {
      loadDataInSessionStorage();
    }
  }

  const handleClickOutSide = (e) => {
    try {
      if (!controlCheckPersonRef.current.contains(e.target)) setDropDown(false);
    } catch { }
  }

  const closeTableHandler = () => {
    sessionStorage.clear();
    setTableShow(false);
    setSelectedCountry('');
    setCheckin('');
    setCheckout('');
    setRooms('1');
    setAdults('1');
    setChildren('0');
  }

  const loadDataInSessionStorage = async () => {
    const result = JSON.parse(sessionStorage.getItem('shelbyBookingPage'));
    await setSelectedCountry(result.selectedCountry);
    await setCheckin(result.checkin);
    await setCheckout(result.checkout);
    await setRooms(result.rooms);
    await setAdults(result.adults);
    await setChildren(result.children);
    await setChildrenAge(JSON.parse(result.childageArr));

    setTimeout(() => {
      const childageArr = document.querySelectorAll('.childage-container .childeAge');
      const childAgeInSession = JSON.parse(result.childageArr);

      for (let i = 0; i < childageArr.length; i++) {
        childageArr[i].value = childAgeInSession[i];
      }
    }, 500)

    setResult({
      selectedCountry: result.selectedCountry,
      checkin: result.checkin,
      checkout: result.checkout,
      rooms: result.rooms,
      adults: result.adults,
      children: result.children,
      childageArr: result.childageArr
    })

    const toursData = await axios.get(`tour?lang=${currentLanguage}`);
    setTours(toursData.data);

    setTableShow(true);
  }

  const submitSearchPackages = async () => {
    if (!selectedCountry || !checkin || !checkout) {
      return alert('Все поля обязательны.');
    }
    
    const childageArr = document.querySelectorAll('.childage-container .childeAge');
    const ages = [];
    
    for (let i = 0; i < childageArr.length; i++) {
      if(childageArr[i].value === bookingPageLabel[0].childrenAge) {
        return alert('Укажите возраст детей.');
      }

      ages.push(childageArr[i].value);
    }

    const toursData = await axios.get(`tour/city?lang=${currentLanguage}&city=${selectedCountry}`)
    setTours(toursData.data);

    setResult({
      selectedCountry,
      checkin,
      checkout,
      rooms,
      adults,
      children,
      childageArr: JSON.stringify(ages)
    })

    sessionStorage.setItem('shelbyBookingPage', JSON.stringify({
      selectedCountry,
      checkin,
      checkout,
      rooms,
      adults,
      children,
      childageArr: JSON.stringify(ages)
    }))

    setTableShow(true);
  }

  return (
    <div className='BookingPage'>
      <div className='background'></div>

      <div className='search'>
        <div className='check-country'>
          <SearchCountry
            countries={countries}
            selectedCountry={selectedCountry}
            bookingPageLabel={bookingPageLabel}
            setSelectedCountry={setSelectedCountry}
          />
        </div>

        <div className='check-date'>
          <Checkin checkin={checkin} setCheckin={setCheckin} bookingPageLabel={bookingPageLabel} />
          <Checkout checkout={checkout} setCheckout={setCheckout} bookingPageLabel={bookingPageLabel} />
        </div>

        <div className='check-person' ref={controlCheckPersonRef} onClick={() => setDropDown(true)}>
          <p className='title'>
            <span>{rooms}</span> {bookingPageLabel[0]?.rooms}
          </p>

          <p className='circle'></p>

          <p className='title'>
            <span>{adults}</span> {bookingPageLabel[0]?.adults}
          </p>

          <p className='circle'></p>

          <p className='title'>
            <span>{children}</span> {bookingPageLabel[0]?.children}
          </p>

          <div className={dropdown ? 'controlCheckPerson activeCheckPerson' : 'controlCheckPerson'}>
            <Rooms rooms={rooms} setRooms={setRooms} bookingPageLabel={bookingPageLabel} />
            <Adults adults={adults} setAdults={setAdults} bookingPageLabel={bookingPageLabel} />
            <Children children={children} setChildren={setChildren} bookingPageLabel={bookingPageLabel} />

            {
              children > 0 && <div className='childage-container'>
                {childrenAge.map((el, index) => <ChildAge key={index} bookingPageLabel={bookingPageLabel} />)}
              </div>
            }
          </div>
        </div>

        <button onClick={submitSearchPackages}>SEARCH</button>
      </div>

      {
        tableShow &&
        <div className='tours-container'>
          <i className="fa-solid fa-xmark closeTable" onClick={closeTableHandler}></i>

          <div className='tours'>
            <table>
              <thead>
                <tr>
                  {
                    bookingPageLabel && bookingPageLabel[0].table_headings.split('/')
                      .map((el, index) => <th key={index}>{el}</th>)
                  }
                </tr>
              </thead>

              <tbody>
                {
                  tours.map((el, index) => <Tour 
                    {...el} 
                    key={el.id} 
                    index={index} 
                    selectedDataFromUser={result} 
                  />)
                }
              </tbody>
            </table>
          </div>
        </div>
      }
    </div>
  )
}
