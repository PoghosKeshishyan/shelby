import { useEffect, useState } from 'react';
import ScrollTrigger from 'react-scroll-trigger';
import ProgressBar from "@ramonak/react-progress-bar";
import { HotTours } from '../components/HotTours';
import axios from '../axios';
import '../scss/AboutPage.scss';

export function AboutPage() {
    const [currentLanguage, setCurrentLanguage] = useState('en');
    const [hotTours, setHotTours] = useState([]);
    const [homePageLabel, setHomePageLabel] = useState({});
    const [aboutProgress, setAboutProgress] = useState([]);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        loadingData();
        window.scrollTo(0, 0);
        setCurrentLanguage(localStorage.getItem('shelby-Language'));
    }, [currentLanguage])

    async function loadingData() {
        const hotToursData = await axios.get(`hottour?lang=${currentLanguage}`);
        setHotTours(hotToursData.data);

        const homePageLabelData = await axios.get(`home_page_label?lang=${currentLanguage}`);
        setHomePageLabel(homePageLabelData.data);

        const progressData = await axios.get(`about_page_progress?lang=${currentLanguage}`);
        setAboutProgress(progressData.data);
    }

    return (
        <div className='AboutPage'>
            <div className='background'></div>

            <HotTours hotTours={hotTours} homePageLabel={homePageLabel} />

            <div className='progress-container'>
                {
                    aboutProgress.map(el =>
                        <div className='box' key={el.id}>
                            <p>{el.title}</p>

                            <ScrollTrigger onEnter={() => setVisible(true)}>
                                {
                                    visible && <ProgressBar className="progress-bar"
                                        completed={el.percent}
                                        animateOnRender
                                        transitionDuration="2s"
                                        transitionTimingFunction="linear"
                                        height='14px'
                                        borderRadius="0"
                                        isLabelVisible={false}
                                        bgColor="var(--white)"
                                        baseBgColor="var(--whiteAlpha)"
                                    />
                                }
                            </ScrollTrigger>
                        </div>
                    )
                }
            </div >
        </div>
    )
}