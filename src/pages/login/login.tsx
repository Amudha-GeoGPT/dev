import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { BsGithub, BsFacebook, BsMicrosoft } from 'react-icons/bs';
import { styled, keyframes } from 'styled-components';
import { useAuth } from '../../store/actions/AuthContext';

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const LoginWrapper = styled.div`
  min-height: 93.7vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(-45deg, #6e8efb, #a777e3, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: ${gradientAnimation} 15s ease infinite;
  padding: 20px;
`;

const LoginCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: clamp(20px, 5vw, 40px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  width: min(90%, 400px);
  backdrop-filter: blur(8px);
  transform: translateY(0);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  color: #4a5568;
  font-weight: 500;
  font-size: 0.9rem;
`;

const StyledInput = styled.input`
  width: 90%;
  padding: 14px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: clamp(14px, 2vw, 16px);
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.9);

  &:focus {
    outline: none;
    border-color: #6e8efb;
    box-shadow: 0 0 20px rgba(110, 142, 251, 0.2);
    transform: translateY(-2px);
  }
`;

const StyledButton = styled.button`
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  font-weight: 600;
  color: white;
  background: linear-gradient(45deg, #6e8efb, #a777e3);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 7px 14px rgba(110, 142, 251, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0));
    transform: rotate(30deg);
    transition: transform 0.5s ease;
  }

  &:hover::after {
    transform: rotate(30deg) translateY(50%);
  }
`;

const Divider = styled.div`
  position: relative;
  text-align: center;
  margin: 20px 0;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 45%;
    height: 1px;
    background: #e2e8f0;
  }
  
  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    width: 45%;
    height: 1px;
    background: #e2e8f0;
  }
  
  span {
    background: white;
    padding: 0 10px;
    color: #718096;
    font-size: 0.9rem;
  }
`;

const SocialButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-top: 20px;
`;

const SocialButton = styled.button`
  padding: 12px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    border-color: #6e8efb;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1.5rem;
  background: linear-gradient(45deg, #6e8efb, #a777e3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const socialButtons = [
  { Icon: FcGoogle, color: undefined },
  { Icon: BsGithub, color: undefined },
  { Icon: BsFacebook, color: "#1877F2" },
  { Icon: BsMicrosoft, color: "#00A4EF" }
];

export const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      navigate('/admin');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <LoginWrapper>
      <LoginCard>
        <Title>Welcome Back</Title>
        <Form onSubmit={handleSubmit}>
          <InputField>
            <Label>Email</Label>
            <StyledInput
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </InputField>
          <InputField>
            <Label>Password</Label>
            <StyledInput
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </InputField>
          <StyledButton type="submit">
            Sign In
          </StyledButton>
        </Form>

        <Divider>
          <span>Or continue with</span>
        </Divider>

        <SocialButtonsContainer>
          {socialButtons.map(({ Icon, color }, index) => (
            <SocialButton
              key={index}
              onClick={() => console.log(`${Icon.name} login clicked`)}
            >
              <Icon size={24} color={color} />
            </SocialButton>
          ))}
        </SocialButtonsContainer>
      </LoginCard>
    </LoginWrapper>
  );
};
