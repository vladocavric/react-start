import { useRouteError } from 'react-router-dom';

import MainNav from '../components/Layout/MainNav';

function ErrorPage() {
	const error = useRouteError();

	return (
		<>
			<MainNav />
			<main id='error-content'>
				<h1>An error occurred!</h1>
				<p>{error.statusText}</p>
				<p>{error.message}</p>
			</main>
		</>
	);
}

export default ErrorPage;
