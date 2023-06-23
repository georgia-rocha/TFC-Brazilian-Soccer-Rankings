import { Imatches } from './Imatches';

export interface ImatchesModel {
  findAll(): Promise<Imatches[]>,
}
