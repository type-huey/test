import styled from '@emotion/styled';

type PropsType = {
  onPanelVisible: () => void;
};

export const WidgetButton = ({ onPanelVisible }: PropsType) => {
  return <Button onClick={onPanelVisible}>{'AI'}</Button>;
};

const Button = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  padding: 15px;
  font-size: 16px;
  cursor: pointer;
  z-index: 1000;
`;
