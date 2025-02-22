import { FC, useRef } from 'react';
import { ErrorResponse } from '../../model/errorResponse';
import ErrorResult from '../error/ErrorResult';
import { GenerateResponse } from '../../model/generateResponse';
import { Record } from '../../model/generateRequest';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import QrList from './qr/QrList';
import BarcodeList from './barcode/BarcdeList';

type Props = {
  result: GenerateResponse | ErrorResponse;
  recordType: Record | null;
};

const GenerateResult: FC<Props> = (props) => {
  // PDFに変換する対象のエリア
  const contentRef = useRef<HTMLDivElement>(null);
  // download処理
  const handleDownloadPdf = async () => {
    if (!contentRef.current) return;

    try {
      // 1️: 指定した要素をキャプチャしてCanvasに変換
      const canvas: HTMLCanvasElement = await html2canvas(contentRef.current);

      // 2: jsPDF インスタンスを作成（A4縦向き）
      const pdf: jsPDF = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
      });

      // 3: PDFの幅を取得し、アスペクト比を維持した高さを計算
      const pdfWidth: number = pdf.internal.pageSize.getWidth();
      const pdfHeight: number = (canvas.height * pdfWidth) / canvas.width;

      // 4: canvasをPDFに追加（左上から配置）
      pdf.addImage({
        imageData: canvas,
        x: 0,
        y: 0,
        width: pdfWidth,
        height: pdfHeight,
      });

      // 5: PDFをダウンロード
      pdf.save('dashi-record.pdf');
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      {'code' in props.result && 'message' in props.result ? (
        <ErrorResult result={props.result} />
      ) : (
        <>
          {props.recordType === 'Qr' ? (
            <>
              {/* Qr */}
              <div
                style={{
                  width: '100%',
                  maxWidth: '1200px',
                  height: '300px',
                  margin: '0 auto 0 auto',
                  padding: '0',
                  overflowX: 'scroll',
                  overflowY: 'scroll',
                  border: '1px solid black',
                }}
              >
                {/* PDFに変換する対象のエリア start */}
                <div
                  ref={contentRef}
                  style={{
                    aspectRatio: '210 / 297',
                    width: 'auto',
                    height: '1485px',
                    margin: '0 auto',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid black',
                  }}
                >
                  <QrList visible_ids={props.result.visible_ids} />
                </div>
                {/* PDFに変換する対象のエリア end */}
              </div>
              <div style={{ width: '100%' }}>
                <button
                  onClick={handleDownloadPdf}
                  style={{
                    width: '200px',
                    height: '50px',
                    fontSize: '18px',
                    margin: '10px auto 0 auto',
                    display: 'block',
                  }}
                >
                  PDFをダウンロード
                </button>
              </div>
            </>
          ) : props.recordType === 'Barcode' ? (
            <>
              {/* Barcode */}
              <div
                style={{
                  width: '100%',
                  maxWidth: '1200px',
                  height: '300px',
                  margin: '0 auto 0 auto',
                  padding: '0',
                  overflowX: 'scroll',
                  overflowY: 'scroll',
                  border: '1px solid black',
                }}
              >
                {/* PDFに変換する対象のエリア start */}
                <div
                  ref={contentRef}
                  style={{
                    aspectRatio: '210 / 297',
                    width: 'auto',
                    height: '1485px',
                    margin: '0 auto',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid black',
                  }}
                >
                  <BarcodeList visible_ids={props.result.visible_ids} />
                </div>
                {/* PDFに変換する対象のエリア end */}
              </div>
              <div style={{ width: '100%' }}>
                <button
                  onClick={handleDownloadPdf}
                  style={{
                    width: '200px',
                    height: '50px',
                    fontSize: '18px',
                    margin: '10px auto 0 auto',
                    display: 'block',
                  }}
                >
                  PDFをダウンロード
                </button>
              </div>
            </>
          ) : (
            // Nothing
            <h2>Generate Successed!</h2>
          )}
        </>
      )}
    </>
  );
};

export default GenerateResult;
