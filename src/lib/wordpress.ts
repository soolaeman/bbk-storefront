const DEFAULT_WORDPRESS_API_URL = 'https://www.bukanbarukitchen.com/wp-json/wp/v2';

const WORDPRESS_API_URL = (
  process.env.WORDPRESS_API_URL ||
  DEFAULT_WORDPRESS_API_URL
).replace(/\/$/, '');

export interface WordPressRenderedField {
  rendered: string;
}

export interface WordPressPostBase {
  id: number;
  date: string;
  modified: string;
  slug: string;
  status: string;
  link: string;
  title: WordPressRenderedField;
  content: WordPressRenderedField;
  excerpt: WordPressRenderedField;
}

export interface WordPressPage extends WordPressPostBase {
  parent: number;
  menu_order: number;
}

export interface WordPressPost extends WordPressPostBase {
  categories: number[];
  tags: number[];
}

export interface WordPressMedia {
  id: number;
  date: string;
  modified: string;
  slug: string;
  type: string;
  link: string;
  title: WordPressRenderedField;
  caption: WordPressRenderedField;
  alt_text: string;
  source_url: string;
  media_type: string;
  mime_type: string;
}

export interface WordPressTerm {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy?: string;
  parent?: number;
}

export interface WordPressUser {
  id: number;
  name: string;
  slug: string;
  link: string;
  description?: string;
  avatar_urls?: Record<string, string>;
}

export interface WordPressSearchResult {
  id: number;
  title: string;
  url: string;
  type: string;
  subtype: string;
  _links?: Record<string, unknown>;
}

export interface WordPressQueryOptions {
  page?: number;
  perPage?: number;
  search?: string;
  slug?: string;
  status?: string;
  parent?: number;
  author?: string;
  categories?: string;
  tags?: string;
  include?: string;
  exclude?: string;
  after?: string;
  before?: string;
  orderby?: string;
  order?: 'asc' | 'desc';
}

function buildQuery(options?: WordPressQueryOptions): string {
  const params = new URLSearchParams();

  if (options?.page !== undefined) params.set('page', String(options.page));
  if (options?.perPage !== undefined) params.set('per_page', String(options.perPage));
  if (options?.search) params.set('search', options.search);
  if (options?.slug) params.set('slug', options.slug);
  if (options?.status) params.set('status', options.status);
  if (options?.parent !== undefined) params.set('parent', String(options.parent));
  if (options?.author) params.set('author', options.author);
  if (options?.categories) params.set('categories', options.categories);
  if (options?.tags) params.set('tags', options.tags);
  if (options?.include) params.set('include', options.include);
  if (options?.exclude) params.set('exclude', options.exclude);
  if (options?.orderby) params.set('orderby', options.orderby);
  if (options?.order) params.set('order', options.order);

  const query = params.toString();
  return query ? `?${query}` : '';
}

async function fetchWordPress<T>(resource: string, options?: WordPressQueryOptions): Promise<T> {
  const response = await fetch(`${WORDPRESS_API_URL}/${resource}${buildQuery(options)}`, {
    headers: { Accept: 'application/json' },
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`WordPress REST API gagal: ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as T;
}

export async function getWordPressPages(options?: WordPressQueryOptions): Promise<WordPressPage[]> {
  return fetchWordPress<WordPressPage[]>('pages', options);
}

export async function getWordPressPosts(options?: WordPressQueryOptions): Promise<WordPressPost[]> {
  return fetchWordPress<WordPressPost[]>('posts', options);
}

export async function getWordPressMedia(options?: WordPressQueryOptions): Promise<WordPressMedia[]> {
  return fetchWordPress<WordPressMedia[]>('media', options);
}

export async function getWordPressCategories(options?: WordPressQueryOptions): Promise<WordPressTerm[]> {
  return fetchWordPress<WordPressTerm[]>('categories', options);
}

export async function getWordPressTags(options?: WordPressQueryOptions): Promise<WordPressTerm[]> {
  return fetchWordPress<WordPressTerm[]>('tags', options);
}

export async function getWordPressUsers(options?: WordPressQueryOptions): Promise<WordPressUser[]> {
  return fetchWordPress<WordPressUser[]>('users', options);
}

export async function searchWordPress(options?: WordPressQueryOptions): Promise<WordPressSearchResult[]> {
  return fetchWordPress<WordPressSearchResult[]>('search', options);
}
