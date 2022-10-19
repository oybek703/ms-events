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
	register = '/accounts/register'
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
					{user ? (
						<>
							<Link href={Routes.addEvent}>
								<a className={`btn btn-sm btn-${pathname === Routes.addEvent ? '' : 'outline-'}light`}>Add Event</a>
							</Link>
							<Link href={Routes.logout}>
								<a onClick={logout} className={`btn btn-sm btn-${pathname === Routes.logout ? '' : 'outline-'}light`}>
									<FaSignInAlt /> Logout
								</a>
							</Link>
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
					<Link href={Routes.allEvents}>
						<a className={`btn btn-sm btn-${pathname === Routes.allEvents ? '' : 'outline-'}light`}>All Events</a>
					</Link>
				</div>
			</div>
		</nav>
	)
}

export default Header
