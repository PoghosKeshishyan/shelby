import { useEffect, useState } from 'react'
import { Slider } from '../components/Slider';
import { HotTours } from '../components/HotTours';
import { OurRatings } from '../components/OurRatings';
import { MainTours } from '../components/MainTours';
import { DemandedTours } from '../components/DemandedTours';
import { ScrollTop } from '../components/ScrollTop';
import axios from '../axios';

export function HomePage() {
    const [currentLanguage, setCurrentLanguage] = useState('en');
    const [homePageLabel, setHomePageLabel] = useState({});
    const [slider, setSlider] = useState([]);
    const [hotTours, setHotTours] = useState([]);
    const [ourRatings, setOurRatings] = useState([]);
    const [mainTours, setMainTours] = useState([]);
    const [demandedTours, setDemandedTours] = useState([]);

    useEffect(() => {
        loadingData();
        window.scrollTo(0, 0);
        setCurrentLanguage(localStorage.getItem('shelby-Language'));
    }, [currentLanguage])

    async function loadingData() {
        const homePageLabelData = await axios.get(`home_page_label?lang=${currentLanguage}`);
        setHomePageLabel(homePageLabelData.data);

        const sliderData = await axios.get(`slider?lang=${currentLanguage}`);
        setSlider(sliderData.data);

        const hotToursData = await axios.get(`hottour?lang=${currentLanguage}`);
        setHotTours(hotToursData.data);

        const ourRatingsData = await axios.get(`ourrating?lang=${currentLanguage}`);
        setOurRatings(ourRatingsData.data);

        const mainToursData = await axios.get(`maintour?lang=${currentLanguage}`);
        setMainTours(mainToursData.data);

        const demandedToursData = await axios.get(`demandedtour?lang=${currentLanguage}`);
        setDemandedTours(demandedToursData.data);
    }

    return (
        <div className='HomePage'>
            <Slider slider={slider} />
            <HotTours hotTours={hotTours} homePageLabel={homePageLabel} />
            <OurRatings ourRatings={ourRatings} homePageLabel={homePageLabel} />
            <MainTours mainTours={mainTours} homePageLabel={homePageLabel} />
            <DemandedTours demandedTours={demandedTours} /> 
            <ScrollTop />
        </div>
    )
}
