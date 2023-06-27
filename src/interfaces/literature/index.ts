import { ContributorInterface } from 'interfaces/contributor';
import { GetQueryInterface } from 'interfaces';

export interface LiteratureInterface {
  id?: string;
  title: string;
  author: string;
  content: string;
  tags?: string;
  categories?: string;
  contributor_id?: string;
  created_at?: any;
  updated_at?: any;

  contributor?: ContributorInterface;
  _count?: {};
}

export interface LiteratureGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  author?: string;
  content?: string;
  tags?: string;
  categories?: string;
  contributor_id?: string;
}
