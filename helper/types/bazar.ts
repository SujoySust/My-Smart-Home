export interface IBazarItem {
  _id: string;
  name: string;
  unit: string;
  quantity: number;
  status?: string;
  date?: Date;
}
