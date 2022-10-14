import Layout from '../components/Layout'
import Link from 'next/link'
import { FaExclamationTriangle } from 'react-icons/fa'

const NotFound = () => {
	return (
		<Layout title="Page not found">
			<div className="text-center d-grid align-content-center justify-content-center gap-5 h-100">
				<h1 className="fw-bold h1">
					<FaExclamationTriangle color="red" /> &nbsp; 404
				</h1>
				<h4 className="fw-bold">Sorry, requested page not found!</h4>
				<Link href="/">
					<a className="d-block text-center btn-outline-light border p-1 rounded">Back to Home</a>
				</Link>
			</div>
		</Layout>
	)
}

export default NotFound
