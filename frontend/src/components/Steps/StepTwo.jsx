import { useState } from 'react'
import styles from './steps.module.css'

function StepTwo({ formData, setFormData }) {

	const handleUsername = (event) => {
		setFormData({ ...formData, username: event.target.value })
	}

	const handleName = (event) => {
		setFormData({ ...formData, name: event.target.value })
	}

	const handlePhone = (event) => {
		setFormData({ ...formData, phoneNumber: event.target.value })
	}

	const handleBiography = (event) => {
		setFormData({ ...formData, biography: event.target.value })
	}

	const handleGender = (event) => {
		setFormData({ ...formData, gender: event.target.value })
	}

	return (
		<div className={styles.fieldsLayout2}>
			<div className={`${styles.formField} ${styles.colFull}`}>
				<label>Nombre:</label>
				<input onChange={handleName} className='' placeholder='' type='text' />
			</div>
			<div className={`${styles.formField} ${styles.colFull}`}>
				<label>Biografía:</label>
				<textarea
					onChange={handleBiography}
					className=''
					placeholder=''
				></textarea>
			</div>
			<div className={`${styles.formField} ${styles.colFull}`}>
				<label>Género:</label>
				<div className={styles.radioOptions}>
					<div className={styles.radioField}>
						<input
							onChange={handleGender}
							checked={formData.gender === 'M'}
							type='radio'
							id='male'
							value='M'
						/>
						<label htmlFor='male'>Masculino</label>
					</div>
					<div className={styles.radioField}>
						<input
							onChange={handleGender}
							checked={formData.gender === 'F'}
							type='radio'
							id='female'
							value='F'
						/>
						<label htmlFor='female'>Femenino</label>
					</div>
				</div>
			</div>
			<div className={styles.formField}>
				<label>Nombre de usuario:</label>
				<input
					onChange={handleUsername}
					className=''
					placeholder=''
					type='text'
				/>
			</div>
			<div className={styles.formField}>
				<label>Teléfono:</label>
				<input onChange={handlePhone} className='' placeholder='' type='text' />
			</div>
		</div>
	)
}

export default StepTwo
