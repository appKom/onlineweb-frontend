import { getCareers } from 'career/api';
import { get, getAllPages, IAPIData } from 'common/utils/api';
import { getEvents } from 'events/api/events';

import { ICompany, ICompanyData } from '../models/Company';

const API_URL = '/api/v1/companies/';

export const getCompanies = async (): Promise<ICompany[]> => {
  const { results } = await get<IAPIData<ICompany>>(API_URL, { format: 'json' });
  return results;
};

export const getAllCompanies = async (): Promise<ICompanyData[]> => {
  const results = await getAllPages<ICompany>(API_URL, { format: 'json' });
  const data = await Promise.all(
    results.map(async (company) => ({
      ...company,
      events: await getEvents({ companies: [company.id, company.id] }),
      careers: await getCareers({ company: [company.id, company.id] }),
    }))
  );
  return data;
};
