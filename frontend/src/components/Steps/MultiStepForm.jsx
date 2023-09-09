'use client'
import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import styles from '@/app/auth/register/register.module.css'
import StepOne from './StepOne'
import StepTwo from './StepTwo'
import { API_URL } from '@/config/environment'

const steps = ['Datos de la cuenta', 'Datos personales']

function MultiStepForm() {
	const [activeStep, setActiveStep] = useState(0)
	const [skipped, setSkipped] = useState(new Set())

	const [errors, setErrors] = useState([])
	const [formData, setFormData] = useState({
		name: '',
		biography: '',
		email: '',
		password: '',
		confirmPassword: '',
		phoneNumber: '',
		gender: '',
		username: '',
	})

	const router = useRouter()

	const onRegister = async (event) => {
		event.preventDefault()
		setErrors([])

		const dataRegister = formData
		try {
			const response = await axios.post(
				`${API_URL}/auth/register`,
				dataRegister,
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
			setFormData({
				name: '',
				biography: '',
				email: '',
				password: '',
				confirmPassword: '',
				phoneNumber: '',
				gender: '',
				username: '',
			})
		} catch (error) {
			if (error.response && error.response.data) {
				const validationErrors = error.response.data.message
				setErrors(validationErrors)
			} else {
				console.log('Error de conexión: ', error.message)
			}
			return
		}

		router.push('/auth/login')
	}

	const isStepSkipped = (step) => {
		return skipped.has(step)
	}

	const handleNext = () => {
		let newSkipped = skipped
		if (isStepSkipped(activeStep)) {
			newSkipped = new Set(newSkipped.values())
			newSkipped.delete(activeStep)
		}

		setActiveStep((prevActiveStep) => prevActiveStep + 1)
		setSkipped(newSkipped)
	}

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1)
	}

	return (
		<Box sx={{ width: '100%' }}>
			<Stepper activeStep={activeStep}>
				{steps.map((label, index) => {
					const stepProps = {}
					const labelProps = {}
					if (isStepSkipped(index)) {
						stepProps.completed = false
					}
					return (
						<Step key={label} {...stepProps}>
							<StepLabel {...labelProps}>{label}</StepLabel>
						</Step>
					)
				})}
			</Stepper>
			{
				<form className={styles.form} onSubmit={onRegister}>
					<h1>Registrarse</h1>
					{activeStep == 0 && (
						<StepOne formData={formData} setFormData={setFormData} />
					)}
					{activeStep == 1 && (
						<StepTwo formData={formData} setFormData={setFormData} />
					)}
					<Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
						<Button
							color='inherit'
							disabled={activeStep === 0}
							onClick={handleBack}
							sx={{ mr: 1 }}
						>
							Back
						</Button>
						<Box sx={{ flex: '1 1 auto' }} />

						{activeStep === steps.length - 1 ? (
							<button className={styles.registerButton} type='submit'>
								Sign up
							</button>
						) : (
							<Button type='button' onClick={handleNext}>
								Next
							</Button>
						)}
					</Box>
					{errors.length > 0 && (
						<div className={styles.errors}>
							<ul className=''>
								{errors.map((error, index) => (
									<li key={error}>
										{(index += 1)}. {error}
									</li>
								))}
							</ul>
						</div>
					)}
				</form>
			}
		</Box>
	)
}

export default MultiStepForm
