import Layout from '@components/Layout'
import { GetServerSideProps } from 'next'
import { IEvent } from '@interfaces/event.interface'
import { getEvents, parseCookies } from '@helpers/index'
import axios from 'axios'
import { API_URL } from '@helpers/api'
import React, { useState } from 'react'
import { FaPenAlt, FaTimes } from 'react-icons/fa'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

export const Dashboard: React.FC<IDashboardProps> = ({ events, token }) => {
	const { push } = useRouter()
	const [loading, setLoading] = useState<boolean>(false)
	async function handleDelete(eventId: string) {
		try {
			setLoading(true)
			await axios.delete(`${API_URL}/api/events/${eventId}`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			setLoading(false)
			await push('/events')
		} catch (e: unknown) {
			let errorMessage = 'Something went wrong!'
			if (e instanceof axios.AxiosError) {
				if (e.response?.status === 401) errorMessage = 'Unauthorized!'
				console.log(e.message)
			}
			toast.error(errorMessage)
			setLoading(false)
			console.log(e)
		}
	}

	return (
		<Layout>
			<h2 className="my-3 fw-bold">My events</h2>
			<ul className="list-group">
				{events.map(event => (
					<li
						key={event.id}
						className="list-group-item my-2 rounded-0 d-flex justify-content-between list-group-item-secondary"
					>
						<h5 className="fw-bold">
							<Link href={`/events/${event.slug}`}>{event.name}</Link>
						</h5>
						<div>
							<Link href={`/events/edit/${event.id}`}>
								<a className="btn btn-sm btn-outline-secondary mx-3">
									<FaPenAlt /> Edit Event
								</a>
							</Link>
							<a
								className={`btn btn-sm btn-outline-danger ${loading && 'disabled'}`}
								href="#"
								onClick={() => handleDelete(event.id)}
							>
								<FaTimes /> Delete Event
							</a>
						</div>
					</li>
				))}
			</ul>
		</Layout>
	)
}

export const getServerSideProps: GetServerSideProps<IDashboardProps> = async ({ req }) => {
	try {
		const { token } = parseCookies(req)
		const { data } = await axios.get(`${API_URL}/api/events/my`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		const events = getEvents(data)
		return {
			props: {
				events,
				token
			}
		}
	} catch (e: unknown) {
		if (e instanceof axios.AxiosError) {
			console.log(e.message)
			console.log(e.response?.data)
		}
		return {
			notFound: true
		}
	}
}

interface IDashboardProps {
	events: IEvent[]
	token: string
}

export default Dashboard
