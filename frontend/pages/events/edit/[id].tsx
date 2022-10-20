import Layout from '@components/Layout'
import Link from 'next/link'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import styles from '@styles/Add.module.css'
import { toast } from 'react-toastify'
import axios from 'axios'
import { API_URL } from '@helpers/api'
import { IApiEvent, IEvent, IFormValues } from '@interfaces/event.interface'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { getEvent, parseCookies } from '@helpers/index'
import { format } from 'date-fns'
import Image from 'next/image'
import { FaImage } from 'react-icons/fa'
import Modal from '@components/Modal'
import ImageUpload from '@components/ImageUpload'
import { Routes } from '@components/Header'

const Edit: React.FC<IEditProps> = ({ event, token }) => {
	const { push } = useRouter()
	const [loading, setLoading] = useState<boolean>(false)
	const [imagePreview, setImagePreview] = useState<string | null>(event.image ?? null)
	const [formValues, setFormValues] = useState<IFormValues>({
		name: event.name,
		address: event.address,
		date: format(new Date(event.date), 'yyyy-MM-dd'),
		time: event.time,
		performers: event.performers,
		venue: event.venue
	})
	const [modal, setModal] = useState<boolean>(false)
	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		setFormValues({
			...formValues,
			[event.currentTarget.name]: event.target.value
		})
	}

	async function handleSubmit(formEvent: FormEvent<HTMLFormElement>) {
		formEvent.preventDefault()
		try {
			if (Object.values(formValues).some(value => value === '')) {
				return toast.error('Please fill all fields!')
			} else {
				setLoading(true)
				const { data } = await axios.put(
					`${API_URL}/api/events/${event.id}`,
					{ data: formValues },
					{
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${token}`
						}
					}
				)
				const { data: responseData }: { data: IApiEvent } = data
				setLoading(false)
				await push(`/events/${responseData.attributes.slug}`)
			}
		} catch (e: unknown) {
			let errorMessage = 'Something went wrong!'
			if (e instanceof axios.AxiosError) {
				console.log(e.message)
				if (e.response?.status === 401) errorMessage = 'Unauthorized!'
			}
			toast.error(errorMessage)
			setLoading(false)
			console.log(e)
		}
	}

	async function onImageUpload() {
		try {
			const { data } = await axios.get(`${API_URL}/api/events/${event.id}?populate=image`)
			const updatedEvent = getEvent(data)
			setImagePreview(updatedEvent.image)
			setModal(false)
		} catch (e: unknown) {
			if (e instanceof Error) {
				console.log(e.message)
				toast.error(e.message)
			}
			console.log(e)
		}
	}

	return (
		<Layout title="Edit event">
			<Link href={Routes.allEvents}>
				<a>{'< '} Back to Events </a>
			</Link>
			<h1 className="text-center">Edit event</h1>
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
				<input type="submit" value="Update event" className={`btn btn-outline-secondary ${loading && 'disabled'}`} />
			</form>
			<h2>Event image</h2>
			{imagePreview ? (
				<Image className="rounded" src={imagePreview} width={170} height={100} alt={event.slug} />
			) : (
				<div>No image</div>
			)}
			<div>
				<button onClick={() => setModal(true)} className="btn btn-outline-secondary">
					<FaImage /> Set Image
				</button>
			</div>
			<Modal show={modal} onClose={() => setModal(false)}>
				<ImageUpload token={token} eventId={event.id} onImageUpload={onImageUpload} />
			</Modal>
		</Layout>
	)
}

export const getServerSideProps: GetServerSideProps<IEditProps> = async ({ params, req }) => {
	if (!params) return { notFound: true }
	try {
		const { token } = parseCookies(req)
		const { data } = await axios.get(`${API_URL}/api/events/${params.id}?populate=image`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		const event = getEvent(data)
		return {
			props: {
				event,
				token
			}
		}
	} catch (e: unknown) {
		if (e instanceof axios.AxiosError) {
			console.log(e.message)
		}
		return { notFound: true }
	}
}

interface IEditProps {
	event: IEvent
	token: string
}

export default Edit
