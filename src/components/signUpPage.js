import { useState } from 'react';
import { Form, Button, FormControl, InputGroup, Card, Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { SignUp } from '../services/authentication';

const SignUpPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false); 
    const [errorMessage, setErrorMessage] = useState(''); // State for error message

    const dispatch = useDispatch();
    const isDisabled = password !== confirmPassword || password.length <= 0;

    const handleSignUp = async (event) => {
        event.preventDefault();
        setLoading(true);  // Start loading when the form is submitted
        setErrorMessage('');  // Clear any previous error message

        const result = await SignUp(dispatch, { username, email, password });
        
        if (!result.success) {
            if (result.status === 409) {
                setErrorMessage('Username already exists');  // Specific message for 409
            } else {
                setErrorMessage('An error occurred. Please try again.');
            }
            setLoading(false);  // Stop loading when there's an error
        } else {
            setLoading(false);  // Stop loading after successful sign-up
        }
    };

    return (
        <section className='hero'>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', paddingTop: '8rem', alignItems: 'flex-start' }}>
                <Card className="transparentCard" style={{ width: '40rem', padding: '3rem', height: 'auto', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
                    <h4 className="text-center mb-4" style={{ color: 'white', fontWeight: 'bold' }}>Create Your Account</h4>
                    {errorMessage && (
                        <p className="text-danger" style={{ textAlign: 'center', fontSize: '1rem' }}>
                            {errorMessage}
                        </p>
                    )}
                    <Form onSubmit={handleSignUp}>
                        {/* Username Input */}
                        <div className="floating-label">
                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder=" "
                                    value={username}
                                    onChange={(event) => setUsername(event.target.value)}
                                    required
                                    id="username"
                                />
                                <label htmlFor="username">Username</label>
                            </InputGroup>
                        </div>

                        {/* Email Input */}
                        <div className="floating-label">
                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder=" "
                                    type="email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    required
                                    id="email"
                                />
                                <label htmlFor="email">Email</label>
                            </InputGroup>
                        </div>

                        {/* Password Input */}
                        <div className="floating-label">
                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder=" "
                                    type="password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    required
                                    id="password"
                                />
                                <label htmlFor="password">Password</label>
                            </InputGroup>
                        </div>

                        {/* Confirm Password Input */}
                        <div className="floating-label">
                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder=" "
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(event) => setConfirmPassword(event.target.value)}
                                    required
                                    id="confirm-password"
                                />
                                <label htmlFor="confirm-password">Confirm Password</label>
                            </InputGroup>
                        </div>

                        {password !== confirmPassword && (
                            <p className="text-danger" style={{ fontSize: '0.9rem', textAlign: 'center' }}>
                                Passwords do not match
                            </p>
                        )}

                        <Button
                            className='signupButton'
                            type='submit'
                            variant='success'
                            disabled={isDisabled || loading}
                        >
                            {loading ? (
                                <>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                    Loading...
                                </>
                            ) : (
                                'Sign Up'
                            )}
                        </Button>
                    </Form>
                </Card>
            </div>
        </section>
    );
};

export default SignUpPage;
