import {firebaseapp} from './firebase';
import 'firebase/firestore'

const db = firebaseapp.firestore(firebaseapp)

export const getCollection = async(collection) => {
    const result = {
        statusResponse: false,
        data: null,
        error: null,
    }
    try {
        const data = await db.collection(collection).get()
        result.data = data.docs.map(doc => ({id: doc.id, ...doc.data()}))
        result.statusResponse = true;
    } catch (error) {
        result.error = error;
    }
    return result;
}

export const addDocument = async(collection, document) => {
    const result = {
        statusResponse: false,
        data: null,
        error: null,
    }
    try {
        const data = await db.collection(collection).add(document)
        result.data = {
            id: data.id
        }
        result.statusResponse = true;
    } catch (error) {
        result.error = error;
    }
    return result;
}

export const editDocument = async(collection, id, document) => {
    const result = {
        statusResponse: false,
        data: null,
        error: null,
    }
    try {
        await db.collection(collection).doc(id).update(document)
        result.statusResponse = true;
    } catch (error) {
        result.error = error;
    }
    return result;
}

export const deleteDocument = async(collection, id) => {
    const result = {
        statusResponse: false,
        data: null,
        error: null,
    }
    try {
        await db.collection(collection).doc(id).delete()
        result.statusResponse = true;
    } catch (error) {
        result.error = error;
    }
    return result;
}