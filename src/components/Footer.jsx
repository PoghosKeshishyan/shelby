import { Link } from 'react-router-dom';
import '../scss/Footer.scss';

export function Footer({ footer }) {
    const infoData = footer[0]?.info.split('/');

    return (
        <div className='Footer'>
            <div className='info'>
                <Link to='/'>
                    <img src='/images/logo.png' alt='logo' />
                </Link>
                
                <p className='content'>{infoData && infoData[0]}</p>
            </div>

            <div className='support'>
                <p> <i className='fa-solid fa-phone'></i> {infoData && infoData[1]} </p>
                <p> <i className='fa-solid fa-envelope'></i> {infoData && infoData[2]} </p>
                <p> <i className='fa-solid fa-location-dot'></i> {infoData && infoData[3]} </p>
            </div>

            <div className="links">
                <h3>{footer[0] && footer[0].heading}</h3>
                <Link to='/booking'>{footer[0]?.links.split('/')[0]}</Link>
                <Link to='/about'>{footer[0]?.links.split('/')[1]}</Link>
            </div>
        </div>
    )
}
