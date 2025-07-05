import { Client, Databases, ID, Query } from 'appwrite';

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT

const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID);
const database = new Databases(client);

export const addUser = async (fullName, email, userID, password ,isLoggedIn, setIsLoggedIn, showLoginWindow, setShowLoginWindow) => {
  try {
    const result = await database.listDocuments(
        DATABASE_ID,COLLECTION_ID, [
             Query.equal('Email',email)
        ]
    );
    if(result.documents.length>0){
        alert('Email is already Registered. Try to Login');
    } else {
        const result = await database.listDocuments(
            DATABASE_ID,COLLECTION_ID, [
                Query.equal('userID',userID),
            ]
        );
        if(result.documents.length>0){
            alert('UserID is already taken.Please try a different one.');
        } else {
            await database.createDocument(DATABASE_ID,COLLECTION_ID,
                ID.unique(), {
                    userID: userID,
                    fullName: fullName,
                    password: password,
                    count: 1,
                    Email: email
                }
            );
            console.log("User Added");
            setIsLoggedIn(true);
            setShowLoginWindow(false);
        }
    }

  } catch (error) {
    console.log(error);
  }
}
export const getTop5 = async() => {
    try{
        const result = await database.listDocuments(
            DATABASE_ID, COLLECTION_ID,[
                Query.limit(5),
                Query.orderDesc('count')
            ]
        )
        return result.documents
    } catch (error) {
        console.log(error);
    }
}