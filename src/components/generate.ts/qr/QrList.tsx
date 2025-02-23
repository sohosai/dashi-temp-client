import { FC } from 'react';
import Qr from './Qr';

type Props = {
  visible_ids: string[];
};

const QrList: FC<Props> = (props) => {
  return (
    <>
      {props.visible_ids.map((visible_id: string, index: number) => (
        <Qr key={index} visible_id={visible_id} />
      ))}
    </>
  );
};

export default QrList;
