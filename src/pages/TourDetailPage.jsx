import { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import '../scss/TourDetailPage.scss';
import axios from '../axios';

export function TourDetailPage() {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [tour, setTour] = useState({});
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [queryData, setQueryData] = useState({});
  const [searchParams] = useSearchParams();
  const [tourdetailPageLabel, setTourdetailPageLabel] = useState({});
  const [tabelData, setTabelData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOnFormSuccess, setModalOnFormSuccess] = useState(false);
  const [modalOnFormError, setModalOnFormError] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadingData();
    window.scrollTo(0, 0);
    setCurrentLanguage(localStorage.getItem('shelby-Language'));
  }, [currentLanguage]);

  async function loadingData() {
    const tourSingleData = await axios.get(`tour/${id}`);
    setTour(tourSingleData.data);

    const tourdetailPageLabelData = await axios.get(`tourdetail_page_label?lang=${currentLanguage}`);
    setTourdetailPageLabel(tourdetailPageLabelData.data);

    const tableDataSplit = tourdetailPageLabelData?.data[0]?.tableData.split('/');
    setTabelData(tableDataSplit);

    setQueryData({
      selectedCountry: searchParams.get('selectedCountry') || '',
      checkin: searchParams.get('checkin') || '',
      checkout: searchParams.get('checkout') || '',
      rooms: searchParams.get('rooms') || '',
      adults: searchParams.get('adults') || '',
      children: searchParams.get('children') || '',
      childageArr: searchParams.get('childageArr') || '',
    });

    setLoading(true);
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    try {

      await axios.post('booking/add', {
        email,
        phone,
        name: tour.name,
        selectedCity: queryData.selectedCountry,
        hotel: tour.hotel,
        transport_depart: tour.transport_depart,
        transport_arrive: tour.transport_arrive,
        checkin: queryData.checkin,
        checkout: queryData.checkout,
        rooms: queryData.rooms,
        adults: queryData.adults,
        children: queryData.children,
        childageArr: queryData.childageArr,
        city: tour.city,
        isValid: 'Yes',
      });

      setModalOnFormSuccess(true);
      setTimeout(() => navigate('/booking'), 5000);

    } catch (e) {
      setModalOnFormError(true)
    }
  }

  return (
    <>
      <div className='background'></div>

      <div className='TourDetailPage'>

        <div className="modal-btns">
          {
            modalOnFormSuccess && <div className="onFormSuccess">
              <i className="fa-regular fa-circle-check" />
              <h3>{tourdetailPageLabel[0]?.onFormSuccess}</h3>
            </div>
          }

          {
            modalOnFormError && <div className="onFormError">
              <i
                onClick={() => setModalOnFormError(false)}
                className="fa-regular fa-circle-xmark"
              />

              <h3>{tourdetailPageLabel[0]?.onFormError}</h3>
            </div>
          }
        </div>

        <button onClick={() => navigate(-1)}>
          <i className='fa-solid fa-arrow-left'></i>
        </button>

        {
          tabelData && <table>
            <thead>
              <tr>
                <th>{tourdetailPageLabel[0]?.tableHead.split('/')[0]}</th>
                <th>{tourdetailPageLabel[0]?.tableHead.split('/')[1]}</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>{tabelData[0]}</td>
                <td>{tour.name}</td>
              </tr>

              <tr>
                <td>{tabelData[1]}</td>
                <td>{queryData.selectedCountry}</td>
              </tr>

              <tr>
                <td>{tabelData[2]}</td>
                <td>{tour.hotel}</td>
              </tr>

              <tr>
                <td>{tabelData[3]}</td>
                <td>{tour.transport_depart}</td>
              </tr>

              <tr>
                <td>{tabelData[4]}</td>
                <td>{tour.transport_arrive}</td>
              </tr>

              <tr>
                <td>{tabelData[5]}</td>
                <td>{queryData.checkin}</td>
              </tr>

              <tr>
                <td>{tabelData[6]}</td>
                <td>{queryData.checkout}</td>
              </tr>

              <tr>
                <td>{tabelData[7]}</td>
                <td>{queryData.rooms}</td>
              </tr>

              <tr>
                <td>{tabelData[8]}</td>
                <td>{queryData.adults}</td>
              </tr>

              {
                queryData.children !== '0' && <tr>
                  <td>{tabelData[9]}</td>
                  <td>{queryData.children}</td>
                </tr>
              }

              {
                loading && queryData.children > 0 && <tr>
                  <td>{tabelData[10]}</td>
                  <td>{JSON.parse(queryData.childageArr).join(', ')}</td>
                </tr>
              }
            </tbody>
          </table>
        }

        <form onSubmit={submitHandler}>
          <input
            required
            type='tel'
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder={tourdetailPageLabel[0]?.formPlaceholders.split('/')[0]}
          />

          <input
            required
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder={tourdetailPageLabel[0]?.formPlaceholders.split('/')[1]}
          />

          <input
            type='submit'
            className='submit'
            value={`${tourdetailPageLabel[0]?.btn_text}  -  ${tour.price}`}
          />
        </form>
      </div>
    </>
  )
}
