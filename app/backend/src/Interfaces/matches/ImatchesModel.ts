import { Imatches } from './Imatches';

export interface ImatchesModel {
  findAll(): Promise<Imatches[]>,
  findByProgress(progress: boolean): Promise<Imatches[] | null>,
}
