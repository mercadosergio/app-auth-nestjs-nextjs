'use client'
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
import { useAuth } from '@/hooks/useAuth'

const steps = ['Datos de la cuenta', 'Datos personales']

function MultiStepForm() {
	const [activeStep, setActiveStep] = useState(0)
	const [skipped, setSkipped] = useState(new Set())

	const { errors, setErrors, register } = useAuth()
	// const [errors, setErrors] = useState([])
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

	const signUp = async (event) => {
		event.preventDefault()
		setErrors([])
		register(formData)
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
				<form className={styles.form} onSubmit={signUp}>
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
