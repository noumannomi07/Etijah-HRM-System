export const getDataPackages = (t: any) => [
  {
    title: t('packages.basic.title'),
    description: t('packages.basic.description'),
    price: "10",
    features: t('packages.basic.features', { returnObjects: true }),
    isBestseller: false
  },
  {
    title: t('packages.premium.title'),
    description: t('packages.premium.description'),
    price: "10",
    features: t('packages.premium.features', { returnObjects: true }),
    isBestseller: true
  },
  {
    title: t('packages.professional.title'),
    description: t('packages.professional.description'),
    price: "10",
    features: t('packages.professional.features', { returnObjects: true }),
    isBestseller: false
  }
];
