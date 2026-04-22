import styles from './AboutUsPage.module.css';

const OurValues = () => {
    const values = [
    {
      title: 'Exploration',
      description: 'We are driven by a deep-seated desire to explore the unknown. We believe that the pursuit of discovery is at the heart of human nature, and we are committed to pushing the boundaries of what is possible.',
    },
    {
      title: 'Innovation',
      description: 'At Galactica, we prioritize cutting-edge technology and innovation. We are constantly evolving our spacecraft, safety protocols, and services to ensure that our travelers experience the most advanced and secure space journeys available.',
    },
    {
      title: 'Sustainability',
      description: 'We are committed to sustainable practices in all aspects of our operations. From minimizing our environmental impact to promoting responsible space exploration, we strive to create a better future for generations to come.',
    },
    {
      title: 'Community',
      description: 'We believe in fostering a strong sense of community both within our organization and with our customers. Collaboration, support, and shared goals drive us to achieve excellence together.',
    },
  ];


  return (
    <div>
        <ul className={styles.valueList}>
          {values.map((value) => (
            <li key={value.title} className={styles.valueListItem}>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </li>
          ))}
        </ul>
      </div>
  );
};

const OurCrew = () => {

  const crewMembers = [
  {
    name: 'Anousheh Ansari',
    image: '/crew/image-anousheh-ansari.png',
  },
  {
    name: 'Douglas Hurley',
    image: '/crew/image-douglas-hurley.png',
  },
  {
    name: 'Mark Shuttleworth',
    image: '/crew/image-mark-shuttleworth.png',
  },
  {
    name: 'Victor Glover',
    image: '/crew/image-victor-glover.png',
  },
];

  return (
     <div className={styles.crewList}>
        {crewMembers.map((member) => (
          <figure key={member.name} className={styles.crewMembers}>
          <img src={member.image} alt={member.name} />
          <figcaption className={styles.crewCaption}>{member.name}</figcaption>
          </figure>
        ))}
      </div>
  );
}

const OurPartners = () => {
  const partners = [
    {
      name: 'Amazon',
      logo: '/business_partners/amazon_logo.png',
      url: 'https://www.amazon.com',
    },
    {
      name: 'Alphabet',
      logo: '/business_partners/alphabet-logo.png',
      url: 'https://abc.xyz',
    },
    {
      name: 'NYU',
      logo: '/business_partners/nyu-logo.png',
      url: 'https://www.nyu.edu',
    },
    {
      name: 'CBC',
      logo: '/business_partners/CBC_Logo_White.png',
      url: 'https://www.cbc.ca',
    },
    {
      name: "Queen's University",
      logo: '/business_partners/QueensLogo_white.png',
      url: 'https://www.queensu.ca',
    },
    {
      name: 'Samsung',
      logo: '/business_partners/samsung-logo.png',
      url: 'https://www.samsung.com',
    },
  ];

  return (
    <div>
      <ul className={styles.partnerList}>
        {partners.map((partner) => (
          <li key={partner.name} className={styles.partnerListItem}>
            <img
              className={styles.partnerIcon}
              src={partner.logo}
              alt={`${partner.name} logo`}
            />
            <h3>
              <a
                className={styles.partnerLink}
                href={partner.url}
                target="_blank"
                rel="noreferrer"
              >
                {partner.name}
              </a>
            </h3>
          </li>
        ))}
      </ul>
    </div>

  );
}


export const Crew = () => {
  return (
    <div className="fullBGpicture">
      <main className="mainContent">
        <h1>About us</h1>
        <section className="card">
          <h2>Our Values</h2>
          <OurValues/>
        </section>
        <section className="card">
          <h2>The crew</h2>
          <OurCrew/>
        </section>
        <section className='card'>
           <h2>Our Partners</h2>
           <OurPartners/>
         </section>

      </main>
    </div>
  );
}

export default Crew;
