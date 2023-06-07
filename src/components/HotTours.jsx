import { Link } from 'react-router-dom';
import '../scss/HotTours.scss';

export function HotTours({hotTours, homePageLabel}) {
    return (
        <div className='HotTours'>
            <h2>{homePageLabel[0]?.label}</h2>

            <div className='container'>
                {hotTours.map(el => <div key={el.id}>
                    <img src={`https://shelbybackend1.herokuapp.com/${el.image}`} alt='countries' />
                    <h3>{el.title}</h3>
                    <p>{el.descr}</p>
                    <Link to='/booking' className='btn'>{el.btn_text}</Link>
                </div>)}
            </div>
        </div>
    )
}
