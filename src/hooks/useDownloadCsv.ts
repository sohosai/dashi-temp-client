import { CsvHeader } from '../model/csvHeader';
import { Buffer, Workbook, Worksheet } from 'exceljs';
import { ItemCsvList } from '../model/itemCsv';
import { DepreiationCsvList } from '../model/depreiationCsv';

export const useDownloadCsv = async (
  filename: string,
  sheetName: string,
  header: CsvHeader[],
  body: DepreiationCsvList | ItemCsvList
): Promise<void> => {
  const workbook: Workbook = new Workbook();
  const worksheet: Worksheet = workbook.addWorksheet(sheetName);
  // ヘッダーの設定
  worksheet.columns = header;
  // データの挿入
  worksheet.addRows(body.items);
  // CSVデータをバッファとして取得
  const csvBuffer: Buffer = await workbook.csv.writeBuffer();
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
