import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '@helpers/api'
import { toast } from 'react-toastify'
import { FaSpinner } from 'react-icons/fa'
import styles from '@styles/ImageUpload.module.css'

interface IImageUploadProps {
	eventId: string
	onImageUpload: () => void
	token: string
}

const ImageUpload: React.FC<IImageUploadProps> = ({ onImageUpload, eventId, token }) => {
	const [uploading, setUploading] = useState<boolean>(false)
	const [image, setImage] = useState<Blob | MediaSource | null>(null)
	const [preview, setPreview] = useState<string>('')

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
		try {
			setUploading(true)
			const formData = new FormData()
			formData.append('files', image as Blob)
			formData.append('ref', 'api::event.event')
			formData.append('refId', eventId)
			formData.append('field', 'image')
			await axios.post(`${API_URL}/api/upload`, formData, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			setUploading(false)
			onImageUpload()
		} catch (e: unknown) {
			let errorMessage = 'Something went wrong!'
			if (e instanceof axios.AxiosError) {
				console.log(e.message)
				errorMessage = e.response?.data.error.message
			}
			toast.error(errorMessage)
			console.log(e)
			setUploading(false)
		}
	}

	function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
		if (event.target.files) setImage(event.target.files[0])
	}

	useEffect(
		function () {
			if (!image) {
				setPreview('')
				return
			}
			const objectURL = URL.createObjectURL(image)
			setPreview(objectURL)
			return () => URL.revokeObjectURL(objectURL)
		},
		[image]
	)

	return (
		<div className="container-fluid">
			<h1>Upload event image</h1>
			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<input type="file" accept="image/*" className="form-control" onChange={handleFileChange} />
				</div>
				<button disabled={uploading} type="submit" className="btn btn-outline-secondary w-100">
					Upload {uploading && <FaSpinner className={styles.loaderIcon} />}
				</button>
				<div className="container-fluid text-center">
					{/* eslint-disable-next-line @next/next/no-img-element */}
					{image && <img width={300} height={300} className="rounded m-2" src={preview} alt={image.name} />}
				</div>
			</form>
		</div>
	)
}

export default ImageUpload
