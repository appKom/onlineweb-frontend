import React from 'react';

import ContactInfo from './ContactInfo';
import style from './footer.less';
import SocialLinks from './SocialLinks';

const HSP = {
  website: 'https://www.bekk.no/',
  logo: '/img/bekk.svg',
  description: 'Hovedsamarbeidspartner - Bekk',
};

const Footer = () => (
  <footer className={style.footer}>
    <div className={style.footerContent}>
      <a href={HSP.website} className={style.sponsor}>
        <img src={HSP.logo} alt={HSP.description} />
      </a>
      <p>
        Har du funnet en feil på nettsiden?
        <br />
        Ta kontakt med <a href="mailto:dotkom@online.ntnu.no">Utviklingsteamet</a>
      </p>
      <SocialLinks />
      <ContactInfo />
    </div>
  </footer>
);

export default Footer;
