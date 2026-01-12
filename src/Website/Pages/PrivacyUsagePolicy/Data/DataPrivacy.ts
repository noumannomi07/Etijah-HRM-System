import { TFunction } from "react-i18next";

export const getPrivacyData = (t: TFunction) => {
  return [
    {
      title: t('sections.privacyTerms.title'),
      content: t('sections.privacyTerms.content', { returnObjects: true }) as string[]
    },
    {
      title: t('sections.privacyTerms.title'),
      content: t('sections.privacyTerms.content', { returnObjects: true }) as string[]
    },
    {
      title: t('sections.privacyTerms.title'),
      content: t('sections.privacyTerms.content', { returnObjects: true }) as string[]
    },
    {
      title: t('sections.privacyTerms.title'),
      content: t('sections.privacyTerms.content', { returnObjects: true }) as string[]
    },
    {
      title: t('sections.privacyTerms.title'),
      content: t('sections.privacyTerms.content', { returnObjects: true }) as string[]
    },
    {
      title: t('sections.privacyTerms.title'),
      content: t('sections.privacyTerms.content', { returnObjects: true }) as string[]
    },
    {
      title: t('sections.privacyTerms.title'),
      content: t('sections.privacyTerms.content', { returnObjects: true }) as string[]
    },
    {
      title: t('sections.privacyTerms.title'),
      content: t('sections.privacyTerms.content', { returnObjects: true }) as string[]
    }
  ];
};