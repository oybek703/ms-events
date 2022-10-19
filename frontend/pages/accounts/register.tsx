import Layout from '@components/Layout'
import styles from '@styles/AuthForm.module.css'
import { FaUserAlt } from 'react-icons/fa'
import Link from 'next/link'
import { Routes } from '@components/Header'
import { FormEvent, useState } from 'react'
import { toast } from 'react-toastify'

const Register = () => {
	const [username, setUsername] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [confirmPassword, setConfirmPassword] = useState<string>('')

	function handleSubmit(event: FormEvent) {
		event.preventDefault()
		if (password !== confirmPassword) return toast.error('Password do not match!')
		console.log({ username, email, password })
	}

	return (
		<Layout title="User register">
			<form className={styles.auth} onSubmit={handleSubmit}>
				<h1 className="fw-bold d-flex justify-content-center align-content-center">
					<FaUserAlt /> &nbsp; Register
				</h1>
				<div className="mb-3">
					<label htmlFor="username" className="form-label">
						Username
					</label>
					<input
						type="text"
						value={username}
						onChange={e => setUsername(e.target.value)}
						className="form-control"
						id="username"
						aria-describedby="usernameHelp"
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="username" className="form-label">
						Email address
					</label>
					<input
						type="email"
						value={email}
						onChange={e => setEmail(e.target.value)}
						className="form-control"
						id="email"
						aria-describedby="emailHelp"
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="confirmPassword" className="form-label">
						Password
					</label>
					<input
						type="password"
						value={password}
						onChange={e => setPassword(e.target.value)}
						className="form-control"
						id="password"
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="confirmPassword" className="form-label">
						Confirm password
					</label>
					<input
						type="password"
						value={confirmPassword}
						onChange={e => setConfirmPassword(e.target.value)}
						className="form-control"
						id="confirmPassword"
					/>
				</div>
				<button type="submit" className="btn btn-outline-secondary w-100">
					Register
				</button>
				<div className="mt-3">
					Already have an account? &nbsp;
					<Link href={Routes.login}>
						<a className="btn-link">Login</a>
					</Link>
				</div>
			</form>
		</Layout>
	)
}

export default Register
