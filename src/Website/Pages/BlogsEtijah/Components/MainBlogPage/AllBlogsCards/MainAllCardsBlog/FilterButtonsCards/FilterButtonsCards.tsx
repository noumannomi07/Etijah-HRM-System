import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const FilterButtonsCards = ({ setActiveGenre, activeGenre, categories }) => {
  const { t } = useTranslation('blogs');
  
  const filterOptions = [
    { id: "all", label: t('mainPage.blogCategories.all') },
    ...categories.map((category) => ({
      id: category.id,
      label: category.title
    }))
  ];
 
  return (
    <div className="filter-container mt-10  flex justify-center items-center">
      <div className=" flex items-center flex-wrap gap-[20px] justify-center p-[0px_0_15px_0] lg:p-[0px]">
        {filterOptions.map((option) => (
          <button
            key={option.id}
            className={`filter-button button-transparent min-w-fit rounded-full px-[28px] ${
              activeGenre === option.id
                ? "bg-primaryColor_02 text-whiteColor"
                : ""
            }`}
            onClick={() => setActiveGenre(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};
FilterButtonsCards.propTypes = {
  setActiveGenre: PropTypes.func.isRequired,
  activeGenre: PropTypes.string.isRequired
};
export default FilterButtonsCards;
