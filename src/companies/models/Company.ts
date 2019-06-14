import IResponsiveImage from 'common/models/ResponsiveImage';

import { ICareerOpportunity } from 'career/models/Career';
import { IEvent } from 'events/models/Event';

export interface ICompany {
  readonly id: number;
  readonly name: string;
  readonly short_description: string;
  readonly long_description: string;
  readonly image: IResponsiveImage;
  readonly site: string;
  readonly email_address: string;
  readonly phone_number: string;
}

export interface ICompanyData extends ICompany {
  careers: ICareerOpportunity[];
  events: IEvent[];
}
