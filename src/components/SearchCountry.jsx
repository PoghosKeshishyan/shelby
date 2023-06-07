import { useEffect } from 'react';
import { useState, useRef } from 'react';

export function SearchCountry({ countries, selectedCountry, bookingPageLabel, setSelectedCountry }) {
  const [dropdown, setDropDown] = useState(false);
  const bookingRef = useRef(null);

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutSide);
  }, [])

  const onChangeInput = (e) => {
    setSelectedCountry(e.target.value);

    if (selectedCountry.length > 1 && countryIncludes()) {
      setDropDown(true);
    } else {
      setDropDown(false);
    }
  }

  const handleClickOutSide = (e) => {
    try {
      if (!bookingRef.current.contains(e.target)) setDropDown(false);
    } catch { }
  }

  const handeClickListItem = async (name) => {
    await setDropDown(false);
    setSelectedCountry(name);
  }

  const countryIncludes = () => {
    for (let i = 0; i < countries.length; i++) {
      let inputValue = selectedCountry.toLowerCase();

      if (countries[i].name.toLowerCase().includes(inputValue)) {
        setDropDown(true);
        return true;
      }
    }

    return false;
  }

  return (
    <div className='SearchCountry' ref={bookingRef}>
      <div className='searchBar'>
        <i className='fa-solid fa-hotel'></i>

        <input type='search'
          value={selectedCountry}
          onChange={onChangeInput}
          onClick={() => setDropDown(true)}
          placeholder={bookingPageLabel[0]?.inputPlaceholder} />
      </div>

      <ul className={dropdown ? 'activeUl' : ''}>
        {
          countries
            .filter(el => el.name.toLowerCase().includes(selectedCountry.toLowerCase()))
            .map(el => <li key={el.id} onClick={() => handeClickListItem(el.name)}>
              <i className="fa-solid fa-location-dot"></i>
              {el.name}
            </li>)
        }
      </ul>
    </div>
  )
}
