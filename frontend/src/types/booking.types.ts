import { CustomerInfo } from "./customer.types";

export type BookingRequestInfo = {
  date: string;
  time: string;
  treatments: number[];
  message?: string;
  customer: CustomerInfo;
}

export type BookingDto = {
  id: number;
  startTime: string;
  endTime: string;
  message?: string | null;
  price: number;
  customer: {
    id: number;
    name: string;
    email: string;
    phone?: string | null;
  }
  treatments: {
    id: number;
    type: string;
    price: number;
    description: string | null;
    duration: string;
  }[];
};
