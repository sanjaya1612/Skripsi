import React from 'react';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom'


const NttScreen = () => {
    return <>
        <Link to='/galleries'><i className="fas fa-arrow-left"></i></Link>
        <h1><span className='text-primary'>About</span> Nusa Tenggara Timur</h1>

        <Image className='center' src='./images/nttprofile.jpg' rounded style={{ width: 900, height: 500 }} />


        <p>
            <br />
            Is a province in Indonesia which covers the eastern part of the Nusa Tenggara Islands. This province has a capital city in Kupang City and has 22 regencies/cities. This province is in the Lesser Sunda. In 2020, the population of this province is 5,325,566 people, with a density of 111 people/km2.
        </p>
        <br />
        <p>After the division, East Nusa Tenggara is an Indonesian province located in the southeastern part of Indonesia. This province consists of several islands, including the island of Flores, the island of Sumba, the island of Timor, the island of Alor, the island of Lembata, the island of Rote, the island of Sabu, the island of Adonara, the island of Solor, the island of Ende, the island of Komodo and the island of Palue.</p>
        <p>
            This province consists of approximately 1,200 islands, the three main islands in East Nusa Tenggara are Flores Island, Sumba Island and Timor Island (western part).
        </p>
        <h3>Religion</h3>
        <p>According to data from the Central Statistics Agency for the province of East Nusa Tenggara in 2021, the majority of the population is Christian, namely 91.71%, with details of the percentage being Catholic 52.45% and Protestant 39.26%. 8.09% of Muslims are adherents, then a small proportion are Hindus at 0.19% and Buddhists at 0.01%. Some residents on the island of Sumba still practice the local belief, namely Marapu..</p>
        
        <Image className='center' src='./images/nttpeople.jpg' rounded style={{ width: 900, height: 500 }} />
        <br />
        <h3>People</h3>
        <p>The majority of the population inhabiting the province of Bali is the local indigenous tribe, namely Bali. The Balinese have a rich culture that is known to the world, so that Bali is the main destination for foreign tourists to Indonesia. In addition to the richness of the beach, the culture of interest in Bali is its dances, such as the Kecak dance, festivals such as Ogoh-ogoh, and others. Most ethnic groups from outside the Balinese are Javanese.</p>
    </>;
};

export default NttScreen
