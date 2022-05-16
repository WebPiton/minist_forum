import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const ButtonBlue = styled.button`
  font-weight: 500;
  background: #1CB0F6;
  border-radius: 7px;
  border: none;
  color: #FFFFFF;
  box-shadow: 0px 4px 0px #229bd5;
  padding: 6px 20px;
  font-size: 20px;
  transition: ease-in-out 0.3s;
  cursor: pointer;
  box-sizing: border-box;

  &:hover {
      background: #41C2FF;
      box-shadow: 0px 4px 0px #229bd5;;
  }
`

export const ButtonGreen = styled.button`
    font-weight: 500;
    background: #45D62F;
    border-radius: 7px;
    border: none;
    color: #FFFFFF;
    box-shadow: 0px 4px 0px #4aa936;
    padding: 6px 20px;
    font-size: 20px;
    transition: ease-in-out 0.3s;
    cursor: pointer;
    box-sizing: border-box;

  &:hover {
    background: #38e115;
    border: 3px solid #38e115;
  }
`

export const ButtonRed = styled.button`
    font-weight: 500;
    background: #ff0000;
    border-radius: 7px;
    border: none;
    color: #FFFFFF;
    box-shadow: 0px 4px 0px #c70404;
    padding: 6px 20px;
    font-size: 20px;
    transition: ease-in-out 0.3s;
    cursor: pointer;
    box-sizing: border-box;

  &:hover {
    background: #ff2121;
    box-shadow: 0px 4px 0px #c70404;
  }
`

export const LinkBlue = styled(Link)`
  font-weight: 500;
  background: #1CB0F6;
  border-radius: 7px;
  border: none;
  color: #FFFFFF;
  box-shadow: 0px 4px 0px #229bd5;
  padding: 6px 20px;
  font-size: 20px;
  transition: ease-in-out 0.3s;
  cursor: pointer;
  box-sizing: border-box;

  &:hover {
    background: #41C2FF;
  }

  @media(max-width: 450px){
    font-size: 15px;
    width: max-content !important;
    padding: 5px 10px;
    margin-left: 5px;
  }
`

export const LinkBlueTable = styled(Link)`
  font-weight: 500;
  background: #1CB0F6;
  border-radius: 7px;
  border: none;
  color: #FFFFFF;
  box-shadow: 0px 4px 0px #229bd5;
  padding: 6px 20px;
  font-size: 20px;
  transition: ease-in-out 0.3s;
  cursor: pointer;
  box-sizing: border-box;
  text-align: center;

  &:hover {
    background: #41C2FF;
  }
`

export const LinkGreen = styled(Link)`
  font-weight: 500;
  background: #45D62F;
  border-radius: 7px;
  border: none;
  color: #FFFFFF;
  box-shadow: 0px 4px 0px #4aa936;
  padding: 6px 20px;
  font-size: 20px;
  transition: ease-in-out 0.1s;
  cursor: pointer;
  box-sizing: border-box;

  &:hover {
    background: #38e115;
  }
`

export const Input = styled.input`
  width: 100%;
  margin-bottom: 10px;
  background: #FFFFFF;
  box-sizing: border-box;
  border-radius: 7px;
  border: 2px solid #E5E5E5;
  padding: 7px 10px;
  font-size: 18px;
  font-weight: 500;
  color: #000;
  outline: none;

  &:placeholder-shown {
    color: #D3D3D3;
    font-weight: 400;
  }
`

export const Select = styled.select`
  width: 100%;
  margin-bottom: 10px;
  background: #FFFFFF;
  box-sizing: border-box;
  border-radius: 7px;
  border: 2px solid #E5E5E5;
  padding: 7px 10px;
  font-size: 18px;
  font-weight: 500;
  color: #000;
  outline: none;
`
