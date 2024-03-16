import React, { useState } from 'react'
import './Gallery.css'

const Gallery = () => {
    let data = [
        {
            id: 1,
            imgSrc: '/Images/1.jpg',
        },
        {
            id: 2,
            imgSrc: '/Images/2.jpg',
        },
        {
            id: 3,
            imgSrc: '/Images/3.jpg',
        },
        {
            id: 4,
            imgSrc: '/Images/4.jpg',
        },
        {
            id: 5,
            imgSrc: '/Images/5.jpg',
        }, {
            id: 6,
            imgSrc: '/Images/6.jpg',
        },
        {
            id: 1,
            imgSrc: '/Images/1.jpg',
        },
        {
            id: 2,
            imgSrc: '/Images/2.jpg',
        },
        {
            id: 3,
            imgSrc: '/Images/3.jpg',
        },
        {
            id: 4,
            imgSrc: '/Images/4.jpg',
        },
        {
            id: 5,
            imgSrc: '/Images/5.jpg',
        }, {
            id: 6,
            imgSrc: '/Images/6.jpg',
        },
    ]
    
    const [model, setModel] = useState(false);
    const [tempimgSrc, setTempImgSrc] = useState('');

    const getImg = (imgSrc) => {
        setTempImgSrc(imgSrc);
        setModel(true);
    };

    const closeModel = () => {
        setModel(false);
    };

    return (
        <>
            <div className={model ? "model open" : "model"}>
                <button onClick={closeModel}>Cerrar</button> {/* Botón para cerrar el modelo */}
                <img src={tempimgSrc} alt="Imagen temporal" />
            </div>
            <div className='gallery'>
                {data.map((item, index) => (
                    <div className='pics' key={index} onClick={() => getImg(item.imgSrc)}>
                        <img src={item.imgSrc} style={{ width: '100%' }} alt={`Imagen ${item.id}`} />
                    </div>
                ))}
            </div>
        </>
    );
};

export default Gallery;