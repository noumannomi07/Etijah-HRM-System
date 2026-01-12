import img1 from "@assets/images/new/customer/cl1.png";
import img2 from "@assets/images/new/customer/cl2.png";
import img3 from "@assets/images/new/customer/cl3.png";
import img4 from "@assets/images/new/customer/cl4.png";

export const getCardsImages = (t: any) => [
  {
    id: 1,
    src: img1,
    nameUser: t('opinions.customers.customer1.name'),
    titleJob: t('opinions.customers.customer1.title'),
    imgUser: img1,
    alt: t('opinions.customers.customer1.name'),
    text: t('opinions.customers.customer1.testimonial')
  },
  {
    id: 2,
    src: img2,
    nameUser: t('opinions.customers.customer2.name'),
    titleJob: t('opinions.customers.customer2.title'),
    imgUser: img2,
    alt: t('opinions.customers.customer2.name'),
    text: t('opinions.customers.customer2.testimonial')
  },
  {
    id: 3,
    src: img3,
    nameUser: t('opinions.customers.customer3.name'),
    titleJob: t('opinions.customers.customer3.title'),
    imgUser: img3,
    alt: t('opinions.customers.customer3.name'),
    text: t('opinions.customers.customer3.testimonial')
  },
  {
    id: 4,
    src: img4,
    nameUser: t('opinions.customers.customer4.name'),
    titleJob: t('opinions.customers.customer4.title'),
    imgUser: img4,
    alt: t('opinions.customers.customer4.name'),
    text: t('opinions.customers.customer4.testimonial')
  }
];
