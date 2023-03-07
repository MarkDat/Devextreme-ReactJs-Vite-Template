export const navigation = [
  {
    text: 'Thống kê',
    path: '/dashboard',
    icon: 'fa-regular fa-chart-line-up'
  },
  {
    text: 'Đặt đơn',
    icon: 'fa-regular fa-pot-food',
    items: [
      {
        text: 'Danh sách',
        icon: 'fa-regular fa-cart-shopping',
        path: '/orders'
      }
    ]
  },
  {
    text: 'Hóa đơn',
    path: '/payment',
    icon: 'fa-regular fa-money-check-dollar-pen'
  }, 
  {
    text: 'Cài đặt',
    path: '/setting',
    icon: 'fa-regular fa-gears'
  }
];
