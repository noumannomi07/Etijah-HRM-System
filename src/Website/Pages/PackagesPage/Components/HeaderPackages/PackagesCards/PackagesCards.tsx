import React from "react";
import PackageCardDetails from "./PackageCardDetails";
import "./PackagesCards.css";
import { useTranslation } from "react-i18next";
import { usePackages } from "@/hooks/website/usePackages";
import { Loading } from "@/components";

const PackagesCards = () => {
  const { i18n } = useTranslation('packages');
  const { data, isLoading, isError, error } = usePackages();

  const packages = data?.packages || [];
  const currentLocale = i18n.language;

  // Sort packages to put Premium Package in the middle (2nd position)
  const sortedPackages = React.useMemo(() => {
    const packagesCopy = [...packages];
    
    // Find Premium Package index
    const premiumIndex = packagesCopy.findIndex(pkg => {
      const translation = pkg.translations.find(t => t.locale === currentLocale) || pkg.translations[0];
      return pkg.title === "Premium Package" || translation?.title === "Premium Package" || pkg.is_featured === 1;
    });

    // Only sort if we have more than 1 package and Premium is not at index 1
    if (packagesCopy.length > 1 && premiumIndex !== -1 && premiumIndex !== 1) {
      const [premiumPackage] = packagesCopy.splice(premiumIndex, 1);
      packagesCopy.splice(1, 0, premiumPackage); // Insert at position 1 (2nd card)
    }

    return packagesCopy;
  }, [packages, currentLocale]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
      <Loading/>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-red-500">{error?.message || "Failed to load packages"}</p>
      </div>
    );
  }

  return (
    <div className="packages-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-[15px] mt-[40px]">
      {sortedPackages.map((pkg) => {
        // Find the translation for the current locale
        const translation = pkg.translations.find(t => t.locale === currentLocale) || pkg.translations[0];
        
        // Map features to the current locale
        const features = pkg.features.map(feature => {
          const featureTranslation = feature.translations.find(t => t.locale === currentLocale) || feature.translations[0];
          return featureTranslation?.title || feature.title;
        });

        // Check if this is the Premium Package (recommended/bestseller)
        const isPremiumPackage = pkg.title === "Premium Package" || translation?.title === "Premium Package" || pkg.is_featured === 1;

        return (
          <PackageCardDetails
            key={pkg.id}
            className=""
            title={translation?.title || pkg.title}
            description={translation?.content || pkg.content}
            price={pkg.six_price}
            annualPrice={pkg.year_price}
            features={features}
            isBestseller={isPremiumPackage}
            isFeatured={pkg?.is_featured}
          />
        );
      })}
    </div>
  );
};

export default PackagesCards;
