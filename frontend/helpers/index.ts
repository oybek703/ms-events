import { IApiEvent, IEvent } from '@interfaces/event.interface'

function getEventGeneric<T extends IApiEvent, K extends IEvent>(data: T): K {
	const image = !data.attributes.image.data ? null : data.attributes.image.data?.attributes.url
	return {
		name: data.attributes.name,
		slug: data.attributes.slug,
		address: data.attributes.address,
		venue: data.attributes.venue,
		description: data.attributes.description,
		performers: data.attributes.performers,
		image,
		date: data.attributes.date,
		id: data.id,
		time: data.attributes.time
	} as K
}

export function getEvents(response: { data: IApiEvent[] }): IEvent[] {
	const { data = [] } = response
	return data.map(event => getEventGeneric(event))
}

export function getEvent(response: { data: IApiEvent }) {
	let { data } = response
	if (Array.isArray(data)) data = data[0]
	return getEventGeneric(data)
}
