// Address Interface for homeAddress, officeAddress, storageFacilityAddress, warehouseAddress
export interface IAddress {
  ad1: string;           // Address line 1
  ad2?: string;          // Address line 2 (optional)
  barangay: string;      // Barangay
  cityMunicipality: string; // City or Municipality
  province: string;      // Province
  region: string;        // Region
  zipCode: string;       // ZIP/Postal Code
  lat?: number;          // Latitude (optional)
  lng?: number;          // Longitude (optional)
}
