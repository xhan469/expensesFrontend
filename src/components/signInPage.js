import { Form, Button, FormControl, InputGroup, Card, Spinner, Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { SignIn } from '../services/authentication';
import "../App.css";

const SignInPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // Loading state
    const [errorMessage, setErrorMessage] = useState("Use the username 'john' and password 'pass' to test."); // Error message state

    const dispatch = useDispatch();

    const handleSignIn = async (event) => {
        event.preventDefault();
        setLoading(true);  // Start loading when form is submitted
        setErrorMessage(''); // Clear previous error message
    
        const response = await SignIn(dispatch, { username, password });
        setLoading(false);  // Stop loading after sign-in process completes
    
        if (response.success) {
            // Sign-in successful
            console.log('Sign-in successful');
            // Redirect or show success message here
        } else if (response.status === 401) {
            // Unauthorized: wrong credentials
            setErrorMessage('Incorrect username or password');
        } else {
            // Some other error occurred
            setErrorMessage('An error occurred during sign-in. Please try again.');
        }
    };

    return (
        <section className='hero2'>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', paddingTop: '8rem', alignItems: 'flex-start' }}>
                <Card className='transparentCard2' style={{ width: '40rem', padding: '3rem', height: 'auto', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
                    <Form onSubmit={handleSignIn}>
                        <h4 className="text-center mb-4" style={{ color: 'black', fontWeight: 'bold' }}>Welcome back</h4>

                        {/* Display error message */}
                        {errorMessage && (
                        <p className="text-danger" style={{ textAlign: 'center', fontSize: '1rem' }}>
                            {errorMessage}
                        </p>
                    )}

                        <div className="floating-label2">
                            <InputGroup className="mb-4">
                                <FormControl
                                    placeholder=" "
                                    value={username}
                                    onChange={(event) => setUsername(event.target.value)}
                                    required
                                    id="floating-username"
                                />
                                <label htmlFor="floating-username">Username</label>
                            </InputGroup>
                        </div>

                        <div className="floating-label2">
                            <InputGroup className="mb-4">
                                <FormControl
                                    placeholder=" "
                                    type="password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    required
                                    id="floating-password"
                                />
                                <label htmlFor="floating-password">Password</label>
                            </InputGroup>
                        </div>

                        <Button className='signinButton' type='submit' variant='primary' disabled={loading}>
                            {loading ? (
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                            ) : 'Sign In'}
                        </Button>
                    </Form>
                </Card>
            </div>
        </section>
    );
};

export default SignInPage;
