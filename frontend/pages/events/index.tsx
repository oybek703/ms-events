import Layout from '@components/Layout'
import { GetServerSideProps } from 'next'
import { IEvent } from '@interfaces/event.interface'
import axios from 'axios'
import { API_URL } from '@helpers/api'
import React, { PropsWithChildren } from 'react'
import EventItem from '@components/EventItem'
import { getEvents } from '@helpers/index'
import Pagination, { EVENT_PER_PAGE } from '@components/Pagination'

const Events: React.FC<PropsWithChildren<IEventsProps>> = ({ events, page, total }) => {
	return (
		<Layout title="My Events">
			<h1 className="my-3 fw-bold">Events</h1>
			{events.length === 0 ? <h3>No events</h3> : events.map(event => <EventItem key={event.id} event={event} />)}
			<Pagination page={page} total={total} />
		</Layout>
	)
}

export const getServerSideProps: GetServerSideProps<IEventsProps> = async ({ query }) => {
	const { page = 1 } = query
	const start = page === 1 ? 0 : (+page - 1) * EVENT_PER_PAGE
	const { data: totalData } = await axios.get(`${API_URL}/api/events`)
	const total = totalData.meta.pagination.total
	const { data } = await axios.get(`${API_URL}/api/events`, {
		params: {
			sort: ['date:asc'],
			pagination: {
				start,
				limit: EVENT_PER_PAGE
			},
			populate: {
				image: '*'
			}
		}
	})
	const events = getEvents(data)
	return {
		props: {
			events: events ?? [],
			page: +page,
			total
		}
	}
}

interface IEventsProps {
	events: IEvent[]
	page: number
	total: number
}

export default Events
