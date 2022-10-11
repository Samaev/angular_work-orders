export interface IAssigned {
  person_name: 'Technician One' | 'Technician Two';
  status: string;
}


export interface IOrder {
  work_order_id: number;
  description: string;
  received_date: string;
  assigned_to: IAssigned[] | [];
  status: string;
  priority: 'Low' | 'High' | 'Normal';
}
