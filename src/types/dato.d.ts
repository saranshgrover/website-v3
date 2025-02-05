interface HomeQueryResponse {
  home: {
    title: string;
    _firstPublishedAt: string;
    structuredText: StructuredTextGraphQlResponse;
    projects: {
      title: string;
      description: string;
      header: string;
      iconName: string;
      featured: boolean;
    }[];
  } | null;
} 