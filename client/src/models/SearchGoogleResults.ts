export interface ISearchGoogleResult {
  context: {
    title: string;
  };
  items: {
    link: string;
    title: string; 
    byteSize: number; 
  }[];
  searchInformation: {
    searchTime: string;
  };
  spelling?: {
    correctedQuery: string;
  };
}
