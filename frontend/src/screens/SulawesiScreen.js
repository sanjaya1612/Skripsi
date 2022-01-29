import React from 'react'
import { Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const SulawesiScreen = () => {
    return <>
        <Link to='/galleries'><i className="fas fa-arrow-left"></i></Link>
        <h1><span className='text-primary'>About</span> Sulawesi</h1>
        <Image src='./images/sulawesiprofile.jpg' rounded style={{ width: 900, height: 500 }} />

        <p>
            <br />
            Sulawesi, formerly known as Celebes, is an island in Indonesia. Sulawesi is one of the four Greater Sunda Islands and is the eleventh largest island in the world.
            Sulawesi Island is located east of Kalimantan, west of the Maluku Islands, and south of Mindanao and the Sulu Archipelago, Philippines.
            In Indonesia, only the islands of Sumatra, Kalimantan and Papua are larger in area and only the islands of Java and Sumatra have more populations than Sulawesi.
        </p>
        <p>
            The landscape in Sulawesi includes four peninsulas, namely the North Peninsula, East Peninsula, South Peninsula, and Southeast Peninsula. There are three bays that separate these peninsulas, namely Tomini Bay (Gorontalo Bay) which stretches in the southern waters of the Minahasa Peninsula, Gorontalo Peninsula, and Tomini Peninsula (Tomini Bocht), Tolo Bay between the East and Southeast Peninsula, and Bone Bay. between the Southern and Southeastern Peninsulas. The Makassar Strait runs along the west side of the island and separates the island from Borneo. In addition, Sulawesi is also located between the confluence of three plates, namely the Eurasian Plate, the Indo-Australian Plate, and the Pacific Plate. This causes Sulawesi to have a very complex tectonic structure.
        </p>
        <br />
        <h3>Religion</h3>
        <p>A total of 50.78 thousand (1.9%) of the population of Southeast Sulawesi embraced Hinduism. There are 44.87 thousand (1.68%) residents in the province who are Christians. There are also 16.18 thousand (0.61%) of the population in Southeast Sulawesi who are Catholic. A total of 1.61 thousand (0.06%) of the population in Southeast Sulawesi embraced Buddhism.</p>
        <Image className='center' src='./images/sulawesiman.jpg' rounded style={{ width: 900, height: 500 }} />
        <br />
        <h3>People</h3>
        <p>Bugis people inhabit the central part of South Sulawesi. Reported from a journal entitled Getting to Know the Maritime Culture Center: Tribes, Bajo, Bugis, Mandar Tribes in the Golden Triangle of the Archipelago, by Afied Nurkholis, the Bugis came from the first migration of Asians. So for many years, these Asians inhabited South Sulawesi. The Bugis tribe is one of the most important parts of maritime culture. The population of this tribe is enough to dominate the number of people in Sulawesi. </p>
    </>;
};

export default SulawesiScreen;
