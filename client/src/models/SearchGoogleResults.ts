export interface ISearchGoogleResult {
  context: {
    title: string;
  };
  items: {
    link: string;
    title: string; 
  }[];
  searchInformation: {
    searchTime: string;
  };
  spelling?: {
    correctedQuery: string;
  };
}
