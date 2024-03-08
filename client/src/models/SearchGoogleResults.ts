export interface ISearchGoogleResult {
    context: {
      title: string;
    };
    items: {
      link: string;
    }[];
    searchInformation: {
      searchTime: string;
    };
    spelling?: {
      correctedQuery: string;
    };
  }