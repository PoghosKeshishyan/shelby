import '../scss/DemandedTours.scss';

export function DemandedTours({demandedTours}) {
    return (
        <div className='DemandedTours'>
            {
                demandedTours.map(el => (
                    <div key={el.id} className='item'>
                        <div className='content'>
                            <h2>{el.title}</h2>
                            <p>{el.descr}</p>
                        </div>

                        <div className='image'>
                            <img src={`https://shelbybackend1.herokuapp.com/${el.image}`} alt='DemandedTours' />
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
