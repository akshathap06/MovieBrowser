import { Client, Databases, ID, Query } from 'appwrite'

// Get Appwrite project and collection IDs from environment variables
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

// Initialize Appwrite client and database
const client = new Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject(PROJECT_ID)

const database = new Databases(client);

// Function to update the search count for a movie search term
export const updateSearchCount = async (searchTerm, movie) => {
  try {
    // Check if the search term already exists in the database
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal('searchTerm', searchTerm),
    ])
    // If it exists, increment the count
    if(result.documents.length > 0) {
      const doc = result.documents[0];
      await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
        count: doc.count + 1,
      })
    // If it doesn't exist, create a new document for the search term
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm,
        count: 1,
        movie_id: movie.id,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      })
    }
  } catch (error) {
    console.error(error);
  }
}

// Function to get the top 5 trending movies based on search count
export const getTrendingMovies = async () => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc("count")
    ])
    return result.documents;
  } catch (error) {
    console.error(error);
  }
}