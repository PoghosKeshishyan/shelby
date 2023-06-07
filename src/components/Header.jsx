import { useEffect, useState } from 'react';
import { NavLink as Link, useNavigate } from 'react-router-dom';
import { SelectLanguage } from './SelectLanguage';
import '../scss/Header.scss';

export function Header({ navbar }) {
    const [showNavBarOnScroll, setShowNavBarOnScroll] = useState(false);
    const [showNavBar, setShowNavBar] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        window.addEventListener('scroll', onScrollWindow);
    }, [])

    const onScrollWindow = () => {
        setShowNavBar(false);
        if (window.scrollY > 750) setShowNavBarOnScroll(true);
        else setShowNavBarOnScroll(false);
    }

    return (
        <div className='Header'>
            <div className='inner'>
                <div className='logo' onClick={() => { navigate('/'); setShowNavBar(false) }}>
                    <img src='/images/logo.png' alt='logo' />
                </div>

                <div id="menu-bar" className="fas fa-bars" onClick={() => setShowNavBar(!showNavBar)}></div>

                <nav className={showNavBar ? 'active' : ''}>
                    {
                        navbar.map(el => (
                            <Link key={el.id} to={el.route} onClick={() => setShowNavBar(false)}>
                                {el.title}
                            </Link>
                        ))
                    }
                </nav>
            </div>

            <div className='fullInfo'>
                <div className='info'>
                    <i className='fa-solid fa-phone'></i>
                    <a className='infoTel' href='tel:555 6785"'>Call Us: 555 6785</a>

                    <div className='icons'>
                        <a href="https://www.facebook.com/shelby.cjsco" target='_blank' rel='noreferrer'>
                            <i className='fa-brands fa-facebook-f'></i>
                        </a>

                        <a href="https://twitter.com/" target='_blank' rel='noreferrer'>
                            <i className='fa-brands fa-twitter'></i>
                        </a>

                        <a href="https://www.pinterest.com/" target='_blank' rel='noreferrer'>
                            <i className='fa-brands fa-pinterest'></i>
                        </a>
                    </div>

                </div>

                <SelectLanguage />
            </div>

            {/* ---------- navbar on scroll ---------- */}
            <div className={showNavBarOnScroll ? 'NavBarOnScroll activeNavBarOnScroll' : 'NavBarOnScroll'}>
                <div className='inner'>
                    <img src='/images/logo-on-scroll.png' onClick={() => navigate('/')} alt='logo' />
                    <nav>
                        {navbar.map(el => (
                            <Link key={el.id} to={el.route}>{el.title}</Link>
                        ))}
                    </nav>
                </div>

                <div className='fullInfo'>
                    <div className='info'>
                        <i className='fa-solid fa-phone'></i>
                        <a className='infoTel' href='tel:555 6785"'>Call Us: 555 6785</a>

                        <div className='icons'>
                            <a href="https://www.facebook.com/shelby.cjsco" target='_blank' rel='noreferrer'>
                                <i className='fa-brands fa-facebook-f'></i>
                            </a>

                            <a href="https://twitter.com/" target='_blank' rel='noreferrer'>
                                <i className='fa-brands fa-twitter'></i>
                            </a>

                            <a href="https://www.pinterest.com/" target='_blank' rel='noreferrer'>
                                <i className='fa-brands fa-pinterest'></i>
                            </a>
                        </div>
                    </div>

                    <SelectLanguage />
                </div>
            </div>
        </div>
    )
}
