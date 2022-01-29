import React from 'react';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom'


const BaliScreen = () => {
  return <>
  <Link to = '/galleries'><i className="fas fa-arrow-left"></i></Link>
  <h1><span className='text-primary'>About</span> Bali</h1>
  
  <Image className='center' src='./images/profilebali.jpg' rounded style={{width:900,height:500}}/>
  
  
  <p>
  <br/>
  Bali is a province in Indonesia whose capital city is Denpasar.
   Bali is also one of the islands in the Nusa Tenggara Archipelago.
   At the beginning of Indonesia's independence, this island was included in the Lesser Sunda Province with Singaraja as its capital, and is now divided into 3 provinces, namely Bali, West Nusa Tenggara and East Nusa Tenggara.
   In 2020, the population of Bali province is 4,317,404 people, with a density of 747 people/km2.
  </p>

  <h3>Religion</h3>
  <p>Based on data from the Central Statistics Agency (BPS) for the province of Bali in 2021, the population of Bali is 4,317,404 people (2020) with the majority being ethnic Balinese. Data from the Ministry of Religion records that 86.91% of the people of the province of Bali adhere to Hinduism. Other religions are Islam (10.05%), Protestant Christianity (1.56%), Catholic (0.79%), Buddhism (0.68%), Confucianism (0.01%), and Belief (less than 0.01%).</p>
  <p>The Balinese people are generally Hindu. While the inhabitants of Java, Sunda, Sasak, Malay, are generally Muslim, and some indigenous Balinese people also embrace Islam. While Christians generally come from residents of East Nusa Tenggara, then Papua, Batak tribes, Minahasa, Chinese. And there is also one village, namely Blimbing Sari village in the Melaya Jembrana sub-district, not far from Gilimanuk Harbor, a Christian village where the residents are Balinese, even the church looks like a temple.</p>
  <Image className='center' src='./images/balipeople.jpg' rounded style={{width:900,height:500}}/>
  <br/>
<h3>People</h3>
<p>The majority of the population inhabiting the province of Bali is the local indigenous tribe, namely Bali. The Balinese have a rich culture that is known to the world, so that Bali is the main destination for foreign tourists to Indonesia. In addition to the richness of the beach, the culture of interest in Bali is its dances, such as the Kecak dance, festivals such as Ogoh-ogoh, and others. Most ethnic groups from outside the Balinese are Javanese.</p>
  </>;
};

export default BaliScreen
