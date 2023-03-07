import { Suspense } from 'react';
import appInfo from './app-info';
import { Footer } from './components';
import { SideNavOuterToolbar as SideNavBarLayout } from './layouts';
import routes  from './app-routes';
import { useNavigation } from './contexts/navigation';

export default function Content() {
	const location = useLocation();
	const { navigationPaths, setNavigationData } = useNavigation();

	// Set navigation
	useEffect(() => {

		console.log("Location changed: ", location);
		const path = navigationPaths.find(_ => location.pathname.startsWith(_));
		setNavigationData({ currentPath: path });
	}, [location, navigationPaths, setNavigationData]);

	return (
		<SideNavBarLayout title={appInfo.title}>
			<Suspense fallback="LOADING...">
				{useRoutes(routes)}
			</Suspense>
			<Footer>
				Copyright © 2022-{new Date().getFullYear()} {appInfo.title} Inc.
				<br />
				Order thức ăn
			</Footer>
		</SideNavBarLayout>
	);
}

