import React, { FC } from 'react';

import ResponsiveImage from 'common/components/ResponsiveImage';
import { ICompanyData } from 'companies/models/Company';

import style from './card.less';

export interface IProps {
  company: ICompanyData;
}

export const CompanyCard: FC<IProps> = ({ company }) => {
  return (
    <div className={style.companyCard}>
      <div className={style.image}>
        {company.image ? <ResponsiveImage image={company.image} type="company" size="md" /> : null}
      </div>
      <div className={style.content}>
        <div className={style.divider} />
        <h2>{company.name}</h2>
        <div>
          <p>{company.events.length}</p>
          <p>{company.careers.length}</p>
        </div>
      </div>
    </div>
  );
};
