import { IApiEvent, IEvent } from '@interfaces/event.interface'

export function getEvents(response: { data: IApiEvent[] }): IEvent[] {
	const { data = [] } = response
	return data.map((event: IApiEvent) => ({
		name: event.attributes.name,
		slug: event.attributes.slug,
		address: event.attributes.address,
		venue: event.attributes.venue,
		description: event.attributes.description,
		performers: event.attributes.performers,
		image: event.attributes.image.data.attributes.url,
		date: event.attributes.date,
		id: event.id,
		time: event.attributes.time,
		imageFormats: event.attributes.image.data.attributes.formats
	}))
}
