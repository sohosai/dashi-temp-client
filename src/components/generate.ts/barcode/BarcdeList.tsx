import { FC } from 'react';
import Barcode from './Barcode';

type Props = {
  visible_ids: string[];
};

const BarcodeList: FC<Props> = (props) => {
  return (
    <>
      {props.visible_ids.map((visible_id: string, index: number) => (
        <Barcode key={index} visible_id={visible_id} />
      ))}
    </>
  );
};

export default BarcodeList;
