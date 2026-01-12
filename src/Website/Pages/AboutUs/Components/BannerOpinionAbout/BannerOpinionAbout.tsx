import StarCopyIcon from "@assets/images/website/icons/starcopyicon.tsx";
import ContainerMedia from "@/Website/Components/ContainerMedia/ContainerMedia";
import BannerBgWeb from "@/Website/Shared/BannerBgWeb/BannerBgWeb";
import imageUser from "@assets/images/new/about/001.png";
import image from "@assets/images/new/about/001.png";
import "./BannerOpinionAbout.css";
import React from "react";
import { useTranslation } from "react-i18next";
const BannerOpinionAbout = () => {
  const { t } = useTranslation('aboutUs');
  
  // return (
  //   <div className="banner-opinion-about padding-60-web">
  //     {/* =================== START CONTAINER ==================== */}
  //     <ContainerMedia>
  //       <BannerBgWeb>
  //         {/* ================ START ALL BANNER OPINION ABOUT =============== */}
  //         <div className="all-banner-opinion-about grid-cards-2 items-center">
  //           {/* =================== START RIGHT CONTENT OPINION ================ */}
  //           <div data-aos={"fade-left"} className="right-content-opinion">
  //             <div className="icon-quote-opinion">
  //               <StarCopyIcon />
  //             </div>
  //             <p className="text-opinion text-font-white leading-9 my-4">
  //               {t('opinion.quote')}
  //             </p>
  //             <div className="details-user-content flex items-center gap-3 mt-6">
  //               <div className="image-user-opinion">
  //                 <img
  //                   src={imageUser}
  //                   alt="image user"
  //                   className="w-[50px] h-[50px] rounded-full object-cover"
  //                   loading="lazy"
  //                 />
  //               </div>
  //               <div className="details-info">
  //                 <h2 className="name-user text-font-white">
  //                   {t('opinion.author.name')}
  //                 </h2>
  //                 <p className="title-job-user text-font-white text-[15px]">
  //                   {t('opinion.author.title')}
  //                 </p>
  //               </div>
  //             </div>
  //           </div>
  //           {/* =================== END RIGHT CONTENT OPINION ================ */}
  //           {/* =================== START LEFT CONTENT OPINION =============== */}
  //           <div data-aos={"fade-right"} className="left-content-opinion flex justify-end items-end">
  //             <img
  //               src={image}
  //               alt="image"
  //               className="image-content-src w-[407] h-[470px] object-cover"
  //               loading="lazy"
  //             />
  //           </div>
  //           {/* =================== END LEFT CONTENT OPINION =============== */}
  //         </div>
  //         {/* ================ END ALL BANNER OPINION ABOUT =============== */}
  //       </BannerBgWeb>
  //     </ContainerMedia>
  //     {/* =================== END CONTAINER ==================== */}
  //   </div>
  // );
};

export default BannerOpinionAbout;
