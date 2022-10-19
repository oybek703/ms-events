import Layout from '@components/Layout'
import styles from '@styles/AuthForm.module.css'
import { FaUserAlt } from 'react-icons/fa'
import Link from 'next/link'
import { Routes } from '@components/Header'
import { FormEvent, useContext, useEffect, useState } from 'react'
import { AuthContext } from '@context/AuthContext'
import { toast } from 'react-toastify'

const Login = () => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [loading, setLoading] = useState<boolean>(false)
	const { login, error, setError } = useContext(AuthContext)

	useEffect(
		function () {
			if (error) {
				toast.error(error)
				setLoading(false)
			}
			return () => setError('')
		},
		[setError, error]
	)
	async function handleSubmit(event: FormEvent) {
		event.preventDefault()
		if (!password || !email) return toast.error('Please fill email and password!')
		setLoading(true)
		await login({ email, password })
		setLoading(true)
	}

	return (
		<Layout title="User login">
			<form className={styles.auth} onSubmit={handleSubmit}>
				<h1 className="fw-bold d-flex justify-content-center align-content-center">
					<FaUserAlt /> &nbsp; Login
				</h1>
				<div className="mb-3">
					<label htmlFor="email" className="form-label">
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
					<label htmlFor="password" className="form-label">
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
				<button disabled={loading} type="submit" className="btn btn-outline-secondary w-100">
					Login
				</button>
				<div className="mt-3">
					Does not have an account? &nbsp;
					<Link href={Routes.register}>
						<a className="btn-link">Register</a>
					</Link>
				</div>
			</form>
		</Layout>
	)
}

export default Login
