import OrderPageIcon from '@assets/images/iconspages/orderpageicon.svg'
import OrderTabsContent from './OrderTabsContent'
import React from 'react'
import { useTranslation } from 'react-i18next'

const TabRequest = () => {
  const { t } = useTranslation("orders");

  return (
    <>
      <h2 className="title text-font-gray pt-1 pb-3 item-center-flex gap-1">
        <img src={OrderPageIcon} alt={t("altText.orderIcon")} />
        {t("tabs.orders")}</h2>
      <OrderTabsContent filter="all" />
    </>
  )
}

export default TabRequest
