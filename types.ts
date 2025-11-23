// Navigation & View Types
export type ViewId = 
  | 'dashboard' 
  | 'pipeline' 
  | 'inventory' 
  | 'configurator' 
  | 'customers' 
  | 'calendar' 
  | 'quotations';

export interface NavItem {
  id: ViewId;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

// Data Models based on SSC PDF Analysis
export interface Opportunity {
  id: string;
  customerName: string;
  modelInterest: string; // e.g., CRETA, STARGAZER
  stage: 'New' | 'Test Drive' | 'Quotation' | 'Negotiation' | 'Handover';
  probability: number;
  value: string; // Formatted currency
  lastContact: string;
  owner: string;
  avatarUrl: string;
}

export interface InventoryItem {
  id: string;
  model: string;
  trim: string;
  exteriorColor: string;
  vin: string;
  status: 'In Stock' | 'In Transit' | 'Reserved';
  location: string;
  daysInStock: number;
}

export interface KpiMetric {
  label: string;
  value: string;
  trend: number; // positive or negative percentage
  trendLabel: string;
  icon: 'users' | 'car' | 'dollar' | 'activity';
  color: 'emerald' | 'blue' | 'purple' | 'orange';
}

export interface RecentActivity {
  id: string;
  type: 'check-in' | 'quotation' | 'test-drive';
  customer: string;
  detail: string;
  time: string;
}

// Configurator Specific Types
export interface CarModel {
  id: string;
  name: string;
  slogan?: string;
  image: string; // Exterior Thumbnail
  interiorImage?: string; // Interior 360/Static Image
  basePrice: number;
  category: 'SUV' | 'MPV' | 'EV' | 'Sedan';
  trims: CarTrim[];
  colors: CarColor[];
  interiorColors: CarColor[];
  features: string[]; // KSP list
}

export interface CarTrim {
  id: string;
  name: string;
  priceOffset: number;
  features: string[];
  stockCount: number; // For Agent View
  margin: number; // For Agent View
  deliveryEstimate: string; // For Agent View
  vinList?: string[]; // Available VINs
}

export interface CarColor {
  id: string;
  name: string;
  hex: string;
  priceOffset: number;
  stockCount: number; // For Agent View
}