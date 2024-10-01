import { $locationShim } from '@angular/common/upgrade';

export enum TirageStatus {
  EN_COUR = 'EN_COUR',
  EN_VALIDATION = 'EN_VALIDATION',
  TERMINE = 'TERMINE',
  SIMULATION = 'SIMULATION',
  SIMULATION_TERMINE = 'SIMULATION_TERMINE',
}

export interface StatusOption {
  label: string;
  value: string;
}

export type StatusOptions = StatusOption[];
