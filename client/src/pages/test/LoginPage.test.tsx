import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginPage from '../LoginPage'
import { BrowserRouter as Router } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect'

describe.skip('Login Page', () => {

    beforeEach(() => {
        render(
            <Router>
                <LoginPage />
            </Router>
        )
    })

    test('omitting the email results in an error', async () => {
        
        userEvent.type(screen.getByLabelText(/email/i), '')
        userEvent.type(screen.getByLabelText(/password/i), 'Validpassword1!')
        userEvent.click(screen.getByRole('button', { name: /log in/i}))

        await waitFor(() => {
            expect(screen.getByText('Email is a required field')).toBeInTheDocument()
          })
          
    })

    test('omitting the password results in an error', async () => {
        userEvent.type(screen.getByLabelText(/email/i), 'valid@test.com')
        userEvent.type(screen.getByLabelText(/password/i), '')
        userEvent.click(screen.getByRole('button', { name: /log in/i}))

        await waitFor(() => {
            expect(screen.getByRole('alert')).toHaveTextContent(/password/i)
          })    
    })

    test('invalid email format results in error', async () => {
        userEvent.type(screen.getByLabelText(/email/i), 'invalid.com')
        userEvent.type(screen.getByLabelText(/password/i), 'Validpassword1!')
        userEvent.click(screen.getByRole('button', { name: /log in/i}))

        await waitFor(() => {
            expect(screen.getByRole('alert')).toHaveTextContent(/email/i)
          })    
        })

        test('invalid password format results in an error', async () => {
            userEvent.type(screen.getByLabelText(/email/i), 'valid@test.com')
            userEvent.type(screen.getByLabelText(/password/i), 'invalid')
            userEvent.click(screen.getByRole('button', { name: /log in/i}))
    
            await waitFor(() => {
                expect(screen.getByRole('alert')).toHaveTextContent(/password/i)
              })    
        })
            
    
        test.skip('successful login updates context and pushes to /', async () => {
            
        })
    
    })
