import Search from '@components/Search'
import Link from 'next/link'

const Header = () => {
	return (
		<nav className="navbar bg-secondary">
			<div className="container-fluid px-5 d-flex align-items-center">
				<Link href={'/'}>
					<a className="navbar-brand text-white text-uppercase">MS Events</a>
				</Link>
				<Search />
				<div className="d-flex justify-content-between">
					<Link href={'/events/add'}>
						<a className="btn btn-sm btn-outline-light mx-2">Add Event</a>
					</Link>
					<Link href={'/events'}>
						<a className="btn btn-sm btn-outline-light">All Events</a>
					</Link>
				</div>
			</div>
		</nav>
	)
}

export default Header
