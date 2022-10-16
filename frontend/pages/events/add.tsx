import Layout from '@components/Layout'
import Link from 'next/link'
import React, { ChangeEvent, useState } from 'react'
import styles from '@styles/Add.module.css'

interface IFormValues {
	name: string
	performers: string
	venue: string
	address: string
	date: string
	time: string
}

const Add = () => {
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
	return (
		<Layout title="Add new event">
			<Link href={'/events'}>
				<a>{'< '} Back to Events </a>
			</Link>
			<h1 className="text-center">Add new event</h1>
			<form className={styles.form}>
				<div className={styles.grid}>
					<div>
						<label htmlFor="name">Event name</label>
						<input
							value={formValues.name}
							onChange={handleChange}
							type="text"
							id="name"
							name="name"
							placeholder="Enter name..."
						/>
					</div>
					<div>
						<label htmlFor="performers">Event performers</label>
						<input
							value={formValues.performers}
							onChange={handleChange}
							type="text"
							id="performers"
							name="performers"
							placeholder="Enter performers..."
						/>
					</div>
					<div>
						<label htmlFor="performers">Event venue</label>
						<input
							value={formValues.venue}
							onChange={handleChange}
							type="text"
							id="venue"
							name="venue"
							placeholder="Enter venue..."
						/>
					</div>
					<div>
						<label htmlFor="performers">Event address</label>
						<input
							value={formValues.address}
							onChange={handleChange}
							type="text"
							id="address"
							name="address"
							placeholder="Enter address..."
						/>
					</div>
					<div>
						<label htmlFor="performers">Event date</label>
						<input
							value={formValues.date}
							onChange={handleChange}
							type="date"
							id="date"
							name="date"
							placeholder="Enter date..."
						/>
					</div>
					<div>
						<label htmlFor="performers">Event time</label>
						<input
							value={formValues.time}
							onChange={handleChange}
							type="text"
							id="time"
							name="time"
							placeholder="Enter time..."
						/>
					</div>
				</div>
				<input type="submit" value="Add event" className="btn btn-outline-secondary" />
			</form>
		</Layout>
	)
}

export default Add
