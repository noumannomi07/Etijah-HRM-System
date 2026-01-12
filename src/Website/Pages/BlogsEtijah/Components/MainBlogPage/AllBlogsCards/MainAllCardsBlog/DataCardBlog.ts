
import imageBlog1 from "@assets/images/website/about/a01.png";
import imageBlog2 from "@assets/images/website/about/a02.png";
import imageBlog3 from "@assets/images/website/about/a03.png";

export const getCardDataBlog = (t: any) => [
  {
    id: 0,
    image: imageBlog1,
    badgeTitleCardBlog: t('mainPage.blogCategories.employees'),
    title: t('mainPage.blogPosts.employeeManagement.title'),
    text: t('mainPage.blogPosts.employeeManagement.description'),
    categoryName: [t('mainPage.blogCategories.employees')]
  },
  {
    id: 1,
    image: imageBlog2,
    badgeTitleCardBlog: t('mainPage.blogCategories.management'),
    title: t('mainPage.blogPosts.managementStrategies.title'),
    text: t('mainPage.blogPosts.managementStrategies.description'),
    categoryName: [t('mainPage.blogCategories.management')]
  },
  {
    id: 2,
    image: imageBlog3,
    badgeTitleCardBlog: t('mainPage.blogCategories.payroll'),
    title: t('mainPage.blogPosts.payrollSystem.title'),
    text: t('mainPage.blogPosts.payrollSystem.description'),
    categoryName: [t('mainPage.blogCategories.payroll')]
  },
  {
    id: 3,
    image: imageBlog3,
    badgeTitleCardBlog: t('mainPage.blogCategories.structure'),
    title: t('mainPage.blogPosts.organizationalStructure.title'),
    text: t('mainPage.blogPosts.organizationalStructure.description'),
    categoryName: [t('mainPage.blogCategories.structure')]
  },
  {
    id: 4,
    image: imageBlog2,
    badgeTitleCardBlog: t('mainPage.blogCategories.success'),
    title: t('mainPage.blogPosts.successMetrics.title'),
    text: t('mainPage.blogPosts.successMetrics.description'),
    categoryName: [t('mainPage.blogCategories.success')]
  },
  {
    id: 5,
    image: imageBlog1,
    badgeTitleCardBlog: t('mainPage.blogCategories.organizations'),
    title: t('mainPage.blogPosts.organizationManagement.title'),
    text: t('mainPage.blogPosts.organizationManagement.description'),
    categoryName: [t('mainPage.blogCategories.organizations')]
  },
  {
    id: 6,
    image: imageBlog3,
    badgeTitleCardBlog: t('mainPage.blogCategories.employees'),
    title: t('mainPage.blogPosts.employeePerformance.title'),
    text: t('mainPage.blogPosts.employeePerformance.description'),
    categoryName: [t('mainPage.blogCategories.employees')]
  },
  {
    id: 7,
    image: imageBlog1,
    badgeTitleCardBlog: t('mainPage.blogCategories.success'),
    title: t('mainPage.blogPosts.successStrategies.title'),
    text: t('mainPage.blogPosts.successStrategies.description'),
    categoryName: [t('mainPage.blogCategories.success')]
  },
  {
    id: 8,
    image: imageBlog2,
    badgeTitleCardBlog: t('mainPage.blogCategories.organizations'),
    title: t('mainPage.blogPosts.organizationManagement.title'),
    text: t('mainPage.blogPosts.organizationManagement.description'),
    categoryName: [t('mainPage.blogCategories.organizations')]
  }
];
