import styled from '@emotion/styled';
import { Colors } from 'styles/Colors';
import { FontSize } from 'styles/FontStyles';

interface IProps {
  onClickOk: () => void;
  onClickCancel: () => void;
  title: string;
  contents: string;
  okMessage: string;
  cancelMessage: string;
}

export default function AlertModal(props: IProps) {
  return (
    <ModalBackground>
      <ModalWrapper>
        <div className="xButton" onClick={props.onClickCancel}>
          x
        </div>
        <div className="content">
          <h3>{props.title}</h3>
          <p>{props.contents}</p>
        </div>
        <div className="buttons">
          <button className="button01" onClick={props.onClickCancel}>
            {props.cancelMessage}
          </button>
          <button className="button02" onClick={props.onClickOk}>
            {props.okMessage}
          </button>
        </div>
      </ModalWrapper>
    </ModalBackground>
  );
}

const ModalBackground = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(3px) brightness(40%);
  color: ${Colors.B100};
  z-index: 999;
`;

const ModalWrapper = styled.div`
  display: flex;
  position: absolute;
  top: 30%;
  flex-direction: column;
  width: 420px;
  height: 200px;
  border: 1px solid ${Colors.B40};
  overflow: hidden;
  background-color: white;
  border-radius: 20px;
  padding: 10px 20px;
  margin: 0 auto;

  .xButton {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    font-size: ${FontSize.LARGE_C};
    line-height: 20px;
    cursor: pointer;
  }

  h3 {
    text-align: center;
    padding-top: 5px;
  }

  P {
    padding-top: 10px;
    text-align: center;
    color: ${Colors.B80};
  }

  .buttons {
    display: flex;
    width: 350px;
    margin: 0 auto;
    padding-top: 30px;
    justify-content: space-between;
    .button01 {
      width: 170px;
      height: 40px;
      border: 1px solid ${Colors.SUB1};
      color: ${Colors.SUB1};
      border-radius: 5px;
    }
    .button02 {
      width: 170px;
      height: 40px;
      background-color: ${Colors.SUB1};
      color: ${Colors.BW};
      border-radius: 5px;
    }
  }
`;
