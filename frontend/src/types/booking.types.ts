export type BookingRequestInfo = {
  date: string;
  time: string;
  treatments: number[];
  message?: string;
  customer: CustomerInfo;
}

export type CustomerInfo = {
  name: string;
  email: string;
  phone?: string;
}
