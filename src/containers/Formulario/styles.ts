import styled from 'styled-components'

export const Form = styled.form`
  max-width: 547px;
  width: 100%;
  font-weight: bold;
  font-size: 14px;
  color: #666666;

  textarea {
    resize: none;
    margin: 16px 0;
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }
`

export const Opcoes = styled.div`
  margin-bottom: 16px;

  p {
    margin-bottom: 6px;
  }

  label {
    margin-right: 6px;
  }

  @media (max-width: 768px) {
    margin-bottom: 12px;

    p {
      margin-bottom: 4px;
    }

    label {
      margin-right: 4px;
    }
  }
`

export const Opcao = styled.div`
  display: inline;
  text-transform: capitalize;

  @media (max-width: 768px) {
    display: block;
    margin-bottom: 4px;
  }
`
