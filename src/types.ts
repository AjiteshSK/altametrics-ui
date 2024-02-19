export interface BookDetails {
  publishers?: string[];
  translated_from?: LanguageKey[];
  identifiers?: Identifiers;
  contributors?: Contributor[];
  authors?: Author[];
  covers?: number[];
  lc_classifications?: string[];
  key: string;
  publish_places?: string[];
  languages?: LanguageKey[];
  classifications?: Record<string, unknown>;
  source_records?: string[];
  title: string;
  translation_of?: string;
  number_of_pages?: number;
  edition_name?: string;
  isbn_10?: string[];
  publish_date?: string;
  works?: WorkKey[];
  type?: TypeKey;
  lccn?: string[];
  latest_revision?: number;
  revision?: number;
  created?: DateTime;
  last_modified?: DateTime;
  [key: string]: any;
}

export interface Author {
  key?: string;
  name?: string;
}

export interface LanguageKey {
  key?: string;
}

export interface Identifiers {
  amazon?: string[];
  goodreads?: string[];
}

export interface Contributor {
  role?: string;
  name?: string;
}

export interface WorkKey {
  key?: string;
}

export interface TypeKey {
  key?: string;
}

export interface DateTime {
  type?: string;
  value?: string;
}

export interface BookType {
  bib_key: string;
  info_url: string;
  preview: string;
  preview_url: string;
  thumbnail_url?: string;
  details: BookDetails;
  [key: string]: any;
}

export interface SearchResult {
  title: string;
  isbn: string[];
  cover_edition_key: string;
  [key: string]: any;
}
