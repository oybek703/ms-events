import Link from 'next/link'
import { FaBackward, FaForward } from 'react-icons/fa'
import React from 'react'

interface IPaginationProps {
	page: number
	total: number
}

export const EVENT_PER_PAGE = 3

const Pagination: React.FC<IPaginationProps> = ({ page, total }) => {
	const lastPage = Math.ceil(total / EVENT_PER_PAGE)
	if (total <= 3) return null
	return (
		<nav aria-label="Page navigation example">
			<ul className="pagination">
				<li title="Previous" className={`page-item ${page === 1 && 'disabled'}`}>
					<Link href={`/events?page=${page - 1}`}>
						<a className="page-link">
							<FaBackward />
						</a>
					</Link>
				</li>
				<li title="Next" className={`page-item ${page >= lastPage && 'disabled'}`}>
					<Link href={`/events?page=${page + 1}`}>
						<a className="page-link">
							<FaForward />
						</a>
					</Link>
				</li>
			</ul>
		</nav>
	)
}

export default Pagination
