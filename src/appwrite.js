import { Client, Databases, ID, Query } from 'appwrite';

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT;
const STAR_COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID_STAR;

const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID);
const database = new Databases(client);
const courseCodes = new Set([
    "AM1",
    "BB1",
    "CH1",
    "CS1",
    "CE1",
    "EE1",
    "EE3",
    "ES1",
    "MS1",
    "MT1",
    "ME1",
    "ME2",
    "PH1",
    "TT1",
    "CH7",
    "CS5",
    "MT6"
].map(code=>code.toLowerCase()));
const isNumberRegex = (str) => {
    return /^\d+$/.test(str);
};
const validateEmail = (email)=>{
    if(!courseCodes.has(email.substring(0,3).toLowerCase())){
        return false;
    }
    if(email[3]!=='2'){
        return false;
    }
    if(!email.toLowerCase().endsWith('iitd.ac.in')){
        return false;
    }
    if(email[9]!=='@'){
        return false;
    }
    if(!isNumberRegex(email.substring(2,9))){
        return false;
    }
    return true;

}
export const addUser = async (fullName, email, userID, password, user, setUser,isLoggedIn, setIsLoggedIn, showLoginWindow, setShowLoginWindow) => {
  try {
    email = email.trim();
    fullName = fullName.trim();
    userID = userID.trim();
    password = password.trim();
    if(email && validateEmail(email) && fullName && userID && password ){
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
                const newUser = {
                        userID: userID,
                        fullName: fullName,
                        password: password,
                        count: 1,
                        Email: email
                    }
                await database.createDocument(DATABASE_ID,COLLECTION_ID,
                    ID.unique(), newUser
                );
                await database.createDocument(DATABASE_ID,STAR_COLLECTION_ID,
                    ID.unique(), {
                        mainUser: userID,
                        otherUser: userID,
                    }
                )
                setUser(newUser);
                console.log("User Added");
                setIsLoggedIn(true);
                setShowLoginWindow(false);
            }
        }
    }else{
        alert('No field can be blank or your email may not be valid IID email')
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
                Query.orderDesc('count'),
                Query.select(['fullName','userID','count'])
            ]
        )
        return result.documents
    } catch (error) {
        console.log(error);
    }
}
export const LoginUser = async( email,  password, user, setUser, isLoggedIn,setIsLoggedIn ,showLoginWindow, setShowLoginWindow)=>{
    try{
        email = email.trim();
        password = password.trim();
        const result = await database.listDocuments(
            DATABASE_ID, COLLECTION_ID,[
                Query.equal('Email',email),
            ]
        );
        if(result.documents.length>0){
            if(result.documents[0].password===password){
                const newUser = result.documents[0]
                setUser({
                    userID: newUser.userID,
                    fullName: newUser.fullName,
                    password: newUser.password,
                    count: newUser.count,
                    Email: newUser.Email
                });
                console.log('User Logged in.');
                setIsLoggedIn(true);
                setShowLoginWindow(false);
            } else {
                alert('Wrong Password');
            }
        } else {
            alert('User does not exist. Please Sign up or check email');
        }
    } catch (error) {
        console.log(error);
    }
}
export const getSearchResults = async(searchTerm,user)=>{
    try{
        const result = await database.listDocuments(
            DATABASE_ID, COLLECTION_ID,[
                Query.contains('userID',searchTerm),
                Query.select(['fullName','userID','count']),
                Query.orderAsc('count'),
                Query.orderDesc('$createdAt'),
                Query.limit(50)
            ]
        );
        const otherUserID = [];
        const finalResult=[];
        for(let i=0;i<result.documents.length;i++){
            otherUserID.push(result.documents[i].userID);
        }
        console.log("otheruserid array:",otherUserID);
        if(otherUserID.length>0){
            const staredByUser = await database.listDocuments(
                DATABASE_ID,STAR_COLLECTION_ID,[
                    Query.equal('mainUser',user.userID),
                    Query.contains('otherUser', otherUserID),
                    Query.limit(50)
                ]
            )
            console.log("Starred by user:",staredByUser);
            
            let temp={};
            for(let j=0;j<result.documents.length;j++){
                temp = result.documents[j];
                temp.hasStarred = false;
                temp.starId = null;
                for(let i=0;i<staredByUser.documents.length;i++){
                    if(staredByUser.documents[i].otherUser===temp.userID){
                        temp.hasStarred = true;
                        temp.starId = staredByUser.documents[i].$id;
                    }
                }
                finalResult.push(temp);
            }
        }
        console.log("final result:",finalResult);
        return finalResult;
    } catch (error) {
        console.log("Error getting search result", error);
    }
}
export const getRank = async(stars)=>{
    try{
        const result = await database.listDocuments(
            DATABASE_ID, COLLECTION_ID,[
                Query.greaterThan('count',stars),
                Query.limit(1)
            ]
        );
        return result.total;
    } catch (error) {
        console.log("Error getting rank:", error);
    }
}
export const toggleStarFriend = async(user, otherUser,index,searchResult, setSearchResult)=>{
    try{
        if(otherUser.hasStarred){
            database.updateDocument(DATABASE_ID,COLLECTION_ID,
                otherUser.$id, {
                    count: otherUser.count-1
                }
            );
            database.deleteDocument(DATABASE_ID,STAR_COLLECTION_ID,otherUser.starId);
            const updatedResults = searchResult.map((item, i) => 
                i === index ? {
                    ...item,
                    count: item.count - 1,
                    hasStarred: false,
                    starId: null
                } : item
            );

            console.log("Star Removed");
            return updatedResults;
        }else{
            database.updateDocument(DATABASE_ID,COLLECTION_ID,
                otherUser.$id, {
                    count: otherUser.count+1
                }
            );
            const uniqueId = ID.unique();
            const updatedResults = searchResult.map((item, i) => 
                i === index ? {
                    ...item,
                    count: item.count + 1,
                    hasStarred: true,
                    starId: uniqueId
                } : item
            );
            database.createDocument(DATABASE_ID,STAR_COLLECTION_ID,
                uniqueId,{
                    mainUser: user.userID,
                    otherUser: otherUser.userID
                }
            );
            console.log("Star Added");
            return updatedResults;

        }

    } catch(error){
        console.log("Error starring friend:",error);
    }
}