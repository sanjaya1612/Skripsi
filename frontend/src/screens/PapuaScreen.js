import React from 'react';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom'


const PapuaScreen = () => {
    return <>
        <Link to='/galleries'><i className="fas fa-arrow-left"></i></Link>
        <h1><span className='text-primary'>About</span> Papua</h1>

        <Image className='center' src='./images/papua1.jpg' rounded style={{ width: 900, height: 500 }} />


        <p>
            <br />
            Papua is a province located in the central part of the island of Papua or the easternmost part of the Indonesian territory of Papua. The eastern hemisphere is the country of Papua New Guinea. The province of Papua was previously known as Irian Jaya which covers the entire territory of the island of Papua. Since 2003 it has been divided into two provinces, with the eastern part still using the name Papua while the western part using the name Papua Barat (Pabar). Papua Province has an area of 312,224.37 km2 and is the first largest and largest province in Indonesia
        </p>

        <h3>Religion</h3>
        <p>2.99 million people (69.54%) of the Papuan population are Christians. Then, Catholicism became the second majority religion in Papua with a total of 676.71 thousand people (15.71%) and Islam the third most widely practiced religion with a total of 627.78 thousand people (14.57%). While the rest are adherents of other religions, of which 3.14 thousand people (0.07%) are Hindus, 2.08 thousand people (0.05%) are Buddhists, 80 are Confucians (0.00%), and 2 ,86 thousand people (0.07%) of the population of Papua who adhere to the sect of belief.</p>

        <Image className='center' src='./images/papuaman.jpg' rounded style={{ width: 900, height: 500 }} />
        <br />
        <h3>People</h3>
        <p>
            Papuans come from the Autralomelanesid race, while the Malays come from the Mongoloid race. Nevertheless, the ancestors of the Papuans were the first to live and inhabit the archipelago in the past. </p>
    </>;
};

export default PapuaScreen
