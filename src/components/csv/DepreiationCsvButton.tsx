import { FC } from 'react';
import ExcelJS from 'exceljs';

const App: FC = () => {
  const handlerClickDownloadButton = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const filename: string = 'sample.csv';
    const sheetName: string = 'dashi';
    const workbook: ExcelJS.Workbook = new ExcelJS.Workbook();
    const worksheet: ExcelJS.Worksheet = workbook.addWorksheet(sheetName);

    // ヘッダーの設定
    worksheet.columns = [
      { header: 'ID', key: 'id' },
      { header: '作成日時', key: 'createdAt' },
      { header: '名前', key: 'name' },
    ];

    // データ
    worksheet.addRows([
      {
        id: 'f001',
        createdAt: 1629902208,
        name: 'りんご',
      },
      {
        id: 'f002',
        createdAt: 1629902245,
        name: 'ぶどう',
      },
      {
        id: 'f003',
        createdAt: 1629902265,
        name: 'ばなな',
      },
    ]);

    // CSVデータをバッファとして取得
    const csvBuffer: ExcelJS.Buffer = await workbook.csv.writeBuffer();
    // Blobを作成
    // Blob .. バイナリデータを格納するimuutableなオブジェクト
    const blob: Blob = new Blob([csvBuffer], {
      type: 'text/csv;charset=utf-8;',
    });
    // バイナリデータを保持するURLの一種
    const url: string = window.URL.createObjectURL(blob);
    // ダウンロード
    const a: HTMLAnchorElement = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    a.remove();
    // リソースを解放
    URL.revokeObjectURL(url);
  };
  return <button onClick={(e) => handlerClickDownloadButton(e)}>CSV形式 (UTF8)</button>;
};

export default App;
