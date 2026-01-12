import CommitmentIcon from "@assets/images/website/about/icons/commitmenticon";
import RewardIconY from "@assets/images/website/about/icons/rewardicony";
import { TransparencyIcon } from "@assets/images/website/about/icons/transparencyicon";
import IdeaIcon from "@assets/images/website/services/imagesservices/followupperformance/icons/ideaicon";
import CardBoxOneShared from "@/Website/Shared/CardBoxOneShared/CardBoxOneShared";
import { useTranslation } from "react-i18next";

const CardsCoreValuesEtijah = () => {
  const { t } = useTranslation('aboutUs');
  
  const cardData = [
    {
      id: 1,
      title: t('coreValues.values.innovation.title'),
      text: t('coreValues.values.innovation.description'),
      icon: <IdeaIcon />,
    },
    {
      id: 2,
      title: t('coreValues.values.quality.title'),
      text: t('coreValues.values.quality.description'),
      icon: <RewardIconY />,
    },
    {
      id: 3,
      title: t('coreValues.values.transparency.title'),
      text: t('coreValues.values.transparency.description'),
      icon: <TransparencyIcon />,
    },
    {
      id: 4,
      title: t('coreValues.values.commitment.title'),
      text: t('coreValues.values.commitment.description'),
      icon: <CommitmentIcon />,
    },
  ];
  return (
    <div className="cards-core-values-etijah pages-services">
      {cardData.map((card, index) => (
        <div
          key={card.id}
          className={`card-one-line ${
            index % 2 === 0 ? "left-place" : "right-place"
          }`}
        >
          <CardBoxOneShared
            key={card.id}
            functionCardBox={() => {}}
            iconHeaderBox={card.icon}
            titleContentCard={card.title}
            textContentCard={card.text}
          />
        </div>
      ))}
    </div>
  );
};

export default CardsCoreValuesEtijah;
