import Search from '@components/Search'
import Link from 'next/link'
import { useRouter } from 'next/router'

enum Routes {
	allEvents = '/events',
	addEvent = '/events/add'
}

const Header = () => {
	const { pathname } = useRouter()
	return (
		<nav className="navbar bg-secondary">
			<div className="container-fluid d-grid px-5 d-flex align-items-center">
				<Link href={'/'}>
					<a className="fw-bold fst-italic text-uppercase btn btn-sm btn-outline-light">Music Events</a>
				</Link>
				<Search />
				<div className="d-flex justify-content-between">
					<Link href={'/events/add'}>
						<a className={`btn btn-sm btn-${pathname === Routes.addEvent ? '' : 'outline-'}light`}>Add Event</a>
					</Link>
					<Link href={'/events'}>
						<a className={`btn btn-sm btn-${pathname === Routes.allEvents ? '' : 'outline-'}light mx-2`}>All Events</a>
					</Link>
				</div>
			</div>
		</nav>
	)
}

export default Header
