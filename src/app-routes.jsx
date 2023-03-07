import { lazy, Suspense } from 'react';
import { Navigate } from 'react-router-dom';

const routes = [
	{
        path: '/dashboard',
        element: <WrapLazyRoute LazyElement={lazy(() => import("./pages/home/home"))} />
    },
	{
		path: '/orders',
		element: <WrapLazyRoute LazyElement={lazy(() => import("./pages/orders/orders"))} />,
		children: [
			{
				index: true,
				element: <WrapLazyRoute LazyElement={lazy(() => import("./pages/orders/list/list"))} />,
			},
			{
				path: ':orderId',
				element: <WrapLazyRoute LazyElement={lazy(() => import("./pages/orders/details/order-details"))} /> 
			}
		]
	},
	{
		path: '/payment',
		element: <WrapLazyRoute LazyElement={lazy(() => import("./pages/payment/payment"))} />
	},
	{
		path: '/setting',
		element:  <WrapLazyRoute LazyElement={lazy(() => import("./pages/setting/setting"))} />
	},
	{
		path:'*',
		element: <Navigate to='/orders' />
	}
];


// lazy loading
export function WrapLazyRoute({LazyElement}) {

	return (
		<Suspense fallback="Loading...">
			<LazyElement />
		</Suspense>
	);
}

export default routes;
