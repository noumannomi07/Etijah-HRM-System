export interface PackageTranslation {
  id: number;
  package_id: number;
  locale: string;
  title: string;
  content: string;
}

export interface FeatureTranslation {
  id: number;
  feature_id: number;
  locale: string;
  title: string;
}

export interface PackageFeature {
  id: number;
  package_id: number;
  created_at: string;
  updated_at: string;
  title: string;
  translations: FeatureTranslation[];
}

export interface Package {
  id: number;
  image: string | null;
  status: number;
  six_price: string;
  year_price: string;
  order: number;
  employees_count: number;
  is_featured: number;
  created_at: string;
  updated_at: string;
  title: string;
  content: string;
  features: PackageFeature[];
  translations: PackageTranslation[];
}

export interface PackagesResponse {
  packages: Package[];
}
