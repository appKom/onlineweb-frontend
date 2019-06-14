import React, { FC, useEffect, useState } from 'react';

import { getAllCompanies } from 'companies/api';
import { ICompanyData } from 'companies/models/Company';

import { CompanyCard } from '../CompanyCard';

import style from './companies.less';

export const CompanyList: FC = () => {
  const [companies, setCompanies] = useState<ICompanyData[]>([]);

  const fetchCompanies = async () => {
    const newCompanies = await getAllCompanies();
    setCompanies(newCompanies);
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <div className={style.container}>
      {companies.map((company) => (
        <CompanyCard key={company.id} company={company} />
      ))}
    </div>
  );
};
