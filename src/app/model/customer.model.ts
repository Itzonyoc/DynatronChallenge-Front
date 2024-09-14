export class CustomerModel {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  created: string;
  last_updated: string;
  selected: boolean

  constructor(
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    created: string,
    last_updated: string
  ) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.created = created;
    this.last_updated = last_updated;
    this.selected = false;
  }
}
