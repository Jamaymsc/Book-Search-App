import axios, {AxiosResponse} from "axios";
import { Book } from "../models/IBook";

const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY || "";
const API_URL = process.env.REACT_APP_API_URL || "";

export const searchBooks = async (
    query : string,
     category: string,
      sorting: string,
      startIndex: number,
      endIndex: number
      ): Promise<{books: Book[]; totalItems: number}> => {
    try {
      document.cookie = "myCookie=myValue; SameSite=None; Secure";
        const response: AxiosResponse = await axios.get(API_URL, {
            params: {
                key: API_KEY,
                q: query,
                subject: category,
                orderBy: sorting,
                startIndex: (startIndex -1) * endIndex,
                maxResults: endIndex,
            },
        });

        const books: Book[] = response.data.items.map((item: any) => ({
            id: item.id,
            title: item.volumeInfo.title,
            authors: item.volumeInfo.authors || [],
            category: item.volumeInfo.categories
             ? item.volumeInfo.categories[0] 
             : 'Unknown',
            image: item.volumeInfo.imageLinks?.thumbnail || '',
            description: item.volumeInfo.description
          }));

          const totalItems: number = response.data.totalItems;
      
          return {books, totalItems};
        } catch (error) {
          console.error('Error searching books:', error);
          throw error;
        }
      };