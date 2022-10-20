import Search from '@components/Search'
import { FaSignInAlt } from 'react-icons/fa'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { AuthContext } from '@context/AuthContext'

export enum Routes {
	allEvents = '/events',
	addEvent = '/events/add',
	login = '/accounts/login',
	logout = '/accounts/logout',
	register = '/accounts/register',
	dashboard = '/accounts/dashboard'
}

const Header = () => {
	const { pathname } = useRouter()
	const { user, logout } = useContext(AuthContext)
	return (
		<nav className="navbar bg-secondary">
			<div className="container-fluid d-grid px-5 d-flex align-items-center">
				<Link href={'/'}>
					<a className="fw-bold fst-italic text-uppercase btn btn-sm btn-outline-light">Music Events</a>
				</Link>
				<Search />
				<div className="d-flex justify-content-between gap-1">
					<Link href={Routes.allEvents}>
						<a className={`btn btn-sm btn-${pathname === Routes.allEvents ? '' : 'outline-'}light`}>All Events</a>
					</Link>
					{user ? (
						<>
							<Link href={Routes.addEvent}>
								<a className={`btn btn-sm btn-${pathname === Routes.addEvent ? '' : 'outline-'}light`}>Add Event</a>
							</Link>
							<Link href={Routes.dashboard}>
								<a className={`btn btn-sm btn-${pathname === Routes.dashboard ? '' : 'outline-'}light`}>Dashboard</a>
							</Link>
							<button onClick={logout} className="btn btn-sm btn-outline-danger text-white border-white">
								<FaSignInAlt /> Logout
							</button>
						</>
					) : (
						<>
							<Link href={Routes.login}>
								<a className={`btn btn-sm btn-${pathname === Routes.login ? '' : 'outline-'}light`}>Login</a>
							</Link>
							<Link href={Routes.register}>
								<a className={`btn btn-sm btn-${pathname === Routes.register ? '' : 'outline-'}light`}>Register</a>
							</Link>
						</>
					)}
				</div>
			</div>
		</nav>
	)
}

export default Header
