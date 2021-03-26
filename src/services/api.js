import Axios from 'axios';

const Client = () => {
    const _client = Axios.create({
        baseURL: process.env.REACT_APP_API_HOST,
        withCredentials: false
    })

    let getLists = async (source = false) => {
        try {
            let response = await _client.get('', {cancelToken: source.token});            
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            console.log(error);
        }
    };

    let addListItem = async (listId, newItem) => {
        try {
            let response = await _client.post(`lists/${listId}/items/`, newItem);
            return response.data;
        } catch (error) {
            console.log(error);
        }

        return false;
    };
    
    let removeListItem = async (listId, itemIndex) => {
        try {
            let response = await _client.delete(`lists/${listId}/items/${itemIndex}`);
            return response.status;
        } catch (error) {
            console.log(error);
        }

        return false;
    }

    let deleteList = async (listId) => {
        try {
            let response = await _client.delete(`lists/${listId}/`);
            return response.data;
        } catch (error) {
            console.log(error);
        }

        return false;
    }

    let createList = async (data) => {
        try {
            let response = await _client.post('lists/', data);
            return response.data;
        } catch (error) {
            console.log(error);
        }

        return false;
    } 


    return {
        getLists,
        addListItem,
        removeListItem,
        deleteList,
        createList
    };
};

export default Client;