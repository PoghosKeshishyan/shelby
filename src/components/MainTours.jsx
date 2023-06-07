import '../scss/MainTours.scss';

export function MainTours({ mainTours, homePageLabel }) {
    return (
        <div className='MainTours'>
            <h2>{homePageLabel[0]?.label}</h2>

            <div className='container'>
                {
                    mainTours.map(el => (
                        <div className='item' key={el.id}>
                            <img src={`https://shelbybackend1.herokuapp.com/${el.image}`} alt='mainTours' />

                            <div className='content'>
                                <h3>{el.title}</h3>
                                <p>{el.descr}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
