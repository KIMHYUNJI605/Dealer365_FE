import { Opportunity, InventoryItem, KpiMetric, RecentActivity, CarModel } from './types';

export const KPIS: KpiMetric[] = [
  {
    label: 'Total Revenue (MTD)',
    value: '$342,500',
    trend: 12.5,
    trendLabel: 'vs last month',
    icon: 'dollar',
    color: 'emerald'
  },
  {
    label: 'Active Opportunities',
    value: '42',
    trend: 5.2,
    trendLabel: 'new leads this week',
    icon: 'activity',
    color: 'blue'
  },
  {
    label: 'Test Drives Scheduled',
    value: '18',
    trend: -2.4,
    trendLabel: 'vs last week',
    icon: 'car',
    color: 'purple'
  },
  {
    label: 'Avg. Closing Time',
    value: '14 Days',
    trend: 0,
    trendLabel: 'stable',
    icon: 'users',
    color: 'orange'
  }
];

export const RECENT_ACTIVITIES: RecentActivity[] = [
  { id: '1', type: 'check-in', customer: 'Ms. Mai Davika', detail: 'Checked in at Showroom', time: '10 min ago' },
  { id: '2', type: 'quotation', customer: 'Kylie Padilla', detail: 'Sent Quote Q-22222 (911 Carrera)', time: '1 hour ago' },
  { id: '3', type: 'test-drive', customer: 'Phoenix Levy', detail: 'Completed Test Drive (Taycan)', time: '3 hours ago' },
];

export const PIPELINE_DATA: Opportunity[] = [
  { id: 'O-1', customerName: 'Madison Doyle', modelInterest: '911 Carrera S', stage: 'Quotation', probability: 60, value: '$138,000', lastContact: '2h ago', owner: 'Cynthia', avatarUrl: 'https://picsum.photos/30/30?random=1' },
  { id: 'O-2', customerName: 'Phoenix Levy', modelInterest: 'Taycan 4S', stage: 'New', probability: 20, value: '$118,500', lastContact: '1d ago', owner: 'Yudha', avatarUrl: 'https://picsum.photos/30/30?random=2' },
  { id: 'O-3', customerName: 'Leilani Krause', modelInterest: 'Cayenne', stage: 'Negotiation', probability: 85, value: '$95,000', lastContact: '4h ago', owner: 'Pranav', avatarUrl: 'https://picsum.photos/30/30?random=3' },
  { id: 'O-4', customerName: 'Jamal Ayers', modelInterest: 'Panamera', stage: 'Handover', probability: 100, value: '$105,000', lastContact: 'Just now', owner: 'Omri', avatarUrl: 'https://picsum.photos/30/30?random=4' },
];

export const INVENTORY_DATA: InventoryItem[] = [
  { id: 'V-001', model: '911 Carrera', trim: 'S', exteriorColor: 'Guards Red', vin: 'WP...8821', status: 'In Stock', location: 'Showroom A', daysInStock: 5 },
  { id: 'V-002', model: 'Taycan', trim: 'Turbo', exteriorColor: 'Frozen Berry', vin: 'WP...1123', status: 'In Transit', location: 'Port', daysInStock: 0 },
  { id: 'V-003', model: 'Macan', trim: 'GTS', exteriorColor: 'Jet Black', vin: 'WP...9922', status: 'Reserved', location: 'Storage B', daysInStock: 12 },
];

// PORSCHE MOCK DATA
export const CAR_MODELS: CarModel[] = [
  {
    id: '911-carrera',
    name: '911 Carrera',
    slogan: 'Timeless Machine.',
    image: 'https://files.porsche.com/filestore/image/multimedia/none/992-carrera-modelimage-sideshot/model/61981358-e923-11e9-80c4-005056bbdc38/porsche-model.png',
    interiorImage: 'https://files.porsche.com/filestore/image/multimedia/none/992-carrera-modelimage-interior/model/6d224b89-e923-11e9-80c4-005056bbdc38/porsche-model.png',
    basePrice: 114400,
    category: 'Sedan',
    trims: [
      { id: 'carrera', name: 'Carrera', priceOffset: 0, features: ['379 hp', '0-60 in 4.0s', '19"/20" Wheels'], stockCount: 3, margin: 8000, deliveryEstimate: 'Immediate', vinList: ['VIN911A', 'VIN911B'] },
      { id: 'carrera-s', name: 'Carrera S', priceOffset: 15900, features: ['443 hp', '0-60 in 3.5s', '20"/21" Wheels'], stockCount: 1, margin: 10500, deliveryEstimate: '2 Weeks' },
      { id: 'carrera-4s', name: 'Carrera 4S', priceOffset: 23200, features: ['AWD', '443 hp', '0-60 in 3.4s'], stockCount: 0, margin: 12000, deliveryEstimate: '3 Months' },
    ],
    colors: [
      { id: 'white', name: 'White', hex: '#F9FAFB', priceOffset: 0, stockCount: 3 },
      { id: 'black', name: 'Jet Black Metallic', hex: '#000000', priceOffset: 840, stockCount: 2 },
      { id: 'guards-red', name: 'Guards Red', hex: '#DC2626', priceOffset: 0, stockCount: 1 },
      { id: 'racing-yellow', name: 'Racing Yellow', hex: '#FACC15', priceOffset: 0, stockCount: 0 },
      { id: 'gentian-blue', name: 'Gentian Blue', hex: '#1E3A8A', priceOffset: 840, stockCount: 1 },
    ],
    interiorColors: [
        { id: 'int-black', name: 'Black Leather', hex: '#1F2937', priceOffset: 0, stockCount: 100 },
        { id: 'int-red', name: 'Bordeaux Red', hex: '#7F1D1D', priceOffset: 4260, stockCount: 100 },
        { id: 'int-beige', name: 'Mojave Beige', hex: '#D6C8B7', priceOffset: 0, stockCount: 100 }
    ],
    features: ['Sport Chrono Package', 'PASM Sport Suspension', 'Sport Exhaust System', 'PCCB Ceramic Brakes']
  },
  {
    id: 'taycan',
    name: 'Taycan',
    slogan: 'Soul, Electrified.',
    image: 'https://files.porsche.com/filestore/image/multimedia/none/j1-taycan-modelimage-sideshot/model/c271e54a-e922-11e9-80c4-005056bbdc38/porsche-model.png',
    interiorImage: 'https://files.porsche.com/filestore/image/multimedia/none/j1-taycan-modelimage-interior/model/d367c336-e922-11e9-80c4-005056bbdc38/porsche-model.png',
    basePrice: 90900,
    category: 'EV',
    trims: [
      { id: 'taycan', name: 'Taycan', priceOffset: 0, features: ['321 hp', '0-60 in 5.1s', 'RWD'], stockCount: 5, margin: 6000, deliveryEstimate: 'Immediate' },
      { id: 'taycan-4s', name: 'Taycan 4S', priceOffset: 20600, features: ['429 hp', '0-60 in 3.8s', 'AWD'], stockCount: 2, margin: 8500, deliveryEstimate: '1 Week' },
      { id: 'taycan-turbo', name: 'Turbo', priceOffset: 60000, features: ['616 hp', '0-60 in 3.0s', 'AWD'], stockCount: 0, margin: 15000, deliveryEstimate: 'Special Order' },
    ],
    colors: [
      { id: 'white', name: 'White', hex: '#F9FAFB', priceOffset: 0, stockCount: 2 },
      { id: 'frozen-blue', name: 'Frozen Blue', hex: '#93C5FD', priceOffset: 800, stockCount: 1 },
      { id: 'mamba-green', name: 'Mamba Green', hex: '#15803D', priceOffset: 800, stockCount: 0 },
      { id: 'coffee-beige', name: 'Coffee Beige', hex: '#A8A29E', priceOffset: 800, stockCount: 1 },
    ],
    interiorColors: [
        { id: 'int-black', name: 'Black Race-Tex', hex: '#1F2937', priceOffset: 0, stockCount: 100 },
        { id: 'int-slate', name: 'Slate Grey', hex: '#475569', priceOffset: 0, stockCount: 100 }
    ],
    features: ['Performance Battery Plus', 'Mobile Charger Connect', 'Porsche Electric Sport Sound', 'Passenger Display']
  }
];