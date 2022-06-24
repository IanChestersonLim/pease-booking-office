export interface ItemInterface {
  item: {
    baseUnitId: number;
    code: string;
    description: string;
    groupId: number;
    id: number;
    inactive: boolean;
    units: [];
  };
  _id: string;
  quantity: number;
  um: string;
}
