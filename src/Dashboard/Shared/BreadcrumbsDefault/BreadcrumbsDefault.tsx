import BreadCrumbBar from "@assets/Icons/BreadCrumbBar.svg";
import { Link } from "react-router-dom";
import { FullRoutes } from "@/Routes/routes";
import React from "react";
import { useTranslation } from "react-i18next";

type BreadcrumbsDefaultProps = {
  isShowTitleHomePage: boolean;
  isShowSlashHome: boolean;
  isDashboardRouteHomePage: boolean;
  isShowNewLinkPage: boolean;
  routeOfNewLinkPage: string;
  iconNewPageText: React.ReactNode;
  textNewPage: string;
  isPageDefault?: boolean;
  defaultePageRoute?: string;
  textDefaultPage?: string;
  isShowTitleTextPage?: boolean;
  titleTextPage?: string;
};

export function BreadcrumbsDefault({
  isShowTitleHomePage,
  isShowSlashHome,
  isDashboardRouteHomePage,
  isShowNewLinkPage,
  routeOfNewLinkPage,
  iconNewPageText,
  textNewPage,
  isPageDefault,
  defaultePageRoute,
  textDefaultPage,
  isShowTitleTextPage,
  titleTextPage,
}: BreadcrumbsDefaultProps) {
  const { t } = useTranslation("home");

  return (
    <nav
      data-aos="fade-left"
      aria-label="breadcrumb"
      className="bg-transparent bread-crumbs p-0 pb-[1.50rem] leading-none"
    >
      <ol className="list-bread-ol flex w-full border-red-500 flex-wrap items-center gap-3">
        {isShowTitleHomePage && (
          <li className="item-bread-li flex cursor-pointer items-center">
            <Link
              to={
                isDashboardRouteHomePage
                  ? FullRoutes.Dashboard.Home
                  : FullRoutes.Website.Base
              }
              className="item-bread-link item-center-flex text-font-gray leading-none gap-[8px]"
            >
              <div className="icon-home-bread">
                <img src={BreadCrumbBar} />
              </div>
              {t("pageTitles.home")}
            </Link>
            {isShowSlashHome && (
              <span className="slash-item pointer-events-none ms-3 text-slate-800">
                /
              </span>
            )}
          </li>
        )}

        {isShowNewLinkPage && (
          <li className="item-bread-li page-route-link flex cursor-pointer items-center">
            <Link
              to={`${routeOfNewLinkPage}`}
              className="item-bread-link item-center-flex text-font-gray leading-none gap-[8px]"
            >
              <div className="icon-page">{iconNewPageText}</div>
              <h2>{textNewPage}</h2>
            </Link>
          </li>
        )}

        {isPageDefault && (
          <li className="item-bread-li flex cursor-pointer items-center ">
            <span className="slash-item pointer-events-none me-3 text-slate-800">
              /
            </span>
            <Link
              to={defaultePageRoute ?? "#"}
              className="item-bread-link item-center-flex text-font-gray leading-none"
            >
              {textDefaultPage}
            </Link>
          </li>
        )}

        {isShowTitleTextPage && (
          <li className="item-bread-li flex cursor-pointer items-center ">
            <span className="slash-item pointer-events-none me-3 text-slate-800">
              /
            </span>
            <span className="text-font-dark text-[16px] item-center-flex leading-none">
              {titleTextPage}
            </span>
          </li>
        )}
      </ol>
    </nav>
  );
}
