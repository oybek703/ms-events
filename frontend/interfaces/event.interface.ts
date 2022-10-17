export interface IEvent {
	id: string
	name: string
	slug: string
	venue: string
	address: string
	performers: string
	date: Date
	time: string
	description: string
	image: string
}

export interface ProviderMetadata {
	public_id: string
	resource_type: string
}

export interface Thumbnail {
	name: string
	hash: string
	ext: string
	mime: string
	path?: any
	width: number
	height: number
	size: number
	url: string
	provider_metadata: ProviderMetadata
}

export interface ProviderMetadata2 {
	public_id: string
	resource_type: string
}

export interface Small {
	name: string
	hash: string
	ext: string
	mime: string
	path?: any
	width: number
	height: number
	size: number
	url: string
	provider_metadata: ProviderMetadata2
}

export interface ProviderMetadata3 {
	public_id: string
	resource_type: string
}

export interface Medium {
	name: string
	hash: string
	ext: string
	mime: string
	path?: any
	width: number
	height: number
	size: number
	url: string
	provider_metadata: ProviderMetadata3
}

export interface ProviderMetadata4 {
	public_id: string
	resource_type: string
}

export interface Large {
	name: string
	hash: string
	ext: string
	mime: string
	path?: any
	width: number
	height: number
	size: number
	url: string
	provider_metadata: ProviderMetadata4
}

export interface Formats {
	thumbnail: Thumbnail
	small: Small
	medium: Medium
	large: Large
}

export interface ProviderMetadata5 {
	public_id: string
	resource_type: string
}

export interface Attributes2 {
	name: string
	alternativeText: string
	caption: string
	width: number
	height: number
	formats: Formats
	hash: string
	ext: string
	mime: string
	size: number
	url: string
	previewUrl?: any
	provider: string
	provider_metadata: ProviderMetadata5
	createdAt: Date
	updatedAt: Date
}

export interface Data {
	id: number
	attributes: Attributes2
}

export interface Image {
	data?: Data
}

export interface Attributes {
	name: string
	slug: string
	venue: string
	address: string
	date: Date
	time: string
	performers: string
	description: string
	createdAt: Date
	updatedAt: Date
	publishedAt: Date
	image: Image
}

export interface IApiEvent {
	id: string
	attributes: Attributes
}

export interface IFormValues {
	name: string
	performers: string
	venue: string
	address: string
	date: string
	time: string
}
