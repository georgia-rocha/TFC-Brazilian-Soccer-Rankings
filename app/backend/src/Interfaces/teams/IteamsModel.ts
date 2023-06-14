import { Iteams } from './Iteams';


export interface IteamsModel {
  findAll(): Promise<Iteams[]>,

  findById(id: Iteams['id']): Promise<Iteams | null>
}
