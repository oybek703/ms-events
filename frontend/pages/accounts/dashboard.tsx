import Layout from '@components/Layout'
import { GetServerSideProps } from 'next'
import { IEvent } from '@interfaces/event.interface'
import { getEvents, parseCookies } from '@helpers/index'
import axios from 'axios'
import { API_URL } from '@helpers/api'
import React from 'react'
import { FaPenAlt, FaTimes } from 'react-icons/fa'
import Link from 'next/link'

export const Dashboard: React.FC<IDashboardProps> = ({ events }) => {
	function handleDelete(id: string) {
		console.log(id)
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
						<h5 className="fw-bold">{event.name}</h5>
						<div>
							<Link href={`/events/edit/${event.id}`}>
								<a className="btn btn-sm btn-outline-secondary mx-3">
									<FaPenAlt /> Edit Event
								</a>
							</Link>
							<a className={'btn btn-sm btn-outline-danger'} href="#" onClick={() => handleDelete(event.id)}>
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
	const { token } = parseCookies(req)
	const { data } = await axios.get(`${API_URL}/api/events/my`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	})
	const events = getEvents(data)
	return {
		props: {
			events
		}
	}
}

interface IDashboardProps {
	events: IEvent[]
}

export default Dashboard
