export interface AvailableField {
  checked: boolean;
  avail: boolean;
}

export interface AvailLapanganTypes {
  date: string | Date | null; // Date in dd/mm/yy format
  start: string | TimeRanges | null; // Time in hh:mm format
  end: string | TimeRanges | null; // Time in hh:mm format
  name: string;
  phone: string;
  amount: string | null;
  memberId: string | null;
}
