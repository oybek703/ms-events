import Layout from '@components/Layout'
import Link from 'next/link'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import styles from '@styles/Add.module.css'
import { toast } from 'react-toastify'
import axios from 'axios'
import { API_URL } from '@helpers/api'
import { IApiEvent, IFormValues } from '@interfaces/event.interface'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { parseCookies } from '@helpers/index'
import { Routes } from '@components/Header'

const Add: React.FC<IAddProps> = ({ token }) => {
	const { push } = useRouter()
	const [loading, setLoading] = useState<boolean>(false)
	const [formValues, setFormValues] = useState<IFormValues>({
		name: '',
		address: '',
		date: '',
		time: '',
		performers: '',
		venue: ''
	})

	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		setFormValues({
			...formValues,
			[event.currentTarget.name]: event.target.value
		})
	}

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
		try {
			if (Object.values(formValues).some(value => value === '')) {
				return toast.error('Please fill all fields!', {
					theme: 'colored'
				})
			} else {
				setLoading(true)
				await axios.post(
					`${API_URL}/api/events`,
					{ data: formValues },
					{
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${token}`
						}
					}
				)
				setLoading(false)
				await push(Routes.dashboard)
			}
		} catch (e: unknown) {
			if (e instanceof Error) {
				console.log(e.message)
				toast.error(e.message)
			}
			setLoading(false)
			console.log(e)
		}
	}

	return (
		<Layout title="Add new event">
			<Link href={'/events'}>
				<a>{'< '} Back to Events </a>
			</Link>
			<h1 className="text-center">Add new event</h1>
			<form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles.grid}>
					<div>
						<label className="form-label" htmlFor="name">
							Event name
						</label>
						<input
							className="form-control"
							value={formValues.name}
							onChange={handleChange}
							type="text"
							id="name"
							name="name"
							placeholder="Enter name..."
						/>
					</div>
					<div>
						<label className="form-label" htmlFor="performers">
							Event performers
						</label>
						<input
							className="form-control"
							value={formValues.performers}
							onChange={handleChange}
							type="text"
							id="performers"
							name="performers"
							placeholder="Enter performers..."
						/>
					</div>
					<div>
						<label className="form-label" htmlFor="performers">
							Event venue
						</label>
						<input
							className="form-control"
							value={formValues.venue}
							onChange={handleChange}
							type="text"
							id="venue"
							name="venue"
							placeholder="Enter venue..."
						/>
					</div>
					<div>
						<label className="form-label" htmlFor="performers">
							Event address
						</label>
						<input
							className="form-control"
							value={formValues.address}
							onChange={handleChange}
							type="text"
							id="address"
							name="address"
							placeholder="Enter address..."
						/>
					</div>
					<div>
						<label className="form-label" htmlFor="performers">
							Event date
						</label>
						<input
							className="form-control"
							value={formValues.date}
							onChange={handleChange}
							type="date"
							id="date"
							name="date"
							placeholder="Enter date..."
						/>
					</div>
					<div>
						<label className="form-label" htmlFor="performers">
							Event time
						</label>
						<input
							className="form-control"
							value={formValues.time}
							onChange={handleChange}
							type="text"
							id="time"
							name="time"
							placeholder="Enter time..."
						/>
					</div>
				</div>
				<input type="submit" value="Add event" className={`btn btn-outline-secondary ${loading && 'disabled'}`} />
			</form>
		</Layout>
	)
}

export const getServerSideProps: GetServerSideProps<IAddProps> = async ({ req }) => {
	const { token } = parseCookies(req)
	try {
		return {
			props: {
				token
			}
		}
	} catch (e: unknown) {
		if (e instanceof axios.AxiosError) {
			console.log(e.message)
		}
		console.log(e)
		return {
			notFound: true
		}
	}
}

interface IAddProps {
	token: string
}

export default Add
