import { LiteratureInterface } from 'interfaces/literature';
import { UserInterface } from 'interfaces/user';
import { PublisherInterface } from 'interfaces/publisher';
import { GetQueryInterface } from 'interfaces';

export interface ContributorInterface {
  id?: string;
  user_id?: string;
  publisher_id?: string;
  created_at?: any;
  updated_at?: any;
  literature?: LiteratureInterface[];
  user?: UserInterface;
  publisher?: PublisherInterface;
  _count?: {
    literature?: number;
  };
}

export interface ContributorGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  publisher_id?: string;
}
