import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RegisterPage from '../RegisterPage'
import { BrowserRouter as Router } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect'

describe('Register Page', () => {

    beforeEach(() => {
        render(
            <Router>
                <RegisterPage />
            </Router>
        )
    })

    test('omitting fields results in an error', async () => {
        
        userEvent.type(screen.getByLabelText(/username/i), '')
        userEvent.type(screen.getByLabelText(/email/i), '')
        userEvent.type(screen.getByLabelText(/password/i), '')
        
        userEvent.click(screen.getByRole('button', { name: /submit/i}))

        await waitFor(() => {
            expect(screen.getByText('Username is a required field')).toBeInTheDocument()
            expect(screen.getByText('Email is a required field')).toBeInTheDocument()
            expect(screen.getByText('Password must be at least 8 characters')).toBeInTheDocument()
          })
          
    })

    test('password and confirmation not matching results in an error', async () => {
        userEvent.type(screen.getByLabelText(/password/i), '1Validpass!')
        userEvent.type(screen.getByLabelText(/confirmation/i), 'doesntmatch')
        userEvent.click(screen.getByRole('button', {name: /submit/i}))
        

        await waitFor(() => {
            expect(screen.getByText(/passwords must match/i)).toBeInTheDocument()          })    
    })

    test('invalid email format results in error', async () => {
        userEvent.type(screen.getByLabelText(/email/i), 'invalid.com')
        userEvent.click(screen.getByRole('button', { name: /submit/i}))

        await waitFor(() => {
            expect(screen.getByText(/email must be a valid email/i)).toBeInTheDocument()
          })    
    })

    test('invalid password format results in an error', async () => {
        userEvent.type(screen.getByLabelText(/password/i), 'invalid')
        userEvent.click(screen.getByRole('button', { name: /submit/i}))

        await waitFor(() => {
            expect(screen.getByText(/password must/i)).toBeInTheDocument()
            })    
    })
            
    
        test.skip('successful login updates context and pushes to /', async () => {
            
        })
    
    })
