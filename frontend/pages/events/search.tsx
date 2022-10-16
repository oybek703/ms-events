import { GetServerSideProps } from 'next'
import Layout from '@components/Layout'
import axios from 'axios'
import { API_URL } from '@helpers/api'
import { getEvents } from '@helpers/index'
import { IEvent } from '@interfaces/event.interface'
import React from 'react'
import EventItem from '@components/EventItem'
import { useRouter } from 'next/router'
import { stringify } from 'qs'
import Link from 'next/link'

const Search: React.FC<ISearchProps> = ({ events }) => {
	const { query } = useRouter()
	return (
		<Layout title="Search results">
			<Link href={'/events'}>
				<a>{'< '} Back to Events </a>
			</Link>
			<h1 className="my-3 fw-bold">Search results for {query.term}</h1>
			{events.length === 0 ? (
				<h4 className="fst-italic text-secondary text-center">No events found!</h4>
			) : (
				events.map(event => <EventItem event={event} key={event.id} />)
			)}
		</Layout>
	)
}

export const getServerSideProps: GetServerSideProps<ISearchProps> = async ({ query }) => {
	try {
		const { term } = query
		const queryParams = stringify(
			{
				filters: {
					$or: [
						{ name: { $contains: term } },
						{ description: { $contains: term } },
						{ performers: { $contains: term } },
						{ venue: { $contains: term } }
					]
				},
				populate: 'image'
			},
			{ encodeValuesOnly: true }
		)
		const { data } = await axios.get(`${API_URL}/api/events?${queryParams}`)
		const events = getEvents(data)
		return {
			props: {
				events
			}
		}
	} catch (e: unknown) {
		if (e instanceof Error) {
			console.log(e.message)
		}
		return {
			notFound: true
		}
	}
}

interface ISearchProps {
	events: IEvent[]
}

export default Search
