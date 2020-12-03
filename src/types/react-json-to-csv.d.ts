declare module 'react-json-to-csv' {
  interface Props {
    readonly data: any;
    readonly filename: string;
    readonly children: React.ReactNode;
  }

  function CsvDownload(props: Props): JSX.Element;

  export default CsvDownload;
}
