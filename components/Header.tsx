import Link from 'next/link'

const Header = () => {
	return (
		<nav className="navbar bg-secondary">
			<div className="container-fluid px-5 d-flex align-items-center">
				<Link href={'/'}>
					<a className="navbar-brand text-white text-uppercase">MS Events</a>
				</Link>
				<Link href={'/events'}>
					<a className=" navbar-brand text-white">Events</a>
				</Link>
			</div>
		</nav>
	)
}

export default Header
